/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.dbooks.org',
        port: '',
        pathname: '/img/books/**',
      },
    ],
  },
};

export default nextConfig;