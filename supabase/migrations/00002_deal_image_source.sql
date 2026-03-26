-- ================================================================
-- Add image_source column to deals to track image origin
-- Values: 'og' (Open Graph scraping), 'user' (manual upload), 'placeholder' (category fallback)
-- ================================================================

ALTER TABLE public.deals
    ADD COLUMN image_source TEXT DEFAULT 'og'
    CONSTRAINT deals_image_source_check CHECK (image_source IN ('og', 'user', 'placeholder'));

COMMENT ON COLUMN public.deals.image_source IS 'Image origin: og (Open Graph scraping), user (manual upload), placeholder (category fallback)';
