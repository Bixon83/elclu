// next.config.js
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,

  // Para poder usar <Image> desde cf.geekdo-images.com
  images: {
    domains: ['cf.geekdo-images.com'],
  },

  experimental: {
    // tal como lo tenías
    runtime: 'nodejs',
    serverComponents: true,
    reactRoot: true,
  },

  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

  env: {
    NEXT_PUBLIC_BASE_URL: `${process.env.NEXTAUTH_URL}/`,
    NEXT_PUBLIC_POSTS_PER_PAGE: 5,
    NEXT_PUBLIC_USERS_PER_PAGE: 3,
    NEXT_PUBLIC_DEFAULT_THEME: 'theme-blue',
  },

  serverRuntimeConfig: {
    SECRET: process.env.SECRET,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },

  publicRuntimeConfig: {},
};

module.exports = nextConfig;
