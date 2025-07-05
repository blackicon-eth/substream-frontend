import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Handle WASM modules
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };

    // Handle WASM files
    config.module.rules.push({
      test: /\.wasm$/,
      type: "asset/resource",
    });

    // Handle WASM loader files
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };

    return config;
  },
};

export default nextConfig;
