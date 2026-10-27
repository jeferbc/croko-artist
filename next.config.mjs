/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  productionBrowserSourceMaps: false,
  sassOptions: {
    // Bootstrap 5.3 still uses @import; keep the build log readable
    quietDeps: true,
    silenceDeprecations: ['import', 'color-functions', 'global-builtin'],
  },
};

export default nextConfig;
