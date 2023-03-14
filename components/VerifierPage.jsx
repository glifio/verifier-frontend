import { useCallback } from 'react'
import { Page, IconVerifier, NetworkSelector } from '@glif/react-components'
import { GLIF_DISCORD } from '../constants'

export default function VerifierPage({ children, ...rest }) {
  const onNodeDisconnect = useCallback(() => {}, [])

  return (
    <Page
      appIcon={<IconVerifier />}
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
      connection={
        <NetworkSelector
          errorCallback={onNodeDisconnect}
          enableSwitching={false}
        />
      }
      {...rest}
    >
      {children}
    </Page>
  )
}

VerifierPage.propTypes = {
  ...Page.propTypes
}
