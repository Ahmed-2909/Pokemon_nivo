/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["jherr-pokemon.s3.us-west-1.amazonaws.com", "archives.bulbagarden.net"]
  }
}

module.exports = nextConfig

// const withTM = require('next-transpile-modules')(['d3-color']);

// module.exports = withTM({
//   webpack: (config) => {
//     config.module.rules.push({
//       test: /\.mjs$/,
//       include: /node_modules/,
//       type: 'javascript/auto',
//     });

//     return config;
//   },
// });


