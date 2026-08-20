import { createClient, type Session, type SupabaseClient, type User } from '@supabase/supabase-js';

/**
 * Mock Supabase client (offline / demo mode).
 *
 * This project is a fully client-side store. When real Supabase credentials are
 * not configured (no VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY), the app runs
 * against a lightweight, localStorage-backed database that is seeded from the
 * SQL migrations in `supabase/migrations/`. It implements just enough of the
 * Supabase query + auth API surface that the rest of the codebase uses, so the
 * site works end-to-end without any external backend.
 *
 * To switch to a real backend, set the two env vars (see README) and this module
 * falls back to the real `@supabase/supabase-js` client automatically.
 */

export type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  created_at: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category_id: string | null;
  rating: number;
  stock: number;
  created_at: string;
};

export type CartItem = {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  product?: Product;
};

export type Order = {
  id: string;
  user_id: string;
  total: number;
  status: string;
  address: string | null;
  phone: string | null;
  created_at: string;
  order_items?: OrderItem[];
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  product?: Product;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  author: string;
  created_at: string;
};

export type Review = {
  id: string;
  product_id: string;
  user_id: string | null;
  name: string;
  rating: number;
  comment: string | null;
  created_at: string;
};

/* -------------------------------------------------------------------------- */
/* Storage helpers                                                            */
/* -------------------------------------------------------------------------- */

type Row = Record<string, any>;
type Db = Record<string, Row[]>;

const DB_KEY = 'modara-mock-db-v1';
const SESSION_KEY = 'modara-mock-session-v1';
const USERS_KEY = 'modara-mock-users-v1';

function genId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getStorage(): Storage | null {
  try {
    return typeof window !== 'undefined' ? window.localStorage : null;
  } catch {
    return null;
  }
}

