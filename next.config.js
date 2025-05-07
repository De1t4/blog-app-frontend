/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.multiavatar.com',
      },
    ],
    domains: ['api.multiavatar.com', "res.cloudinary.com"], // You can keep the domains array as is
  },
}

module.exports = nextConfig;