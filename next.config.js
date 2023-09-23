/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["fastly.picsum.photos", "res.cloudinary.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://next-board-git-main-ysw753.vercel.app/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
