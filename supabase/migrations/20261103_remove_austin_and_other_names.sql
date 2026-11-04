-- Imperium Appliance Repair does not serve the Austin area, and no other
-- business name or hosted image should remain in the live content.
-- Run once in the Supabase SQL Editor BEFORE deploying this code.
-- Removed rows stay in the *_backup_austin tables until you drop them.

begin;

create table if not exists public.locations_backup_austin as
  select * from public.locations where region ilike '%austin%';
alter table public.locations_backup_austin enable row level security;

create table if not exists public.areas_backup_austin as
  select * from public.areas where lower(city) = 'austin';
alter table public.areas_backup_austin enable row level security;

delete from public.locations where region ilike '%austin%';
delete from public.areas where lower(city) = 'austin';

update public.contact set location = 'Houston TX';

update public.faq set
  answer = replace(answer, 'the greater Houston and Austin areas', 'the greater Houston area');

update public.blog set image = 'https://images.pexels.com/photos/34734504/pexels-photo-34734504.jpeg'
  where image ilike '%keepe.com%' or image ilike '%rafix%';

commit;

-- Should return no rows. Any row listed still needs editing in the admin panel.
select tbl, row_text from (
  select 'blog' as tbl, concat_ws(' ', title, excerpt, content, image) as row_text from public.blog
  union all select 'brands', concat_ws(' ', title, description, image) from public.brands
  union all select 'contact', concat_ws(' ', phone, email, location, "socialMedia"::text) from public.contact
  union all select 'faq', concat_ws(' ', question, answer) from public.faq
  union all select 'locations', concat_ws(' ', name, region, description) from public.locations
  union all select 'metadata', concat_ws(' ', title, description, keywords) from public.metadata
  union all select 'service_details', concat_ws(' ', title, description) from public.service_details
  union all select 'why', concat_ws(' ', title, description) from public.why
) all_content
where row_text ~* 'unitech|fix ?center|let.?s ?fix|rafix|austin|keepe\.com|(^|[^i])mperium';
