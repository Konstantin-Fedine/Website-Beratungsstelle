create policy "Public can create bookings"
on public.bookings
for insert
to anon
with check (true);