-- ================================================================
-- Agrega campo image_source a deals para trackear el origen de la imagen
-- Valores: 'og' (scraping Open Graph), 'user' (subida manual), 'placeholder' (fallback por categoría)
-- ================================================================

ALTER TABLE public.deals
    ADD COLUMN image_source TEXT DEFAULT 'og'
    CONSTRAINT deals_image_source_check CHECK (image_source IN ('og', 'user', 'placeholder'));

COMMENT ON COLUMN public.deals.image_source IS 'Origen de la imagen: og (Open Graph scraping), user (subida manual), placeholder (fallback por categoría)';
