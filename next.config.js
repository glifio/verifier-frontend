const path = require('path')
const pkgjson = require('./package.json')

const {
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER
} = require('next/constants')

module.exports = (phase) => ({
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
      next: path.resolve('./node_modules/next'),
      'styled-components': path.resolve('./node_modules/styled-components')
    }
    return config
  },
  env: {
    NEXT_PUBLIC_PACKAGE_NAME: pkgjson.name,
    NEXT_PUBLIC_PACKAGE_VERSION: pkgjson.version,
    NEXT_PUBLIC_GITHUB_CLIENT_ID:
      process.env.GITHUB_CLIENT_ID || '8e972b0441d34ebd94a3',
    NEXT_PUBLIC_GITHUB_REDIRECT_URL:
      process.env.GITHUB_REDIRECT_URL ||
      'https://github-oauth.glif.io/callback',
    NEXT_PUBLIC_HOME_URL: process.env.HOME_URL || 'https://glif.io',
    NEXT_PUBLIC_BLOG_URL: process.env.BLOG_URL || 'https://blog.glif.io/',
    NEXT_PUBLIC_WALLET_URL:
      process.env.WALLET_URL || 'https://wallet-calibration.glif.link',
    NEXT_PUBLIC_SAFE_URL:
      process.env.SAFE_URL || 'https://safe-calibration.glif.link',
    NEXT_PUBLIC_EXPLORER_URL:
      process.env.EXPLORER_URL || 'https://explorer-calibration.glif.link',
    NEXT_PUBLIC_VERIFIER_URL:
      process.env.VERIFIER_URL || 'https://mainnet.verify.backend.glif.io',
    NEXT_PUBLIC_OAUTH_STATE_STRING:
      process.env.OAUTH_STATE_STRING || 'verifier',
    NEXT_PUBLIC_LOTUS_NODE_JSONRPC:
      process.env.LOTUS_NODE_JSONRPC || 'https://api.node.glif.io',
    NEXT_PUBLIC_NETWORK_IDENTIFIER: process.env.NETWORK_IDENTIFIER || 'mainnet',
    NEXT_PUBLIC_IS_PROD:
      phase === PHASE_PRODUCTION_SERVER || phase === PHASE_PRODUCTION_BUILD,
    NEXT_PUBLIC_NODE_STATUS_API_KEY:
      process.env.NODE_STATUS_API_KEY || 'm787669344-2a9b90eb03dbff3e503c93c7',
    NEXT_PUBLIC_NODE_STATUS_API_ADDRESS:
      process.env.STATUS_API_ADDRESS ||
      'https://api.uptimerobot.com/v2/getMonitors',
    NEXT_PUBLIC_SENTRY_DSN: process.env.SENTRY_DSN,
    NEXT_PUBLIC_SENTRY_ENV: process.env.SENTRY_ENV
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  trailingSlash: true
})
