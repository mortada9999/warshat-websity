const securityHeaders = [
  { key: 'X-Frame-Options',              value: 'DENY' },
  { key: 'X-Content-Type-Options',       value: 'nosniff' },
  { key: 'Referrer-Policy',              value: 'strict-origin-when-cross-origin' },
  { key: 'Strict-Transport-Security',   value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Permissions-Policy',           value: 'camera=(), microphone=(), geolocation=()' },
];

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.10.88', '192.168.68.109', '192.168.68.115', '192.168.6.1', 'localhost:3000'],
  headers: async () => [
    {
      source: '/(.*)',
      headers: securityHeaders,
    },
  ],
};

export default nextConfig;
