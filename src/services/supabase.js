import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://utgvhijudfrylzpgsnpk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0Z3ZoaWp1ZGZyeWx6cGdzbnBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0OTA5NjYsImV4cCI6MjA1MzA2Njk2Nn0.9aNML4q49fUHKWTyKRMqVrXgxP7Mc-UQg6RcgxCmYDA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
