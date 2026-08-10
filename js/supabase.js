import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Use your machine's LAN IP so other devices on the same network can reach
// the local Supabase instance. Replace with your hosted Supabase URL
// if you move to a production project.
const supabaseUrl = "http://192.168.10.153:54321";

// Use the publishable (anon) key for client-side requests.
// This value comes from your local Supabase 'Publishable' key shown when running `supabase start`.
const supabaseKey =
  "sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH";

export const supabase = createClient(supabaseUrl, supabaseKey);
