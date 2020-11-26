export default {
  '@context': 'http://schema.org/',
  '@type': 'WebApplication',
  name: 'Glif Verifier',
  description: 'Granting verified data allowances to Filecoin addresses.',
  url: 'https://verify.glif.io',
  applicationCategory: 'Blockchain wallet',
  operatingSystem: 'All',
  knowsAbout: [
    {
      '@type': 'SoftwareApplication',
      name: 'Filecoin',
      url: 'https://filecoin.io',
      applicationCategory: 'Blockchain network',
      operatingSystem: 'All'
    },
    {
      '@type': 'WebApplication',
      name: 'Glif Wallet',
      description:
        'A web wallet to manage your Filecoin on your Ledger device.',
      applicationCategory: 'Blockchain wallet',
      operatingSystem: 'All',
      url: 'https://wallet.glif.io'
    }
  ],
  parentOrganization: {
    '@type': 'Organization',
    name: 'Infinite Scroll',
    description: 'Self-sustaining systems for the worlds to come.',
    url: 'https://infinitescroll.org',
    sameAs: [
      'https://github.com/infinitescroll',
      'https://twitter.com/infinitescroll_',
      'https://www.are.na/infinite-scroll'
    ]
  }
}
