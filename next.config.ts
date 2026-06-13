import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ hostname: 'pixmorph.com' }],
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false
    return config
  },
  turbopack: {},
}

export default nextConfig
