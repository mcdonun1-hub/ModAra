# مُدارا | ModAra

فروشگاه آنلاین مد و فشن (React + Vite + TypeScript + Tailwind).

## راه‌اندازی خودکار (پیش‌فرض)

بدون نیاز به هیچ سرویس خارجی، به‌صورت کاملاً آفلاین اجرا می‌شود:

```bash
npm install
npm run dev
```

در حالت پیش‌فرض، سایت با یک **دیتابیس داخلی (localStorage)** کار می‌کند که داده‌های
دسته‌بندی‌ها، محصولات، مقالات و نظرات از فایل‌های SQL در `supabase/migrations/` در آن
بارگذاری می‌شود. ثبت‌نام / ورود، سبد خرید و سفارش هم به‌صورت محلی و بدون بک‌اند واقعی
انجام می‌شود.

## اتصال به Supabase واقعی

برای استفاده از بک‌اند واقعی Supabase، یک فایل `.env` در ریشه پروژه بسازید:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

سپس اسکیمای پایگاه‌داده را با اجرای مهاجرت‌های موجود اعمال کنید
(فایل‌های `supabase/migrations/*.sql` را در پروژه Supabase خود اجرا کنید).
در صورت وجود این دو متغیر، اپلیکیشن به‌صورت خودکار به‌جای حالت محلی، از کلاینت واقعی
`@supabase/supabase-js` استفاده می‌کند.

## دستورات

| دستور | توضیح |
| --- | --- |
| `npm run dev` | اجرای سرور توسعه (با HMR) |
| `npm run build` | ساخت نسخه تولیدی در `dist/` |
| `npm run typecheck` | بررسی تایپ‌ها با TypeScript |
| `npm run lint` | بررسی کد با ESLint |
| `npm run preview` | پیش‌نمایش نسخه ساخته‌شده |
