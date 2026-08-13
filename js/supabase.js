import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Development helper: if the site is served from localhost/127.0.0.1,
// use the local Supabase dev instance started with `supabase start`.
const hostname = (typeof window !== "undefined" && window.location && window.location.hostname) || "";
const isLocalhost = hostname === "127.0.0.1" || hostname === "localhost";

const LOCAL_SUPABASE_URL = "http://127.0.0.1:54321";
const LOCAL_SUPABASE_ANON_KEY = "sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH";

const PROD_SUPABASE_URL = "https://osesjuwfgytibasmnacl.supabase.co";
const PROD_SUPABASE_ANON_KEY = "sb_publishable_am5h5emmjCuvdz69L2PHkw_2Pankgs5";

const supabaseUrl = isLocalhost ? LOCAL_SUPABASE_URL : PROD_SUPABASE_URL;
const supabaseKey = isLocalhost ? LOCAL_SUPABASE_ANON_KEY : PROD_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
