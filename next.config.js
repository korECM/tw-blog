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
          source: '/ERESOLVE-unable-to-resolve-dependency-tree',
          destination: '/blog/ERESOLVE-unable-to-resolve-dependency-tree',
          permanent: true,
        },
        {
          source: '/arrays-asList-alternative-Collections-singletonList',
          destination: '/blog/arrays-asList-alternative-Collections-singletonList',
          permanent: true,
        },
        {
          source: '/backtick-fix',
          destination: '/blog/backtick-fix',
          permanent: true,
        },
        {
          source: '/database-normalization-1-what-is',
          destination: '/blog/database-normalization-1-what-is',
          permanent: true,
        },
        {
          source: '/database-normalization-2-inf',
          destination: '/blog/database-normalization-2-inf',
          permanent: true,
        },
        {
          source: '/database-normalization-3-2nf-3nf-bcnf',
          destination: '/blog/database-normalization-3-2nf-3nf-bcnf',
          permanent: true,
        },
        {
          source: '/delete-property-without-delete',
          destination: '/blog/delete-property-without-delete',
          permanent: true,
        },
        {
          source: '/jvm-stack-and-register',
          destination: '/blog/jvm-stack-and-register',
          permanent: true,
        },
        {
          source: '/lombok',
          destination: '/blog/lombok',
          permanent: true,
        },
        {
          source: '/military',
          destination: '/blog/military',
          permanent: true,
        },
        {
          source: '/ngrinder-ecs',
          destination: '/blog/ngrinder-ecs',
          permanent: true,
        },
        {
          source: '/node-js-event-loop',
          destination: '/blog/node-js-event-loop',
          permanent: true,
        },
        {
          source: '/redis-dlm',
          destination: '/blog/redis-dlm',
          permanent: true,
        },
        {
          source: '/spring-history',
          destination: '/blog/spring-history',
          permanent: true,
        },
      ]
    },
  })
}
