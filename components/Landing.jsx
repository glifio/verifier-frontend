import React from 'react'
import {
  AppTile,
  LandingPageColumns,
  Network,
  OneColumn,
  OneColumnLargeText,
  useEnvironment
} from '@glif/react-components'
import { PreAuth } from './PreAuth'
import { PostAuth } from './PostAuth'
import { CheckAddress } from './CheckAddress'
import { useJwt } from '../lib/JwtHandler'
import Education from './Education'
import VerifierPage from './VerifierPage'

export default function Landing() {
  const { jwt } = useJwt()
  const { networkName } = useEnvironment()

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
        {networkName && networkName !== Network.MAINNET ? (
          <OneColumnLargeText className='primary'>
            <p>
              We&apos;re sorry, the Glif Verifier only supports Mainnet right
              now!
            </p>
          </OneColumnLargeText>
        ) : (
          <div>
            <OneColumn>{jwt ? <PostAuth /> : <PreAuth />}</OneColumn>
            <OneColumn>
              <CheckAddress />
            </OneColumn>
          </div>
        )}
      </LandingPageColumns>
    </VerifierPage>
  )
}
