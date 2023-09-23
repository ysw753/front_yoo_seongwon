/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["fastly.picsum.photos", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
