import {
  Page,
  VerifierIconHeaderFooter
} from '@glif/react-components'
import { GLIF_DISCORD } from '../constants'

export default function VerifierPage({ children, ...rest }) {
  return (
    <Page
      appIcon={<VerifierIconHeaderFooter />}
      appHeaderLinks={[
        {
          title: 'Wallet',
          url: process.env.NEXT_PUBLIC_WALLET_URL
        },
        {
          title: 'Safe',
          url: process.env.NEXT_PUBLIC_SAFE_URL
        },
        {
          title: 'Explorer',
          url: process.env.NEXT_PUBLIC_EXPLORER_URL
        },
        {
          title: 'Discord',
          url: GLIF_DISCORD
        }
      ]}
      {...rest}
    >
      {children}
    </Page>
  )
}

VerifierPage.propTypes = {
  ...Page.propTypes
}
