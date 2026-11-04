-- Imperium Appliance Repair: contact details and brand cleanup for live data.
-- Run once in the Supabase SQL Editor BEFORE deploying this code.
-- Removed reviews stay in testimonials_backup_20261103 until you drop that table.

begin;

create table if not exists public.testimonials_backup_20261103 as
  table public.testimonials;
alter table public.testimonials_backup_20261103 enable row level security;

delete from public.testimonials;

update public.contact set
  phone = '(346) 673-5111',
  "phoneHref" = 'tel:+13466735111',
  email = 'info@imperiumappliance.com',
  "socialMedia" = '[]'::jsonb,
  reviews = '{}'::jsonb;

update public.metadata set
  title = regexp_replace(title, '\mmperium Appliance( Repair)?\M', 'Imperium Appliance Repair', 'g'),
  description = regexp_replace(description, '\mmperium Appliance( Repair)?\M', 'Imperium Appliance Repair', 'g');

update public.service_details set
  title = regexp_replace(title, '\mmperium Appliance( Repair)?\M', 'Imperium Appliance Repair', 'g'),
  description = regexp_replace(description, '\mmperium Appliance( Repair)?\M', 'Imperium Appliance Repair', 'g');

update public.brands set
  title = regexp_replace(title, '\mmperium Appliance( Repair)?\M', 'Imperium Appliance Repair', 'g'),
  description = regexp_replace(description, '\mmperium Appliance( Repair)?\M', 'Imperium Appliance Repair', 'g');

update public.locations set
  description = regexp_replace(description, '\mmperium Appliance( Repair)?\M', 'Imperium Appliance Repair', 'g');

update public.faq set
  answer = regexp_replace(answer, '\mmperium Appliance( Repair)?\M', 'Imperium Appliance Repair', 'g');

update public.why set
  title = regexp_replace(title, '\mmperium Appliance( Repair)?\M', 'Imperium Appliance Repair', 'g'),
  description = regexp_replace(description, '\mmperium Appliance( Repair)?\M', 'Imperium Appliance Repair', 'g');

update public.blog set
  title = regexp_replace(title, '\mmperium Appliance( Repair)?\M', 'Imperium Appliance Repair', 'g'),
  excerpt = regexp_replace(excerpt, '\mmperium Appliance( Repair)?\M', 'Imperium Appliance Repair', 'g'),
  content = regexp_replace(content, '\mmperium Appliance( Repair)?\M', 'Imperium Appliance Repair', 'g'),
  image = case
    when image ilike '%rafix%' then 'https://images.pexels.com/photos/34734504/pexels-photo-34734504.jpeg'
    else image
  end;

commit;
