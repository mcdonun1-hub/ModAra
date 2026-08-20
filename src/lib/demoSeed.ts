// Auto-generated from supabase/migrations/*.sql — demo dataset used by the local
// offline backend (see src/lib/localBackend.ts) when Supabase env vars are absent.
import type { BlogPost, Category, Product, Review } from './supabase';

export const seedCategories: Category[] = [
  {
    "id": "cat-clothing",
    "name": "لباس",
    "slug": "clothing",
    "icon": "shirt",
    "created_at": "2026-06-21T14:13:09.408Z"
  },
  {
    "id": "cat-pants",
    "name": "شلوار",
    "slug": "pants",
    "icon": "pants",
    "created_at": "2026-06-22T14:13:09.408Z"
  },
  {
    "id": "cat-glasses",
    "name": "عینک",
    "slug": "glasses",
    "icon": "glasses",
    "created_at": "2026-06-23T14:13:09.408Z"
  },
  {
    "id": "cat-watch",
    "name": "ساعت",
    "slug": "watch",
    "icon": "watch",
    "created_at": "2026-06-24T14:13:09.408Z"
  },
  {
    "id": "cat-bag",
    "name": "کیف",
    "slug": "bag",
    "icon": "bag",
    "created_at": "2026-06-25T14:13:09.408Z"
  },
  {
    "id": "cat-accessory",
    "name": "اکسسوری",
    "slug": "accessory",
    "icon": "gem",
    "created_at": "2026-06-26T14:13:09.408Z"
  }
];

export const seedProducts: Product[] = [
  {
    "id": "prod-classic-white-shirt",
    "name": "پیراهن مردانه کلاسیک سفید",
    "slug": "classic-white-shirt",
    "description": "پیراهن مردانه کلاسیک با یقه رسمی، دوخت مرغوب از پنبه طبیعی ۱۰۰٪",
    "price": 890000,
    "image_url": "/images/prod-shirt-1.jpg",
    "category_id": "cat-clothing",
    "rating": 4.7,
    "stock": 80,
    "created_at": "2026-07-11T14:13:09.408Z"
  },
  {
    "id": "prod-elegant-pink-blouse",
    "name": "پیراهن زنانه شیک صورتی",
    "slug": "elegant-pink-blouse",
    "description": "بلوز زنانه طراحی خاص با پارچه نرم و راحت، مناسب مجالس و محل کار",
    "price": 1200000,
    "image_url": "/images/prod-shirt-2.jpg",
    "category_id": "cat-clothing",
    "rating": 4.8,
    "stock": 60,
    "created_at": "2026-07-12T14:13:09.408Z"
  },
  {
    "id": "prod-slim-jeans-men",
    "name": "شلوار جین مردانه اسلیم",
    "slug": "slim-jeans-men",
    "description": "شلوار جین مردانه اسلیم فیت با پارچه کش‌سفارشی و دوام بالا",
    "price": 1500000,
    "image_url": "/images/prod-pants-1.jpg",
    "category_id": "cat-pants",
    "rating": 4.6,
    "stock": 100,
    "created_at": "2026-07-13T14:13:09.408Z"
  },
  {
    "id": "prod-linen-pants-women",
    "name": "شلوار کتان زنانه",
    "slug": "linen-pants-women",
    "description": "شلوار کتان زنانه با طراحی مدرن و راحتی فوق‌العاده، مناسب فصل بهار و تابستان",
    "price": 1350000,
    "image_url": "/images/prod-pants-2.jpg",
    "category_id": "cat-pants",
    "rating": 4.5,
    "stock": 75,
    "created_at": "2026-07-14T14:13:09.408Z"
  },
  {
    "id": "prod-luxury-sunglasses-classic",
    "name": "عینک آفتابی لوکس مدل کلاسیک",
    "slug": "luxury-sunglasses-classic",
    "description": "عینک آفتابی با فریم متالیک و عدسی پلاریزه، محافظت کامل در برابر UV",
    "price": 1800000,
    "image_url": "/images/prod-glasses-1.jpg",
    "category_id": "cat-glasses",
    "rating": 4.9,
    "stock": 40,
    "created_at": "2026-07-15T14:13:09.408Z"
  },
  {
    "id": "prod-modern-sunglasses",
    "name": "عینک آفتابی مدرن",
    "slug": "modern-sunglasses",
    "description": "عینک آفتابی با طراحی مدرن و رنگ‌های متنوع، مناسب استایل روزمره و مجلسی",
    "price": 1600000,
    "image_url": "/images/prod-glasses-2.jpg",
    "category_id": "cat-glasses",
    "rating": 4.7,
    "stock": 55,
    "created_at": "2026-07-16T14:13:09.408Z"
  },
  {
    "id": "prod-luxury-gold-watch",
    "name": "ساعت مچی لوکس طلایی",
    "slug": "luxury-gold-watch",
    "description": "ساعت مچی با بدنه طلایی و بند چرمی، طراحی شیک و کلاسیک برای آقایان",
    "price": 4500000,
    "image_url": "/images/prod-watch-1.jpg",
    "category_id": "cat-watch",
    "rating": 4.8,
    "stock": 30,
    "created_at": "2026-07-17T14:13:09.408Z"
  },
  {
    "id": "prod-sport-watch",
    "name": "ساعت مچی اسپرت",
    "slug": "sport-watch",
    "description": "ساعت مچی اسپرت با قابلیت ضدآب و طراحی مدرن، مناسب استفاده روزمره و ورزشی",
    "price": 2800000,
    "image_url": "/images/prod-watch-2.jpg",
    "category_id": "cat-watch",
    "rating": 4.6,
    "stock": 45,
    "created_at": "2026-07-18T14:13:09.408Z"
  },
  {
    "id": "prod-leather-handbag-women",
    "name": "کیف دستی زنانه چرم",
    "slug": "leather-handbag-women",
    "description": "کیف دستی زنانه از چرم طبیعی با طراحی شیک و فضای داخلی جادار",
    "price": 2300000,
    "image_url": "/images/prod-bag-1.jpg",
    "category_id": "cat-bag",
    "rating": 4.8,
    "stock": 50,
    "created_at": "2026-07-19T14:13:09.408Z"
  },
  {
    "id": "prod-mens-messenger-bag",
    "name": "کیف دوشی مردانه",
    "slug": "mens-messenger-bag",
    "description": "کیف دوشی مردانه با چرم باکیفیت و طراحی مینیمال، مناسب محل کار و سفر",
    "price": 1900000,
    "image_url": "/images/prod-bag-2.jpg",
    "category_id": "cat-bag",
    "rating": 4.5,
    "stock": 65,
    "created_at": "2026-07-20T14:13:09.408Z"
  },
  {
    "id": "prod-leather-belt-men",
    "name": "کمربند چرم مردانه",
    "slug": "leather-belt-men",
    "description": "کمربند چرم طبیعی مردانه با سگکی استیل، طراحی شیک و دوام بالا",
    "price": 650000,
    "image_url": "/images/prod-belt-1.jpg",
    "category_id": "cat-accessory",
    "rating": 4.4,
    "stock": 120,
    "created_at": "2026-07-21T14:13:09.408Z"
  },
  {
    "id": "prod-womens-jewelry-set",
    "name": "ست جواهری زنانه",
    "slug": "womens-jewelry-set",
    "description": "ست جواهری زنانه شامل گردنبند و گوشواره با طراحی ظریف و درخشان",
    "price": 3200000,
    "image_url": "/images/prod-jewelry-1.jpg",
    "category_id": "cat-accessory",
    "rating": 4.9,
    "stock": 25,
    "created_at": "2026-07-22T14:13:09.408Z"
  }
];

