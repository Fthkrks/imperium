# Imperium (Next.js + Supabase)

Bu proje admin panelinden düzenlenen site verilerini Supabase tablolarında tutar.

## 1) Kurulum

```bash
npm install
```

`.env.example` dosyasını temel alıp `.env.local` oluşturun ve değerleri girin:

- `ADMIN_PASSWORD`
- `ADMIN_SEED_SECRET`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## 2) Supabase tablo şemasını oluşturma

Supabase SQL Editor'da aşağıdaki dosyayı çalıştırın:

- `supabase/schema.sql`

Bu script aşağıdaki JSON kaynakları için ayrı tablo oluşturur ve içeriği `content (jsonb)` alanında birebir saklar:

- `contact.json` -> `contact_json`
- `blog.json` -> `blog_json`
- `services-residential.json` -> `services_residential_json`
- `services-commercial.json` -> `services_commercial_json`
- `service-details.json` -> `service_details_json`
- `testimonials.json` -> `testimonials_json`
- `why.json` -> `why_json`
- `areas.json` -> `areas_json`
- `locations.json` -> `locations_json`
- `faq.json` -> `faq_json`
- `brands.json` -> `brands_json`
- `metadata.json` -> `metadata_json`

## 3) JSON verilerini Supabase'e seed etme

Uygulama çalışırken seed endpoint'ini çağırın:

```bash
http://localhost:3000/api/admin/seed?secret=YOUR_ADMIN_SEED_SECRET
```

Bu endpoint `data/*.json` dosyalarını okuyup ilgili Supabase tablolarına yazar.

## 4) Geliştirme

```bash
npm run dev
```

Site: `http://localhost:3000`
Admin: `http://localhost:3000/admin`

## Veri Akışı

- Admin panel kaydı: `app/api/admin/data/route.ts`
- Site okuma katmanı: `lib/redis-fetch.ts`
- Supabase JSON<->row dönüşümü: `lib/site-data-store.ts`

Admin panelden yapılan değişiklikler ilgili Supabase tablosuna yazılır ve revalidate ile siteye yansır.
