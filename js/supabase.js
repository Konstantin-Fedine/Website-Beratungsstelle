import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Use the hosted Supabase project URL for public client access.
// This is the Project URL shown in the Supabase dashboard under Project Settings > API.
const supabaseUrl = "https://osesjuwfgytibasmnacl.supabase.co";

// Use the publishable (anon) key for client-side requests.
const supabaseKey =
  "sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH";

export const supabase = createClient(supabaseUrl, supabaseKey);
