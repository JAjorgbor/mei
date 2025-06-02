/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/seapane-cloud/**',
      },
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
        port: '',
      },
    ],
  },
}

export default nextConfig
