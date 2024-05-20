/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['api.multiavatar.com', "res.cloudinary.com"], // Añade el dominio de la imagen remota
  },
}

module.exports = nextConfig
