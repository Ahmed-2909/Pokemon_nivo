const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["jherr-pokemon.s3.us-west-1.amazonaws.com", "archives.bulbagarden.net"]
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        module: false,
      };
    }

    return config;
  },
};

module.exports = nextConfig;
