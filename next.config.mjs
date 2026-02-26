/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // this enables next export
  webpack: (config, { isServer }) => {
    // Add polyfill for URL.canParse for older Node.js versions
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
      };
    }
    return config;
  },
};

export default nextConfig;
