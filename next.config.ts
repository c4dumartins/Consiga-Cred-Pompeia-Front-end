import type { NextConfig } from "next";

const nextConfig: NextConfig = {
images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org', // Autoriza a Wikipédia
        port: '',
        pathname: '/**',
      },
      // Se tiver outros sites (ex: imagens do Google), adicione aqui também
    ],
  },
};

export default nextConfig;
