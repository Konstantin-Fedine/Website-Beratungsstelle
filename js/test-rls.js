import { supabase } from "./supabase.js";

const { data: loginData, error: loginError } =
  await supabase.auth.signInWithPassword({
    email: "test-admin@example.com",
    password: "Test",
  });

console.log("Login-Fehler:", loginError);
console.log("User:", loginData?.user);

const { data: adminResult, error: adminError } =
  await supabase.rpc("is_admin");

console.log("is_admin():", adminResult);
console.log("is_admin Fehler:", adminError);

const { data: bookings, error: bookingsError } =
  await supabase
    .from("bookings")
    .select("*");

console.log("Buchungen:", bookings);
console.log("Buchungsfehler:", bookingsError);