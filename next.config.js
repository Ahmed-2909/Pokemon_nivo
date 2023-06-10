/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["jherr-pokemon.s3.us-west-1.amazonaws.com", "archives.bulbagarden.net"]
  }
}

module.exports = nextConfig



