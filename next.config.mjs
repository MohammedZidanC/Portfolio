/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow images from these external domains (for any future use)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.fontshare.com',
      },
    ],
    // Local images in /public are served automatically — no config needed
  },

  // Headers for performance and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        // Cache static assets aggressively
        source: '/(.*)\\.(png|jpg|jpeg|svg|ico|pdf|woff2|woff)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
