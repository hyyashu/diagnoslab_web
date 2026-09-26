import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  /* Static export: `next build` writes plain HTML/JS/CSS to out/, which is
     uploaded to the LiteSpeed host as-is. No Node server runs in production,
     so anything needing one (redirects, rewrites, image optimisation, route
     handlers) lives in public/.htaccess or is not used. */
  output: "export",
  /* /contact-us/index.html rather than contact-us.html: works on any static
     host without rewrites, and matches the trailing-slash URLs Google has
     indexed. */
  trailingSlash: true,
  /* The image optimiser needs a server. Source images are already small
     .avif files, so they are served as they are. */
  images: { unoptimized: true },
};

export default nextConfig;
