import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
 
 
const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript:{
    ignoreBuildErrors:true,
  }
  ,
  images: {
    domains: ['zzrl-003.dx.commercecloud.salesforce.com', 'edge.disstg.commercecloud.salesforce.com','cdn.sanity.io'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};
const withNextIntl = createNextIntlPlugin();
 
if (process.env.NODE_ENV === "development") {
  (async () => {
    await setupDevPlatform();
  })();
}

export default withSentryConfig(withNextIntl(nextConfig), {
    // For all available options, see:
    // https://www.npmjs.com/package/@sentry/webpack-plugin#options
 
    org: "accenture-h3p",
    project: "javascript-nextjs",
 
    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,
 
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
 
    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,
 
    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: "/monitoring",
 
    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
 
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  });