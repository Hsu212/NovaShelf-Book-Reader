/** @type {import('next').NextConfig} */
const nextConfig = {

  eslint: {
    ignoreDuringBuilds: true, 
  },
  
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
