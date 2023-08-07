const { withContentlayer } = require('next-contentlayer')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// You might need to insert additional domains in script-src if you are using external services
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.googletagmanager.com *.google-analytics.com giscus.app analytics.umami.is vitals.vercel-insights.com d-collect.jennifersoft.com;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src *.s3.amazonaws.com;
  connect-src *;
  font-src 'self';
  frame-src giscus.app
`

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

/**
 * @type {import("next/dist/next-server/server/config").NextConfig}
 **/
module.exports = () => {
  const plugins = [withContentlayer, withBundleAnalyzer]
  return plugins.reduce((acc, next) => next(acc), {
    reactStrictMode: true,
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    eslint: {
      dirs: ['app', 'components', 'layouts', 'scripts'],
    },
    images: {
      domains: ['picsum.photos'],
    },
    experimental: {
      appDir: true,
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: securityHeaders,
        },
      ]
    },
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      })

      return config
    },
    async redirects() {
      return [
        {
          source: '/ERESOLVE-unable-to-resolve-dependency-tree.mdx',
          destination: '/blog/ERESOLVE-unable-to-resolve-dependency-tree.mdx',
          permanent: true,
        },
        {
          source: '/arrays-asList-alternative-Collections-singletonList.mdx',
          destination: '/blog/arrays-asList-alternative-Collections-singletonList.mdx',
          permanent: true,
        },
        {
          source: '/backtick-fix.mdx',
          destination: '/blog/backtick-fix.mdx',
          permanent: true,
        },
        {
          source: '/database-normalization-1-what-is.mdx',
          destination: '/blog/database-normalization-1-what-is.mdx',
          permanent: true,
        },
        {
          source: '/database-normalization-2-inf.mdx',
          destination: '/blog/database-normalization-2-inf.mdx',
          permanent: true,
        },
        {
          source: '/database-normalization-3-2nf-3nf-bcnf.mdx',
          destination: '/blog/database-normalization-3-2nf-3nf-bcnf.mdx',
          permanent: true,
        },
        {
          source: '/delete-property-without-delete.mdx',
          destination: '/blog/delete-property-without-delete.mdx',
          permanent: true,
        },
        {
          source: '/jvm-stack-and-register.mdx',
          destination: '/blog/jvm-stack-and-register.mdx',
          permanent: true,
        },
        {
          source: '/lombok.mdx',
          destination: '/blog/lombok.mdx',
          permanent: true,
        },
        {
          source: '/military.mdx',
          destination: '/blog/military.mdx',
          permanent: true,
        },
        {
          source: '/ngrinder-ecs.mdx',
          destination: '/blog/ngrinder-ecs.mdx',
          permanent: true,
        },
        {
          source: '/node-js-event-loop.mdx',
          destination: '/blog/node-js-event-loop.mdx',
          permanent: true,
        },
        {
          source: '/redis-dlm.mdx',
          destination: '/blog/redis-dlm.mdx',
          permanent: true,
        },
        {
          source: '/spring-history.mdx',
          destination: '/blog/spring-history.mdx',
          permanent: true,
        },
      ]
    },
  })
}
