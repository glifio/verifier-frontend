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
      description: 'A simple interface for sending and receiving Filecoin.',
      applicationCategory: 'Blockchain wallet',
      operatingSystem: 'All',
      url: 'https://wallet.glif.io'
    },
    {
      '@type': 'WebApplication',
      name: 'Glif Safe',
      description: 'A Filecoin Multisig.',
      applicationCategory: 'Blockchain wallet',
      operatingSystem: 'All',
      url: 'https://safe.glif.io'
    },
    {
      '@type': 'WebApplication',
      name: 'Glif Explorer',
      description: 'A Filecion analytics UI.',
      applicationCategory: 'Blockchain explorer',
      operatingSystem: 'All',
      url: 'https://explorer.glif.io'
    }
  ],
  parentOrganization: {
    '@type': 'Organization',
    name: 'Glif',
    description: 'Interoperable tools for the Filecoin network.',
    url: 'https://apps.glif.io',
    sameAs: ['https://github.com/glifio', 'https://twitter.com/glifio']
  }
}
