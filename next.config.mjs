/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/20232024',
        permanent: true,
      },
    ]
  },
    images: {
        domains: ['assets.nhle.com'],
      },
};

export default nextConfig;
