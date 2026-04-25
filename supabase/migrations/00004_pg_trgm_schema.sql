-- ================================================================
-- 00004 — Move pg_trgm extension out of `public`
--
-- Supabase advisor (extension_in_public) flags extensions installed
-- in the public schema. We move pg_trgm to the standard `extensions`
-- schema and recreate the trigram index using the relocated operator
-- class.
-- ================================================================

CREATE SCHEMA IF NOT EXISTS extensions;

-- Drop the index that depends on the public.gin_trgm_ops operator class
DROP INDEX IF EXISTS public.deals_title_trgm_idx;

-- Relocate the extension
ALTER EXTENSION pg_trgm SET SCHEMA extensions;

-- Recreate the index pointing at the new schema's operator class
CREATE INDEX deals_title_trgm_idx
    ON public.deals
    USING gin (title extensions.gin_trgm_ops);
