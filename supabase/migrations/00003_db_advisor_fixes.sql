-- ================================================================
-- 00003 — Database Advisor fixes
--
--  1) Pin search_path on SECURITY DEFINER functions (security warning)
--  2) Add covering indexes for foreign keys (perf)
--  3) Wrap auth.* and current_user_role() in (SELECT ...) so the planner
--     treats them as InitPlan and caches once per query (perf)
--  4) Consolidate multiple permissive UPDATE policies on deals/comments
--  5) Enable RLS on reference tables (categories, stores, tags, deal_tags)
--     with explicit "anyone reads, admin writes" policies
-- ================================================================

-- ----------------------------------------------------------------
-- 1) SECURITY DEFINER functions: pin search_path
-- ----------------------------------------------------------------
ALTER FUNCTION public.handle_new_user()         SET search_path = public, pg_temp;
ALTER FUNCTION public.current_user_role()       SET search_path = public, pg_temp;
ALTER FUNCTION public.update_deal_temperature() SET search_path = public, pg_temp;
ALTER FUNCTION public.update_comments_count()   SET search_path = public, pg_temp;
ALTER FUNCTION public.update_user_reputation()  SET search_path = public, pg_temp;

-- ----------------------------------------------------------------
-- 2) Foreign-key covering indexes
-- ----------------------------------------------------------------
CREATE INDEX IF NOT EXISTS deals_store_idx                ON public.deals(store_id);
CREATE INDEX IF NOT EXISTS deal_votes_user_idx            ON public.deal_votes(user_id);
CREATE INDEX IF NOT EXISTS comments_user_idx              ON public.comments(user_id);
CREATE INDEX IF NOT EXISTS comments_parent_idx            ON public.comments(parent_id);
CREATE INDEX IF NOT EXISTS tags_category_idx              ON public.tags(category_id);
CREATE INDEX IF NOT EXISTS deal_tags_tag_idx              ON public.deal_tags(tag_id);
CREATE INDEX IF NOT EXISTS saved_deals_deal_idx           ON public.saved_deals(deal_id);
CREATE INDEX IF NOT EXISTS user_category_follows_cat_idx  ON public.user_category_follows(category_id);
CREATE INDEX IF NOT EXISTS alerts_category_idx            ON public.alerts(category_id);
CREATE INDEX IF NOT EXISTS notifications_deal_idx         ON public.notifications(deal_id);
CREATE INDEX IF NOT EXISTS reports_deal_idx               ON public.reports(deal_id);
CREATE INDEX IF NOT EXISTS reports_comment_idx            ON public.reports(comment_id);
CREATE INDEX IF NOT EXISTS reports_reporter_idx           ON public.reports(reporter_id);
CREATE INDEX IF NOT EXISTS reports_reviewed_by_idx        ON public.reports(reviewed_by);

-- ----------------------------------------------------------------
-- 3 + 4) Recreate policies
--   - wrap auth.uid() / current_user_role() in (SELECT ...)
--   - merge "editar propio" + "moderar" into a single UPDATE policy
--     on deals and comments
-- ----------------------------------------------------------------

-- profiles
DROP POLICY IF EXISTS "profiles: leer todos"    ON public.profiles;
DROP POLICY IF EXISTS "profiles: editar propio" ON public.profiles;
DROP POLICY IF EXISTS "profiles: admin todo"    ON public.profiles;

CREATE POLICY "profiles: leer todos"    ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles: editar propio" ON public.profiles FOR UPDATE USING (id = (SELECT auth.uid()));
CREATE POLICY "profiles: admin todo"    ON public.profiles FOR ALL    USING ((SELECT public.current_user_role()) = 'admin');

-- deals
DROP POLICY IF EXISTS "deals: leer activos"         ON public.deals;
DROP POLICY IF EXISTS "deals: publicar autenticado" ON public.deals;
DROP POLICY IF EXISTS "deals: editar propio"        ON public.deals;
DROP POLICY IF EXISTS "deals: moderar"              ON public.deals;
DROP POLICY IF EXISTS "deals: admin eliminar"       ON public.deals;

CREATE POLICY "deals: leer activos" ON public.deals FOR SELECT USING (
    status = 'active'
    OR user_id = (SELECT auth.uid())
    OR (SELECT public.current_user_role()) IN ('moderator','admin')
);
CREATE POLICY "deals: publicar autenticado" ON public.deals FOR INSERT WITH CHECK ((SELECT auth.uid()) IS NOT NULL);
CREATE POLICY "deals: editar"               ON public.deals FOR UPDATE USING (
    user_id = (SELECT auth.uid())
    OR (SELECT public.current_user_role()) IN ('moderator','admin')
);
CREATE POLICY "deals: admin eliminar"       ON public.deals FOR DELETE USING ((SELECT public.current_user_role()) = 'admin');

-- deal_votes
DROP POLICY IF EXISTS "votos: leer todos"         ON public.deal_votes;
DROP POLICY IF EXISTS "votos: votar autenticado"  ON public.deal_votes;
DROP POLICY IF EXISTS "votos: cambiar propio"     ON public.deal_votes;
DROP POLICY IF EXISTS "votos: eliminar propio"    ON public.deal_votes;

