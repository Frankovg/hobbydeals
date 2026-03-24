-- ================================================================
-- HobbyDeals — Schema + Seed (local dev)
-- Ejecutar con: supabase db reset
-- ================================================================

-- ================================================================
-- EXTENSIONS
-- ================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ================================================================
-- ENUMS
-- ================================================================
CREATE TYPE deal_status   AS ENUM ('pending', 'active', 'expired', 'rejected', 'archived');
CREATE TYPE user_role     AS ENUM ('user', 'moderator', 'admin');
CREATE TYPE vote_value    AS ENUM ('hot', 'cold');
CREATE TYPE report_status AS ENUM ('pending', 'reviewed', 'resolved', 'dismissed');
CREATE TYPE notif_type    AS ENUM ('alert_match', 'comment_reply', 'deal_hot', 'deal_expired', 'system');

-- ================================================================
-- TABLES
-- ================================================================

-- Profiles (extiende auth.users — creado automáticamente por trigger)
CREATE TABLE public.profiles (
    id               UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username         TEXT UNIQUE NOT NULL,
    display_name     TEXT,
    avatar_url       TEXT,
    bio              TEXT,
    role             user_role DEFAULT 'user' NOT NULL,
    reputation       INTEGER DEFAULT 0,
    deals_count      INTEGER DEFAULT 0,
    is_verified      BOOLEAN DEFAULT FALSE,
    notif_prefs      JSONB DEFAULT '{"email_alerts":true,"email_comments":true,"push_alerts":true,"push_comments":true}'::jsonb,
    created_at       TIMESTAMPTZ DEFAULT NOW(),
    updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Categorías de hobbies
CREATE TABLE public.categories (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        TEXT NOT NULL,
    slug        TEXT UNIQUE NOT NULL,
    description TEXT,
    icon        TEXT NOT NULL,   -- emoji
    color       TEXT NOT NULL,   -- hex
    sort_order  INTEGER DEFAULT 0,
    is_active   BOOLEAN DEFAULT TRUE,
    deals_count INTEGER DEFAULT 0,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Tiendas / merchants
CREATE TABLE public.stores (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name             TEXT NOT NULL,
    slug             TEXT UNIQUE NOT NULL,
    logo_url         TEXT,
    website_url      TEXT NOT NULL,
    affiliate_tpl    TEXT,  -- template URL de afiliación
    is_verified      BOOLEAN DEFAULT FALSE,
    deals_count      INTEGER DEFAULT 0,
    created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Chollos (pieza central)
CREATE TABLE public.deals (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title               TEXT NOT NULL,
    description         TEXT,
    url                 TEXT NOT NULL,
    image_url           TEXT,
    price               DECIMAL(10,2),
    original_price      DECIMAL(10,2),
    discount_pct        SMALLINT GENERATED ALWAYS AS (
                            CASE
                                WHEN original_price IS NOT NULL
                                 AND price IS NOT NULL
                                 AND original_price > price
                                 AND original_price > 0
                                THEN ROUND(((original_price - price) / original_price * 100))::SMALLINT
                                ELSE NULL
                            END
                        ) STORED,
    currency            CHAR(3) DEFAULT 'EUR',
    temperature         INTEGER DEFAULT 0,
    votes_hot           INTEGER DEFAULT 0,
    votes_cold          INTEGER DEFAULT 0,
    status              deal_status DEFAULT 'pending',
    category_id         UUID REFERENCES public.categories(id),
    store_id            UUID REFERENCES public.stores(id),
    user_id             UUID REFERENCES public.profiles(id),
    expires_at          TIMESTAMPTZ,
    is_featured         BOOLEAN DEFAULT FALSE,
    is_sponsored        BOOLEAN DEFAULT FALSE,
    views_count         INTEGER DEFAULT 0,
    comments_count      INTEGER DEFAULT 0,
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- Votos (hot/cold — sistema de temperatura)
CREATE TABLE public.deal_votes (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    deal_id    UUID REFERENCES public.deals(id) ON DELETE CASCADE NOT NULL,
    user_id    UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    vote       vote_value NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(deal_id, user_id)
);

-- Comentarios con soporte de respuestas anidadas (1 nivel)
CREATE TABLE public.comments (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    deal_id    UUID REFERENCES public.deals(id) ON DELETE CASCADE NOT NULL,
    user_id    UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    parent_id  UUID REFERENCES public.comments(id) ON DELETE CASCADE,
    content    TEXT NOT NULL,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tags (opcionalmente ligados a una categoría)
CREATE TABLE public.tags (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        TEXT UNIQUE NOT NULL,
    slug        TEXT UNIQUE NOT NULL,
    category_id UUID REFERENCES public.categories(id),
    deals_count INTEGER DEFAULT 0
);

CREATE TABLE public.deal_tags (
    deal_id UUID REFERENCES public.deals(id) ON DELETE CASCADE,
    tag_id  UUID REFERENCES public.tags(id) ON DELETE CASCADE,
    PRIMARY KEY (deal_id, tag_id)
);

-- Chollos guardados (favoritos)
CREATE TABLE public.saved_deals (
    user_id    UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    deal_id    UUID REFERENCES public.deals(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, deal_id)
);

-- Categorías seguidas por usuario (para feed personalizado)
CREATE TABLE public.user_category_follows (
    user_id     UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, category_id)
);

-- Alertas de palabras clave
CREATE TABLE public.alerts (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id           UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    keyword           TEXT NOT NULL,
    category_id       UUID REFERENCES public.categories(id),
    max_price         DECIMAL(10,2),
    is_active         BOOLEAN DEFAULT TRUE,
    last_triggered_at TIMESTAMPTZ,
    created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Notificaciones in-app
CREATE TABLE public.notifications (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id    UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    type       notif_type NOT NULL,
    title      TEXT NOT NULL,
    body       TEXT,
    data       JSONB DEFAULT '{}',
    is_read    BOOLEAN DEFAULT FALSE,
    deal_id    UUID REFERENCES public.deals(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reportes de contenido
CREATE TABLE public.reports (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_id UUID REFERENCES public.profiles(id),
    deal_id     UUID REFERENCES public.deals(id) ON DELETE CASCADE,
    comment_id  UUID REFERENCES public.comments(id) ON DELETE CASCADE,
    reason      TEXT NOT NULL,
    description TEXT,
    status      report_status DEFAULT 'pending',
    reviewed_by UUID REFERENCES public.profiles(id),
    reviewed_at TIMESTAMPTZ,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    CHECK (
        (deal_id IS NOT NULL AND comment_id IS NULL) OR
        (deal_id IS NULL AND comment_id IS NOT NULL)
    )
);

-- ================================================================
-- INDEXES
-- ================================================================
CREATE INDEX deals_category_idx    ON public.deals(category_id);
CREATE INDEX deals_user_idx        ON public.deals(user_id);
CREATE INDEX deals_status_idx      ON public.deals(status);
CREATE INDEX deals_temp_idx        ON public.deals(temperature DESC);
CREATE INDEX deals_created_idx     ON public.deals(created_at DESC);
CREATE INDEX deals_title_trgm_idx  ON public.deals USING gin(title gin_trgm_ops);
CREATE INDEX comments_deal_idx     ON public.comments(deal_id);
CREATE INDEX notifs_user_idx       ON public.notifications(user_id, is_read);
CREATE INDEX alerts_user_idx       ON public.alerts(user_id);

-- ================================================================
-- FUNCTIONS + TRIGGERS
-- ================================================================

-- Auto-update de updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;

CREATE TRIGGER deals_updated_at    BEFORE UPDATE ON public.deals    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER comments_updated_at BEFORE UPDATE ON public.comments FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Crea perfil automáticamente al registrarse un usuario
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    INSERT INTO public.profiles (id, username, display_name, avatar_url)
    VALUES (
        NEW.id,
        COALESCE(
            NEW.raw_user_meta_data->>'username',
            'user_' || LEFT(REPLACE(NEW.id::TEXT, '-', ''), 8)
        ),
        COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
        NEW.raw_user_meta_data->>'avatar_url'
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Actualiza temperatura del chollo al votar
CREATE OR REPLACE FUNCTION public.update_deal_temperature()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
    v_deal_id UUID;
    v_hot     INTEGER;
    v_cold    INTEGER;
BEGIN
    v_deal_id := COALESCE(NEW.deal_id, OLD.deal_id);
    SELECT
        COUNT(*) FILTER (WHERE vote = 'hot'),
        COUNT(*) FILTER (WHERE vote = 'cold')
    INTO v_hot, v_cold
    FROM public.deal_votes WHERE deal_id = v_deal_id;

    UPDATE public.deals
    SET temperature = (v_hot * 2) - (v_cold * 1),
        votes_hot   = v_hot,
        votes_cold  = v_cold
    WHERE id = v_deal_id;
    RETURN NULL;
END;
$$;

CREATE TRIGGER on_vote_change
    AFTER INSERT OR UPDATE OR DELETE ON public.deal_votes
    FOR EACH ROW EXECUTE FUNCTION public.update_deal_temperature();

-- Actualiza comments_count al comentar
CREATE OR REPLACE FUNCTION public.update_comments_count()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.deals SET comments_count = comments_count + 1 WHERE id = NEW.deal_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.deals SET comments_count = GREATEST(comments_count - 1, 0) WHERE id = OLD.deal_id;
    END IF;
    RETURN NULL;
END;
$$;

CREATE TRIGGER on_comment_change
    AFTER INSERT OR DELETE ON public.comments
    FOR EACH ROW EXECUTE FUNCTION public.update_comments_count();

-- Actualiza reputación del usuario cuando votan sus chollos
CREATE OR REPLACE FUNCTION public.update_user_reputation()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE v_user UUID;
BEGIN
    SELECT user_id INTO v_user FROM public.deals WHERE id = COALESCE(NEW.deal_id, OLD.deal_id);
    UPDATE public.profiles SET reputation = (
        SELECT COALESCE(SUM(CASE WHEN dv.vote = 'hot' THEN 2 WHEN dv.vote = 'cold' THEN -1 ELSE 0 END), 0)
        FROM public.deal_votes dv
        JOIN public.deals d ON dv.deal_id = d.id
        WHERE d.user_id = v_user
    ) WHERE id = v_user;
    RETURN NULL;
END;
$$;

CREATE TRIGGER on_vote_reputation
    AFTER INSERT OR UPDATE OR DELETE ON public.deal_votes
    FOR EACH ROW EXECUTE FUNCTION public.update_user_reputation();

-- ================================================================
-- RLS POLICIES
-- ================================================================
ALTER TABLE public.profiles              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deal_votes            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_deals           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts                ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_category_follows ENABLE ROW LEVEL SECURITY;

-- Helper: comprueba rol del usuario actual
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS user_role LANGUAGE sql SECURITY DEFINER STABLE AS $$
    SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

-- Profiles
CREATE POLICY "profiles: leer todos"          ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles: editar propio"       ON public.profiles FOR UPDATE USING (id = auth.uid());
CREATE POLICY "profiles: admin todo"          ON public.profiles FOR ALL USING (public.current_user_role() = 'admin');

-- Deals
CREATE POLICY "deals: leer activos"           ON public.deals FOR SELECT USING (
    status = 'active' OR user_id = auth.uid() OR public.current_user_role() IN ('moderator','admin')
);
CREATE POLICY "deals: publicar autenticado"   ON public.deals FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "deals: editar propio"          ON public.deals FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "deals: moderar"                ON public.deals FOR UPDATE USING (public.current_user_role() IN ('moderator','admin'));
CREATE POLICY "deals: admin eliminar"         ON public.deals FOR DELETE USING (public.current_user_role() = 'admin');

-- Votos
CREATE POLICY "votos: leer todos"             ON public.deal_votes FOR SELECT USING (true);
CREATE POLICY "votos: votar autenticado"      ON public.deal_votes FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());
CREATE POLICY "votos: cambiar propio"         ON public.deal_votes FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "votos: eliminar propio"        ON public.deal_votes FOR DELETE USING (user_id = auth.uid());

-- Comentarios
CREATE POLICY "comments: leer todos"          ON public.comments FOR SELECT USING (true);
CREATE POLICY "comments: crear autenticado"   ON public.comments FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());
CREATE POLICY "comments: editar propio"       ON public.comments FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "comments: moderar"             ON public.comments FOR UPDATE USING (public.current_user_role() IN ('moderator','admin'));

-- Tablas privadas del usuario
CREATE POLICY "saved: propio"                 ON public.saved_deals           FOR ALL USING (user_id = auth.uid());
CREATE POLICY "alerts: propio"                ON public.alerts                FOR ALL USING (user_id = auth.uid());
CREATE POLICY "notifs: propio"                ON public.notifications         FOR ALL USING (user_id = auth.uid());
CREATE POLICY "follows: propio"               ON public.user_category_follows FOR ALL USING (user_id = auth.uid());

-- Reportes
CREATE POLICY "reports: crear autenticado"    ON public.reports FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "reports: ver propio o mod"     ON public.reports FOR SELECT USING (reporter_id = auth.uid() OR public.current_user_role() IN ('moderator','admin'));
CREATE POLICY "reports: resolver mod"         ON public.reports FOR UPDATE USING (public.current_user_role() IN ('moderator','admin'));

-- Tablas públicas (sin RLS): categories, stores, tags, deal_tags

