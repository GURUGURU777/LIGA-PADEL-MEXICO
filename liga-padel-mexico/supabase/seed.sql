-- Datos mínimos de ejemplo para probar la app en local.
-- Ejecuta primero schema.sql y luego este archivo en el editor SQL de Supabase.
insert into categories (name, sort_order) values
  ('1ª', 1), ('2ª', 2), ('3ª', 3), ('4ª', 4)
on conflict (name) do nothing;

insert into clubs (name, city, state, license_model)
values ('Club Pádel Tepic', 'Tepic', 'Nayarit', 'direct');