function loadJSON<T>(key: string, fallback: T): T {
  const s = getStorage();
  if (!s) return fallback;
  try {
    const raw = s.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch {
    /* ignore corrupt storage */
  }
  return fallback;
}

function saveJSON(key: string, value: unknown): void {
  const s = getStorage();
  if (!s) return;
  try {
    s.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full / unavailable */
  }
}

/* -------------------------------------------------------------------------- */
/* Seed data (mirrors supabase/migrations reseed_fashion_data.sql)            */
/* -------------------------------------------------------------------------- */

const now = Date.now();
const iso = (msOffset: number) => new Date(now - msOffset).toISOString();

function seed(): Db {
  const c = {
    clothing: { id: genId(), name: 'لباس', slug: 'clothing', icon: 'shirt', created_at: iso(9_000_000) },
    pants: { id: genId(), name: 'شلوار', slug: 'pants', icon: 'pants', created_at: iso(8_900_000) },
    glasses: { id: genId(), name: 'عینک', slug: 'glasses', icon: 'glasses', created_at: iso(8_800_000) },
    watch: { id: genId(), name: 'ساعت', slug: 'watch', icon: 'watch', created_at: iso(8_700_000) },
    bag: { id: genId(), name: 'کیف', slug: 'bag', icon: 'bag', created_at: iso(8_600_000) },
    accessory: { id: genId(), name: 'اکسسوری', slug: 'accessory', icon: 'gem', created_at: iso(8_500_000) },
  };
  const categories = Object.values(c);

  const P = (
    id: string,
    name: string,
    slug: string,
    description: string,
    price: number,
    image: string,
    categoryId: string,
    rating: number,
    stock: number,
    offset: number,
  ): Row => ({
    id,
    name,
    slug,
    description,
    price,
    image_url: image,
    category_id: categoryId,
    rating,
    stock,
    created_at: iso(offset),
  });

  const products: Row[] = [
    P('p-shirt-1', 'پیراهن مردانه کلاسیک سفید', 'classic-white-shirt', 'پیراهن مردانه کلاسیک با یقه رسمی، دوخت مرغوب از پنبه طبیعی ۱۰۰٪', 890000, '/images/prod-shirt-1.jpg', c.clothing.id, 4.7, 80, 8_400_000),
    P('p-shirt-2', 'پیراهن زنانه شیک صورتی', 'elegant-pink-blouse', 'بلوز زنانه طراحی خاص با پارچه نرم و راحت، مناسب مجالس و محل کار', 1200000, '/images/prod-shirt-2.jpg', c.clothing.id, 4.8, 60, 8_300_000),
    P('p-pants-1', 'شلوار جین مردانه اسلیم', 'slim-jeans-men', 'شلوار جین مردانه اسلیم فیت با پارچه کش‌سفارشی و دوام بالا', 1500000, '/images/prod-pants-1.jpg', c.pants.id, 4.6, 100, 8_200_000),
    P('p-pants-2', 'شلوار کتان زنانه', 'linen-pants-women', 'شلوار کتان زنانه با طراحی مدرن و راحتی فوق‌العاده، مناسب فصل بهار و تابستان', 1350000, '/images/prod-pants-2.jpg', c.pants.id, 4.5, 75, 8_100_000),
    P('p-glasses-1', 'عینک آفتابی لوکس مدل کلاسیک', 'luxury-sunglasses-classic', 'عینک آفتابی با فریم متالیک و عدسی پلاریزه، محافظت کامل در برابر UV', 1800000, '/images/prod-glasses-1.jpg', c.glasses.id, 4.9, 40, 8_000_000),
    P('p-glasses-2', 'عینک آفتابی مدرن', 'modern-sunglasses', 'عینک آفتابی با طراحی مدرن و رنگ‌های متنوع، مناسب استایل روزمره و مجلسی', 1600000, '/images/prod-glasses-2.jpg', c.glasses.id, 4.7, 55, 7_900_000),
    P('p-watch-1', 'ساعت مچی لوکس طلایی', 'luxury-gold-watch', 'ساعت مچی با بدنه طلایی و بند چرمی، طراحی شیک و کلاسیک برای آقایان', 4500000, '/images/prod-watch-1.jpg', c.watch.id, 4.8, 30, 7_800_000),
    P('p-watch-2', 'ساعت مچی اسپرت', 'sport-watch', 'ساعت مچی اسپرت با قابلیت ضدآب و طراحی مدرن، مناسب استفاده روزمره و ورزشی', 2800000, '/images/prod-watch-2.jpg', c.watch.id, 4.6, 45, 7_700_000),
    P('p-bag-1', 'کیف دستی زنانه چرم', 'leather-handbag-women', 'کیف دستی زنانه از چرم طبیعی با طراحی شیک و فضای داخلی جادار', 2300000, '/images/prod-bag-1.jpg', c.bag.id, 4.8, 50, 7_600_000),
    P('p-bag-2', 'کیف دوشی مردانه', 'mens-messenger-bag', 'کیف دوشی مردانه با چرم باکیفیت و طراحی مینیمال، مناسب محل کار و سفر', 1900000, '/images/prod-bag-2.jpg', c.bag.id, 4.5, 65, 7_500_000),
    P('p-belt-1', 'کمربند چرم مردانه', 'leather-belt-men', 'کمربند چرم طبیعی مردانه با سگکی استیل، طراحی شیک و دوام بالا', 650000, '/images/prod-belt-1.jpg', c.accessory.id, 4.4, 120, 7_400_000),
    P('p-jewelry-1', 'ست جواهری زنانه', 'womens-jewelry-set', 'ست جواهری زنانه شامل گردنبند و گوشواره با طراحی ظریف و درخشان', 3200000, '/images/prod-jewelry-1.jpg', c.accessory.id, 4.9, 25, 7_300_000),
  ];

  const B = (id: string, title: string, slug: string, excerpt: string, content: string, image: string, author: string, offset: number): Row => ({
    id,
    title,
    slug,
    excerpt,
    content,
    image_url: image,
    author,
    created_at: iso(offset),
  });

  const blog_posts: Row[] = [
    B(
      'b-1',
      'ترندهای مد پاییز ۱۴۰۵',
      'fall-1405-fashion-trends',
      'بررسی کامل ترندهای مد پاییز ۱۴۰۵ از رنگ‌های پاییزی تا استایل‌های جدید',
      'در فصل پاییز ۱۴۰۵ شاهد بازگشت رنگ‌های گرم و خنثی هستیم. تن‌های کرم، قهوه‌ای و نارنجی از رنگ‌های اصلی این فصل هستند. استایل لایه‌ای همچنان محبوب است و می‌توانید با ترکیب پیراهن‌های نازک و کت‌های سبک، یک استایل شیک پاییزی بسازید. شلوارهای گشاد و کتان نیز جای خود را در کمد هر فرد مد‌پسند باز کرده‌اند. در انتخاب اکسسوری، ساعت‌های کلاسیک و عینک‌های آفتاری با فریم بزرگ ترند روز هستند.',
      '/images/blog-1.jpg',
      'سارا احمدی',
      6_500_000,
    ),
    B(
      'b-2',
      'راهنمای انتخاب عینک آفتابی مناسب',
      'sunglasses-buying-guide',
      'همه چیزهایی که قبل از خرید عینک آفتابی باید بدانید',
      'انتخاب عینک آفتابی مناسب فقط به مدل و ظاهر آن محدود نمی‌شود. باید به فرم صورت، کیفیت عدسی و محافظت در برابر اشعه UV توجه کنید. برای صورت‌های گرد، عینک‌های زاویه‌دار مناسب‌تر هستند. برای صورت‌های مربعی، عینک‌های گردتر انتخاب بهتری است. عدسی‌های پلاریزه برای رانندگی و فعالیت‌های بیرونی بسیار توصیه می‌شوند. همچنین فریم سبک و راحت برای استفاده طولانی‌مدت اهمیت دارد.',
      '/images/blog-2.jpg',
      'محمد رضایی',
      5_500_000,
    ),
    B(
      'b-3',
      'چگونه ساعت مچی مناسب بخریم؟',
      'watch-buying-guide',
      'راهنمای جامع خرید ساعت مچی از سبک تا بودجه',
      'خرید ساعت مچی یکی از مهم‌ترین تصمیمات برای تکمیل استایل است. اولین نکته تعیین بودجه است. ساعت‌های مچی در قیمت‌های متنوعی موجود هستند. بعد از بودجه باید به سبک زندگی خود فکر کنید: ساعت اسپرت برای استفاده روزمره، ساعت کلاسیک برای مجالس و محیط‌های رسمی. جنس بدنه و بند نیز مهم است: استیل ضدزنگ، چرم طبیعی و سرامیک از بهترین گزینه‌ها هستند. در نهایت به اندازه دست و وزن ساعت نیز توجه کنید تا راحتی لازم را داشته باشد.',
      '/images/blog-3.jpg',
      'نگار کریمی',
      4_500_000,
    ),
  ];

  const reviews: Row[] = [
    { id: genId(), product_id: 'p-glasses-1', user_id: null, name: 'آرش موسوی', rating: 5, comment: 'کیفیت عالی، دقیقاً همون چیزی بود که می‌خواستم.', created_at: iso(1_200_000) },
    { id: genId(), product_id: 'p-shirt-1', user_id: null, name: 'نگار احمدی', rating: 5, comment: 'پارچه فوق‌العاده، دوخت تمیز و خوش‌فرم.', created_at: iso(1_000_000) },
    { id: genId(), product_id: 'p-watch-1', user_id: null, name: 'رضا کریمی', rating: 4, comment: 'طراحی زیبایی داره و بندش خیلی راحته.', created_at: iso(800_000) },
  ];

  return {
    categories,
    products,
    cart_items: [],
    orders: [],
    order_items: [],
    blog_posts,
    reviews,
  };
}

function loadDB(): Db {
  const existing = loadJSON<Db | null>(DB_KEY, null);
  if (existing && existing.products?.length) return existing;
  const fresh = seed();
  saveJSON(DB_KEY, fresh);
  return fresh;
}

/* -------------------------------------------------------------------------- */
/* Auth (local mock)                                                          */
/* -------------------------------------------------------------------------- */

type MockUser = { id: string; email: string; password: string; created_at: string };
type AuthListener = (event: string, session: Session | null) => void;

const authListeners: AuthListener[] = [];

function loadUsers(): MockUser[] {
  return loadJSON<MockUser[]>(USERS_KEY, []);
}

function saveUsers(users: MockUser[]): void {
  saveJSON(USERS_KEY, users);
}

function findUser(email: string): MockUser | undefined {
  return loadUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

function makeUser(u: MockUser): User {
  return {
    id: u.id,
    email: u.email,
    aud: 'authenticated',
    role: 'authenticated',
    app_metadata: { provider: 'email', providers: ['email'] },
    user_metadata: {},
    created_at: u.created_at,
  } as User;
}

function makeSession(u: MockUser): Session {
  const user = makeUser(u);
  return {
    access_token: 'mock-token',
    token_type: 'bearer',
    expires_in: 3600,
    expires_at: Math.floor(Date.now() / 1000) + 3600,
    refresh_token: 'mock-refresh',
    user,
  } as Session;
}

function loadSession(): Session | null {
  return loadJSON<Session | null>(SESSION_KEY, null);
}

function saveSession(session: Session | null): void {
  saveJSON(SESSION_KEY, session);
}

function notify(event: string, session: Session | null): void {
  authListeners.forEach((cb) => {
    try {
      cb(event, session);
    } catch {
      /* listener error */
    }
  });
}

function createUser(email: string, password: string): MockUser {
  const user: MockUser = {
    id: genId(),
    email,
    password,
    created_at: new Date().toISOString(),
  };
  saveUsers([...loadUsers(), user]);
  return user;
}

const auth = {
  getSession: async () => ({ data: { session: loadSession() }, error: null }),
  onAuthStateChange: (callback: AuthListener) => {
    authListeners.push(callback);
    return {
      data: {
        subscription: {
          unsubscribe() {
            const i = authListeners.indexOf(callback);
            if (i >= 0) authListeners.splice(i, 1);
          },
        },
      },
    };
  },
  signUp: async ({ email, password }: { email: string; password: string }) => {
    if (!email) return { data: { user: null, session: null }, error: { message: 'لطفاً ایمیل را وارد کنید' } };
    if (!password || password.length < 6) {
      return { data: { user: null, session: null }, error: { message: 'رمز عبور باید حداقل ۶ کاراکتر باشد' } };
    }
    const existing = findUser(email);
    if (existing && existing.password !== password) {
      return { data: { user: null, session: null }, error: { message: 'این ایمیل قبلاً ثبت شده است' } };
    }
    const user = existing || createUser(email, password);
    const session = makeSession(user);
    saveSession(session);
    notify('SIGNED_IN', session);
    return { data: { user: makeUser(user), session }, error: null };
  },
  signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
    const existing = findUser(email);
    if (existing && existing.password !== password) {
      return { data: { user: null, session: null }, error: { message: 'ایمیل یا رمز عبور نادرست است' } };
    }
    if (!password || password.length < 6) {
      return { data: { user: null, session: null }, error: { message: 'رمز عبور باید حداقل ۶ کاراکتر باشد' } };
    }
    const user = existing || createUser(email, password);
    const session = makeSession(user);
    saveSession(session);
    notify('SIGNED_IN', session);
    return { data: { user: makeUser(user), session }, error: null };
  },
  signOut: async () => {
    saveSession(null);
    notify('SIGNED_OUT', null);
    return { error: null };
  },
};

function currentUserId(): string | null {
  return loadSession()?.user?.id ?? null;
}

/* -------------------------------------------------------------------------- */
/* Query builder                                                              */
/* -------------------------------------------------------------------------- */

type Result<T> = { data: T | null; error: { message: string } | null };

type Filter = { col: string; op: 'eq' | 'neq' | 'ilike'; val: any };
type SortOrder = { col: string; asc: boolean };

function splitTop(str: string): string[] {
  const out: string[] = [];
  let depth = 0;
  let cur = '';
  for (const ch of str) {
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    if (ch === ',' && depth === 0) {
      out.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  if (cur.trim()) out.push(cur);
  return out.map((s) => s.trim());
}

type ParsedSelect = {
  cols: string[];
  relations: { alias: string; relTable: string; nested: string }[];
};

function parseSelect(clause: string): ParsedSelect {
  const cols: string[] = [];
  const relations: ParsedSelect['relations'] = [];
  for (const token of splitTop(clause)) {
    const colon = token.indexOf(':');
    if (colon > 0) {
      const alias = token.slice(0, colon).trim();
      const rest = token.slice(colon + 1).trim();
      const open = rest.indexOf('(');
      const relTable = rest.slice(0, open).trim();
      const nested = rest.slice(open + 1, rest.lastIndexOf(')')).trim();
      relations.push({ alias, relTable, nested });
    } else {
      cols.push(token);
    }
  }
  return { cols, relations };
}

function applySelect(rows: Row[], clause: string, db: Db): Row[] {
  const { cols, relations } = parseSelect(clause);
  const allCols = cols.length === 0 || cols.includes('*');
  return rows.map((row) => {
    const out: Row = {};
    if (allCols) {
      Object.assign(out, row);
    } else {
      for (const c of cols) {
        if (c !== '*' && c in row) out[c] = row[c];
      }
    }
    for (const rel of relations) {
      const related = (db[rel.relTable] || []).filter((r) => {
        if (rel.relTable === 'order_items') return r.order_id === row.id;
        if (rel.relTable === 'products') return r.id === row.product_id;
        if (rel.relTable === 'categories') return r.id === row.category_id;
        return false;
      });
      const proj = applySelect(related, rel.nested, db);
      out[rel.alias] = rel.relTable === 'order_items' ? proj : proj[0] ?? null;
    }
    return out;
  });
}

function matchesFilter(value: any, f: Filter): boolean {
  if (f.op === 'eq') return value === f.val;
  if (f.op === 'neq') return value !== f.val;
  if (f.op === 'ilike') {
    const pat = String(f.val).toLowerCase();
    const needle = pat.replace(/^%/, '').replace(/%$/, '');
    return String(value ?? '').toLowerCase().includes(needle);
  }
  return true;
}

class Query {
  private table: string;
  private op: 'select' | 'insert' | 'update' | 'delete' = 'select';
  private body: any = null;
  private filters: Filter[] = [];
  private orders: SortOrder[] = [];
  private limitN: number | null = null;
  private isSingle = false;
  private selectClause = '*';

  constructor(table: string) {
    this.table = table;
  }

  then<TResult1 = Result<Row>, TResult2 = never>(
    onfulfilled?: ((value: Result<Row>) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null,
  ): Promise<TResult1 | TResult2> {
    return this.execute().then(onfulfilled, onrejected);
  }

  catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null): Promise<Result<Row> | TResult> {
    return this.execute().catch(onrejected);
  }

  finally(onfinally?: (() => void) | null): Promise<Result<Row>> {
    return this.execute().finally(onfinally);
  }

  select(columns = '*'): this {
    this.selectClause = columns;
    return this;
  }

  eq(col: string, val: any): this {
    this.filters.push({ col, op: 'eq', val });
    return this;
  }

  neq(col: string, val: any): this {
    this.filters.push({ col, op: 'neq', val });
    return this;
  }

  ilike(col: string, val: string): this {
    this.filters.push({ col, op: 'ilike', val });
    return this;
  }

  order(col: string, opts?: { ascending?: boolean }): this {
    this.orders.push({ col, asc: opts?.ascending ?? true });
    return this;
  }

  limit(n: number): this {
    this.limitN = n;
    return this;
  }

  maybeSingle(): this {
    this.isSingle = true;
    return this;
  }

  single(): this {
    this.isSingle = true;
    return this;
  }

  insert(body: any): this {
    this.op = 'insert';
    this.body = body;
    return this;
  }

  update(body: any): this {
    this.op = 'update';
    this.body = body;
    return this;
  }

  delete(): this {
    this.op = 'delete';
    return this;
  }

  private execute(): Promise<Result<Row[] | Row>> {
    const db = loadDB();
    if (!db[this.table]) {
      return Promise.resolve({ data: null, error: { message: `جدول "${this.table}" یافت نشد` } });
    }

    const matches = (row: Row) => this.filters.every((f) => matchesFilter(row[f.col], f));
    const uid = currentUserId();

    if (this.op === 'insert') {
      const bodies = Array.isArray(this.body) ? this.body : [this.body];
      const inserted = bodies.map((b) => {
        const row: Row = { ...b };
        if (!row.id) row.id = genId();
        if (!row.created_at) row.created_at = new Date().toISOString();
        if (row.user_id === undefined && uid) row.user_id = uid;
        return row;
      });
      db[this.table] = [...db[this.table], ...inserted];
      saveJSON(DB_KEY, db);
      let rows = applySelect(clone(inserted), this.selectClause, db);
      if (this.isSingle) return Promise.resolve({ data: rows[0] ?? null, error: null });
      return Promise.resolve({ data: rows, error: null });
    }

    if (this.op === 'update') {
      const updated: Row[] = [];
      db[this.table] = db[this.table].map((row) => {
        if (matches(row)) {
          const merged = { ...row, ...this.body };
          updated.push(merged);
          return merged;
        }
        return row;
      });
      saveJSON(DB_KEY, db);
      let rows = applySelect(clone(updated), this.selectClause, db);
      if (this.isSingle) return Promise.resolve({ data: rows[0] ?? null, error: null });
      return Promise.resolve({ data: rows, error: null });
    }

    if (this.op === 'delete') {
      const deleted: Row[] = [];
      db[this.table] = db[this.table].filter((row) => {
        if (matches(row)) {
          deleted.push(row);
          return false;
        }
        return true;
      });
      saveJSON(DB_KEY, db);
      let rows = applySelect(clone(deleted), this.selectClause, db);
      if (this.isSingle) return Promise.resolve({ data: rows[0] ?? null, error: null });
      return Promise.resolve({ data: rows, error: null });
    }

    // select
    let rows = db[this.table].slice().filter(matches);
    for (const o of this.orders) {
      rows.sort((a, b) => {
        const av = a[o.col];
        const bv = b[o.col];
        if (av == null) return 1;
        if (bv == null) return -1;
        if (av < bv) return o.asc ? -1 : 1;
        if (av > bv) return o.asc ? 1 : -1;
        return 0;
      });
    }
    if (this.limitN != null) rows = rows.slice(0, this.limitN);
    const projected = applySelect(clone(rows), this.selectClause, db);
    if (this.isSingle) return Promise.resolve({ data: projected[0] ?? null, error: null });
    return Promise.resolve({ data: projected, error: null });
  }
}

function clone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v));
}

/* -------------------------------------------------------------------------- */
/* Client                                                                     */
/* -------------------------------------------------------------------------- */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Offline/demo client. Implements just the query + auth surface the app uses,
// backed by localStorage, seeded from the SQL migrations. When real Supabase
// credentials are configured this is replaced by the genuine client.
const mockClient = {
  from: (table: string) => new Query(table),
  auth,
} as unknown as SupabaseClient;

export const supabase: SupabaseClient =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          storage: window.localStorage,
          storageKey: 'technoshop-auth',
          detectSessionInUrl: true,
          flowType: 'implicit',
        },
      })
    : mockClient;
