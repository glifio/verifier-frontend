import React from 'react'
import {
  AppTile,
  LandingPageColumns,
  LandingPageContent,
  OneColumnLargeText,
  Page,
  useNetworkName
} from '@glif/react-components'
import PreAuth from './PreAuth'
import PostAuth from './PostAuth'
import CheckVerifiedStorageAmount from './CheckVerifiedStorageAmount'
import { useJwt } from '../lib/JwtHandler'
import Education from './Education'

export default function Landing() {
  const { jwt } = useJwt()
  const { networkName } = useNetworkName(
    process.env.NEXT_PUBLIC_LOTUS_NODE_JSONRPC
  )

  return (
    <Page hideAppHeader preFooter={<Education />}>
      <LandingPageColumns>
        <AppTile
          title='Verifier'
          description='A Filecoin notary service.'
          imgSrc='/bg-verifier.jpg'
          imgSrcHover='/bg-verifier-hover.jpg'
          small={false}
          large
        />
        {networkName && networkName !== 'Mainnet' ? (
          <OneColumnLargeText className='primary'>
            <p>
              We&apos;re sorry, the Glif Verifier only supports Mainnet right
              now!
            </p>
          </OneColumnLargeText>
        ) : (
          <LandingPageContent>
            {jwt ? <PostAuth /> : <PreAuth />}
            <CheckVerifiedStorageAmount />
          </LandingPageContent>
        )}
      </LandingPageColumns>
    </Page>
  )
}
