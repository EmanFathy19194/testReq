const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://request-com.runasp.net/api/:path*", // Proxy to Backend
      },
    ];
  },
  env: {
    API_URL: "http://request-com.runasp.net",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};