export const seedBlogPosts: BlogPost[] = [
  {
    "id": "post-fall-1405-fashion-trends",
    "title": "ترندهای مد پاییز ۱۴۰۵",
    "slug": "fall-1405-fashion-trends",
    "excerpt": "بررسی کامل ترندهای مد پاییز ۱۴۰۵ از رنگ‌های پاییزی تا استایل‌های جدید",
    "content": "در فصل پاییز ۱۴۰۵ شاهد بازگشت رنگ‌های گرم و خنثی هستیم. تن‌های کرم، قهوه‌ای و نارنجی از رنگ‌های اصلی این فصل هستند. استایل لایه‌ای همچنان محبوب است و می‌توانید با ترکیب پیراهن‌های نازک و کت‌های سبک، یک استایل شیک پاییزی بسازید. شلوارهای گشاد و کتان نیز جای خود را در کمد هر فرد مد‌پسند باز کرده‌اند. در انتخاب اکسسوری، ساعت‌های کلاسیک و عینک‌های آفتاری با فریم بزرگ ترند روز هستند.",
    "image_url": "/images/blog-1.jpg",
    "author": "سارا احمدی",
    "created_at": "2026-08-10T14:13:09.408Z"
  },
  {
    "id": "post-sunglasses-buying-guide",
    "title": "راهنمای انتخاب عینک آفتابی مناسب",
    "slug": "sunglasses-buying-guide",
    "excerpt": "همه چیزهایی که قبل از خرید عینک آفتابی باید بدانید",
    "content": "انتخاب عینک آفتابی مناسب فقط به مدل و ظاهر آن محدود نمی‌شود. باید به فرم صورت، کیفیت عدسی و محافظت در برابر اشعه UV توجه کنید. برای صورت‌های گرد، عینک‌های زاویه‌دار مناسب‌تر هستند. برای صورت‌های مربعی، عینک‌های گردتر انتخاب بهتری است. عدسی‌های پلاریزه برای رانندگی و فعالیت‌های بیرونی بسیار توصیه می‌شوند. همچنین فریم سبک و راحت برای استفاده طولانی‌مدت اهمیت دارد.",
    "image_url": "/images/blog-2.jpg",
    "author": "محمد رضایی",
    "created_at": "2026-08-11T14:13:09.408Z"
  },
  {
    "id": "post-watch-buying-guide",
    "title": "چگونه ساعت مچی مناسب بخریم؟",
    "slug": "watch-buying-guide",
    "excerpt": "راهنمای جامع خرید ساعت مچی از سبک تا بودجه",
    "content": "خرید ساعت مچی یکی از مهم‌ترین تصمیمات برای تکمیل استایل است. اولین نکته تعیین بودجه است. ساعت‌های مچی در قیمت‌های متنوعی موجود هستند. بعد از بودجه باید به سبک زندگی خود فکر کنید: ساعت اسپرت برای استفاده روزمره، ساعت کلاسیک برای مجالس و محیط‌های رسمی. جنس بدنه و بند نیز مهم است: استیل ضدزنگ، چرم طبیعی و سرامیک از بهترین گزینه‌ها هستند. در نهایت به اندازه دست و وزن ساعت نیز توجه کنید تا راحتی لازم را داشته باشد.",
    "image_url": "/images/blog-3.jpg",
    "author": "نگار کریمی",
    "created_at": "2026-08-12T14:13:09.408Z"
  }
];

