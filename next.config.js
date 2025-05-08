/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.multiavatar.com',
      },
    ],
    domains: [ "res.cloudinary.com"],
  },
}

module.exports = nextConfig;