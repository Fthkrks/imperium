# Imperium (Next.js + Supabase)

Bu proje admin panelinden düzenlenen site verilerini Supabase tablolarında tutar.

## 1) Kurulum

```bash
npm install
```

`.env.example` dosyasını temel alıp `.env.local` oluşturun ve değerleri girin:

- `ADMIN_PASSWORD` (zorunlu; tanımlı değilse admin girişi kapalı kalır)
- `ADMIN_SESSION_SECRET` (isteğe bağlı; admin oturumlarını imzalar)
- `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_AUTH_USER` (form e-postalarını gönderen Gmail hesabı)
- `LEAD_INBOX` (isteğe bağlı; form taleplerinin gideceği adres, varsayılan `info@imperiumappliance.com`)
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

## SEO publishing (seo-mcp)

1. Supabase SQL Editor'da `supabase/migrations/20261104_seo_publishing.sql` dosyasını çalıştırın. Mevcut sitede seed içeren `schema.sql` dosyasını tekrar çalıştırmayın.
2. Vercel'de `SEO_PUBLISH_TOKEN` ayarlayın; seo-mcp aynı token ile `Authorization: Bearer <token>` kullanarak `POST /api/seo/publish` adresine `{ "page": Page }` gönderir. Yeni ortam değişkenlerini uygulamak için yeniden deploy edin.
3. Varsayılan olarak blog gönderileri taslak kaydedilir. Onaylamak için admin → **Blog Posts** → `status` alanını `publish` yapın → **Save**.
4. Doğrudan canlı yayın için Vercel'de `SEO_ALLOW_LIVE_PUBLISH=1` ve istekte `status: "publish"` birlikte gereklidir. Bu izin olmadan mevcut canlı yazılar değiştirilemez; `/llms.txt` ve `/llms-full.txt` yazımı da 409 döner (dosyaların taslak durumu yoktur).

Desteklenen adresler aynı site host'undaki `/blog/<slug>`, `/llms.txt` ve `/llms-full.txt` yollarıdır. Blog oluştururken `title` ve `content_md`, dosya yazarken `content_md` gerekir. `json_ld`, `internal_links`, `unique_facts` ve `sources` dizileri doğrulanır; içerik ve JSON-LD saklanır, diğer kalite/atıf bilgileri seo-mcp tarafından içerik/JSON-LD içinde sunulmalıdır.

Migration öncesinde mevcut blog sayfaları okunmaya devam eder; eksik SEO sütunları yayınlanmış durum ve boş JSON-LD olarak okunur. Blog kaydı sütun kontrolünden önce hiçbir satır silmez; migration yapılana kadar admin blog kaydı ve SEO yazımı kapalı kalır. Henüz bulunmayan llms dosyaları 404 döner. `robots.txt` ve sitemap değişmedi: bu metin dosyaları sitemap sayfaları değildir ve standart bir robots yönergesi gerektirmez.

Yerel kontrol: `npx -y tsx --test lib/seo-publish.test.ts`.