export const seedReviews: Review[] = [
  {
    "id": "rev-1",
    "product_id": "prod-classic-white-shirt",
    "user_id": null,
    "name": "علی محمدی",
    "rating": 5,
    "comment": "کیفیت پارچه عالی و دوخت بسیار تمیز. کاملاً راضی هستم.",
    "created_at": "2026-07-31T14:13:09.408Z"
  },
  {
    "id": "rev-2",
    "product_id": "prod-classic-white-shirt",
    "user_id": null,
    "name": "مریم حسینی",
    "rating": 4,
    "comment": "سایز بندی دقیق است و پارچه خوبی دارد ولی قیمت کمی بالاست.",
    "created_at": "2026-08-01T14:13:09.408Z"
  },
  {
    "id": "rev-3",
    "product_id": "prod-luxury-gold-watch",
    "user_id": null,
    "name": "حسین کریمی",
    "rating": 5,
    "comment": "ساعت بسیار شیک و باکیفیت. بند چرمی عالی و ظاهر لوکس.",
    "created_at": "2026-08-02T14:13:09.408Z"
  },
  {
    "id": "rev-4",
    "product_id": "prod-luxury-gold-watch",
    "user_id": null,
    "name": "زهرا نوری",
    "rating": 5,
    "comment": "بهترین خریدم! طراحی کلاسیک و درخشنده، کاملاً ارزشش رو داره.",
    "created_at": "2026-08-03T14:13:09.408Z"
  },
  {
    "id": "rev-5",
    "product_id": "prod-luxury-sunglasses-classic",
    "user_id": null,
    "name": "سینا اکبری",
    "rating": 5,
    "comment": "عینک سبک و باکیفیت. عدسی پلاریزه واقعاً موثره.",
    "created_at": "2026-08-04T14:13:09.408Z"
  },
  {
    "id": "rev-6",
    "product_id": "prod-leather-handbag-women",
    "user_id": null,
    "name": "فاطمه رضایی",
    "rating": 4,
    "comment": "کیف زیاد جادار و چرم خوبیه ولی رنگش کمی فرق داره با عکس.",
    "created_at": "2026-08-05T14:13:09.408Z"
  },
  {
    "id": "rev-7",
    "product_id": "prod-elegant-pink-blouse",
    "user_id": null,
    "name": "نگار صادقی",
    "rating": 5,
    "comment": "بلوز بسیار زیبا و نرم. برای مجالس عالیه.",
    "created_at": "2026-08-06T14:13:09.408Z"
  },
  {
    "id": "rev-8",
    "product_id": "prod-slim-jeans-men",
    "user_id": null,
    "name": "رضا تهرانی",
    "rating": 4,
    "comment": "جین خوب و کش‌سفارشی ولی کمی کوتاهتر از سایز واقعی بود.",
    "created_at": "2026-08-07T14:13:09.408Z"
  }
];
