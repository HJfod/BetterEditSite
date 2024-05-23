
import 'astro/client'

export function prefixURL(url: string): string {
    if (url.startsWith('https://') || url.startsWith('#')) {
        return url;
    }
    let base = import.meta.env.BASE_URL;
    if (base.endsWith('/')) {
        base = base.substring(0, base.length - 1);
    }
    return base + url;
}
