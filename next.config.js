/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['d3-color']);
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["jherr-pokemon.s3.us-west-1.amazonaws.com", "archives.bulbagarden.net"]
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'd3-color': false
    };

    return config;
  }
}

module.exports = nextConfig



