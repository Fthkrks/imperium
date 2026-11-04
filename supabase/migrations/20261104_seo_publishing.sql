-- SEO publishing: existing posts remain published. Run in the Supabase SQL Editor.
begin;

alter table public.blog
  add column if not exists status text not null default 'publish' check (status in ('draft', 'publish')),
  add column if not exists json_ld jsonb not null default '[]'::jsonb;

create table if not exists public.site_files (
  path text primary key,
  content text not null,
  updated_at timestamptz not null default now()
);

alter table public.site_files enable row level security;
drop policy if exists public_read on public.site_files;
create policy public_read on public.site_files for select using (true);

-- Service-role admin reads still see drafts; anonymous REST reads must not.
drop policy if exists public_read on public.blog;
create policy public_read on public.blog for select using (status = 'publish');

commit;
