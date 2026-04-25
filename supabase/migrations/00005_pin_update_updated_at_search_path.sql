-- ================================================================
-- 00005 — Pin search_path on update_updated_at
--
-- Supabase advisor (function_search_path_mutable) flags any function
-- without a fixed search_path. 00003 covered the SECURITY DEFINER
-- functions but missed update_updated_at, which is plain SECURITY
-- INVOKER. Pinning it closes the warning and prevents schema-spoofing
-- if the function ever changes behavior.
-- ================================================================

ALTER FUNCTION public.update_updated_at() SET search_path = public, pg_temp;
