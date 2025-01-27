/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "i.imgur.com",
      "via.placeholder.com",
      "firebasestorage.googleapis.com",
    ],
  },
};

export default nextConfig;
