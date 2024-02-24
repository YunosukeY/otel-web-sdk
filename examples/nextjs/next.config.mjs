/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/v1/traces",
        destination: "http://localhost:4318/v1/traces",
      },
      {
        source: "/v1/metrics",
        destination: "http://localhost:4318/v1/metrics",
      },
      {
        source: "/v1/logs",
        destination: "http://localhost:4318/v1/logs",
      },
    ];
  },
};

export default nextConfig;