CREATE POLICY "votos: leer todos"        ON public.deal_votes FOR SELECT USING (true);
CREATE POLICY "votos: votar autenticado" ON public.deal_votes FOR INSERT WITH CHECK (
    (SELECT auth.uid()) IS NOT NULL AND user_id = (SELECT auth.uid())
);
CREATE POLICY "votos: cambiar propio"    ON public.deal_votes FOR UPDATE USING (user_id = (SELECT auth.uid()));
CREATE POLICY "votos: eliminar propio"   ON public.deal_votes FOR DELETE USING (user_id = (SELECT auth.uid()));

-- comments
DROP POLICY IF EXISTS "comments: leer todos"        ON public.comments;
DROP POLICY IF EXISTS "comments: crear autenticado" ON public.comments;
DROP POLICY IF EXISTS "comments: editar propio"     ON public.comments;
DROP POLICY IF EXISTS "comments: moderar"           ON public.comments;

CREATE POLICY "comments: leer todos"        ON public.comments FOR SELECT USING (true);
CREATE POLICY "comments: crear autenticado" ON public.comments FOR INSERT WITH CHECK (
    (SELECT auth.uid()) IS NOT NULL AND user_id = (SELECT auth.uid())
);
CREATE POLICY "comments: editar"            ON public.comments FOR UPDATE USING (
    user_id = (SELECT auth.uid())
    OR (SELECT public.current_user_role()) IN ('moderator','admin')
);

-- saved_deals / alerts / notifications / user_category_follows
DROP POLICY IF EXISTS "saved: propio"   ON public.saved_deals;
DROP POLICY IF EXISTS "alerts: propio"  ON public.alerts;
DROP POLICY IF EXISTS "notifs: propio"  ON public.notifications;
DROP POLICY IF EXISTS "follows: propio" ON public.user_category_follows;

CREATE POLICY "saved: propio"   ON public.saved_deals           FOR ALL USING (user_id = (SELECT auth.uid()));
CREATE POLICY "alerts: propio"  ON public.alerts                FOR ALL USING (user_id = (SELECT auth.uid()));
CREATE POLICY "notifs: propio"  ON public.notifications         FOR ALL USING (user_id = (SELECT auth.uid()));
CREATE POLICY "follows: propio" ON public.user_category_follows FOR ALL USING (user_id = (SELECT auth.uid()));

-- reports
DROP POLICY IF EXISTS "reports: crear autenticado" ON public.reports;
DROP POLICY IF EXISTS "reports: ver propio o mod"  ON public.reports;
DROP POLICY IF EXISTS "reports: resolver mod"      ON public.reports;

CREATE POLICY "reports: crear autenticado" ON public.reports FOR INSERT WITH CHECK ((SELECT auth.uid()) IS NOT NULL);
CREATE POLICY "reports: ver propio o mod"  ON public.reports FOR SELECT USING (
    reporter_id = (SELECT auth.uid())
    OR (SELECT public.current_user_role()) IN ('moderator','admin')
);
CREATE POLICY "reports: resolver mod"      ON public.reports FOR UPDATE USING (
    (SELECT public.current_user_role()) IN ('moderator','admin')
);

-- ----------------------------------------------------------------
-- 5) Reference tables: enable RLS with split SELECT/mutation policies
--    (split per command avoids "multiple permissive policies" warnings)
-- ----------------------------------------------------------------
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stores     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deal_tags  ENABLE ROW LEVEL SECURITY;

-- categories
CREATE POLICY "categories: leer todos"   ON public.categories FOR SELECT USING (true);
CREATE POLICY "categories: admin insert" ON public.categories FOR INSERT WITH CHECK ((SELECT public.current_user_role()) = 'admin');
CREATE POLICY "categories: admin update" ON public.categories FOR UPDATE USING ((SELECT public.current_user_role()) = 'admin');
CREATE POLICY "categories: admin delete" ON public.categories FOR DELETE USING ((SELECT public.current_user_role()) = 'admin');

-- stores
CREATE POLICY "stores: leer todos"   ON public.stores FOR SELECT USING (true);
CREATE POLICY "stores: admin insert" ON public.stores FOR INSERT WITH CHECK ((SELECT public.current_user_role()) = 'admin');
CREATE POLICY "stores: admin update" ON public.stores FOR UPDATE USING ((SELECT public.current_user_role()) = 'admin');
CREATE POLICY "stores: admin delete" ON public.stores FOR DELETE USING ((SELECT public.current_user_role()) = 'admin');

-- tags
CREATE POLICY "tags: leer todos"   ON public.tags FOR SELECT USING (true);
CREATE POLICY "tags: admin insert" ON public.tags FOR INSERT WITH CHECK ((SELECT public.current_user_role()) = 'admin');
CREATE POLICY "tags: admin update" ON public.tags FOR UPDATE USING ((SELECT public.current_user_role()) = 'admin');
CREATE POLICY "tags: admin delete" ON public.tags FOR DELETE USING ((SELECT public.current_user_role()) = 'admin');

-- deal_tags
CREATE POLICY "deal_tags: leer todos"   ON public.deal_tags FOR SELECT USING (true);
CREATE POLICY "deal_tags: admin insert" ON public.deal_tags FOR INSERT WITH CHECK ((SELECT public.current_user_role()) = 'admin');
CREATE POLICY "deal_tags: admin update" ON public.deal_tags FOR UPDATE USING ((SELECT public.current_user_role()) = 'admin');
CREATE POLICY "deal_tags: admin delete" ON public.deal_tags FOR DELETE USING ((SELECT public.current_user_role()) = 'admin');
