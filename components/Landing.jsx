import React from 'react'
import {
  AppTile,
  LandingPageColumns,
  OneColumn,
  OneColumnLargeText,
  useNetworkName
} from '@glif/react-components'
import PreAuth from './PreAuth'
import PostAuth from './PostAuth'
import CheckVerifiedStorageAmount from './CheckVerifiedStorageAmount'
import { useJwt } from '../lib/JwtHandler'
import Education from './Education'
import VerifierPage from './VerifierPage'

export default function Landing() {
  const { jwt } = useJwt()
  const { networkName } = useNetworkName(
    process.env.NEXT_PUBLIC_LOTUS_NODE_JSONRPC
  )

  return (
    <VerifierPage preFooter={<Education />}>
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
          <div>
            <OneColumn>
              {jwt ? <PostAuth /> : <PreAuth />}
            </OneColumn>
            <OneColumn>
              <CheckVerifiedStorageAmount />
            </OneColumn>
          </div>
        )}
      </LandingPageColumns>
    </VerifierPage>
  )
}
