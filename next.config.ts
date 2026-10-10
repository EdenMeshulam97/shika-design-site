import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Optimized images are cached by browsers and Cloudflare for 31 days instead of the 4-hour default,
    // so photos aren't re-processed on the server every few hours. When replacing a photo, give the
    // new file a new name so visitors don't keep seeing the cached old one.
    minimumCacheTTL: 2678400,
    // AVIF is intentionally not enabled: Cloudflare caches one version per URL (it ignores the Accept
    // header), so browsers without AVIF support could be served an AVIF they can't display.
  },
};

export default nextConfig;
