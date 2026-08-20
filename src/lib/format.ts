export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
}

/**
 * Resolve a static asset path that is correct regardless of the deploy base.
 * In local dev BASE_URL is '/'; under a GitHub Pages subpath it is e.g.
 * '/ModAra/'. Accepts either '/images/x.jpg' or 'images/x.jpg'.
 */
export function assetUrl(path: string): string {
  if (!path) return '';
  if (/^(https?:)?\/\//.test(path)) return path; // external / protocol-relative
  const base = import.meta.env.BASE_URL || '/';
  return base + path.replace(/^\/+/, '');
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatDateTime(date: string): string {
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}
