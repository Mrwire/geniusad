export interface Env {
  ASSETS: R2Bucket;
}

const CONTENT_TYPES: Record<string, string> = {
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
};

function extname(path: string): string {
  const i = path.lastIndexOf('.');
  return i >= 0 ? path.slice(i).toLowerCase() : '';
}

function inferContentType(key: string, fallback?: string) {
  return CONTENT_TYPES[extname(key)] || fallback || 'application/octet-stream';
}

function mutableHeaders(isImmutable: boolean) {
  return isImmutable
    ? 'public, max-age=31536000, immutable'
    : 'public, s-maxage=3600, max-age=3600, stale-while-revalidate=300';
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    let key = url.pathname.replace(/^\/+/, '');
    if (!key) return new Response('Not Found', { status: 404 });

    // Optional prefix routing, e.g., "/videos/..." -> store as-is
    // You can rewrite here if needed.

    const range = request.headers.get('Range');
    const r2Options: R2GetOptions = {};

    // Basic byte-range support (e.g., bytes=START-END)
    let rangeStart: number | undefined;
    let rangeEnd: number | undefined;
    if (range && range.startsWith('bytes=')) {
      const [startStr, endStr] = range.replace('bytes=', '').split('-');
      if (startStr) rangeStart = Number(startStr);
      if (endStr) rangeEnd = Number(endStr);
      if (!Number.isNaN(rangeStart!)) {
        if (!Number.isNaN(rangeEnd!)) {
          const length = rangeEnd! - rangeStart! + 1;
          if (length > 0) r2Options.range = { offset: rangeStart!, length };
        } else {
          r2Options.range = { offset: rangeStart! };
        }
      }
    }

    const object = await env.ASSETS.get(key, r2Options);
    if (!object) return new Response('Not Found', { status: 404 });

    const headers = new Headers();
    const httpMeta = object.httpMetadata || {};
    const etag = object.etag;
    const size = object.size;

    const contentType = httpMeta.contentType || inferContentType(key);
    headers.set('Content-Type', contentType);
    if (httpMeta.contentDisposition) headers.set('Content-Disposition', httpMeta.contentDisposition);
    if (httpMeta.contentLanguage) headers.set('Content-Language', httpMeta.contentLanguage);
    if (httpMeta.cacheControl) headers.set('Cache-Control', httpMeta.cacheControl);

    const isImmutable = /\.[a-f0-9]{8,}\./i.test(key); // treat hashed filenames as immutable
    if (!httpMeta.cacheControl) headers.set('Cache-Control', mutableHeaders(isImmutable));

    if (etag) headers.set('ETag', etag);
    if (rangeStart !== undefined) headers.set('Accept-Ranges', 'bytes');

    // Handle If-None-Match for simple caching
    const inm = request.headers.get('If-None-Match');
    if (inm && etag && inm.replace(/W\//, '') === etag.replace(/W\//, '')) {
      return new Response(null, { status: 304, headers });
    }

    if (object.body) {
      if (r2Options.range && rangeStart !== undefined) {
        const end = rangeEnd ?? size - 1;
        headers.set('Content-Range', `bytes ${rangeStart}-${end}/${size}`);
        headers.set('Content-Length', String(end - rangeStart + 1));
        return new Response(object.body, { status: 206, headers });
      }
      headers.set('Content-Length', String(size));
      return new Response(object.body, { status: 200, headers });
    }

    return new Response('No Content', { status: 204 });
  },
};

