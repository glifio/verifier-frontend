import { useCallback } from 'react'
import { useRouter } from 'next/router'
import {
  Page,
  NetworkConnection,
  VerifierIconHeaderFooter,
  navigate
} from '@glif/react-components'
import { GLIF_DISCORD } from '../constants'

export default function VerifierPage({ children, ...rest }) {
  const router = useRouter()
  const onNodeDisconnect = useCallback(() => {
    navigate(router, { pageUrl: PAGE.NODE_DISCONNECTED })
  }, [router])

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
      connection={
        <NetworkConnection
          lotusApiAddr={process.env.NEXT_PUBLIC_LOTUS_NODE_JSONRPC}
          apiKey={process.env.NEXT_PUBLIC_NODE_STATUS_API_KEY}
          statusApiAddr={process.env.NEXT_PUBLIC_NODE_STATUS_API_ADDRESS}
          errorCallback={onNodeDisconnect}
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
