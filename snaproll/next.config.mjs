const backendUrl = process.env.BACKEND_URL || "http://localhost:5002";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow phones and other devices on this development Wi-Fi network to load
  // Next.js HMR assets. Keep production origins configured separately.
  allowedDevOrigins: ["192.168.1.69"],
  async rewrites() {
    return [
      { source: "/api/:path*", destination: `${backendUrl}/api/:path*` },
      { source: "/health", destination: `${backendUrl}/health` },
    ];
  },
};

export default nextConfig;
