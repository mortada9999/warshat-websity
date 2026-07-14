// Cloudflare Workers environment bindings
interface CloudflareEnv {
  [key: string]: unknown;
  DB: D1Database;
  ADMIN_SECRET: string;
}

declare namespace NodeJS {
  interface ProcessEnv {
    ADMIN_SECRET?: string;
  }
}
