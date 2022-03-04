import React from 'react'
import {
  AppTile,
  LandingPageColumns,
  LandingPageContent,
  Page,
  useNetworkName,
  fontSize,
  theme,
  P
} from '@glif/react-components'
import PreAuth from './PreAuth'
import PostAuth from './PostAuth'
import CheckVerifiedStorageAmount from './CheckVerifiedStorageAmount'
import { useJwt } from '../lib/JwtHandler'
import Education from './Education'
import { TextBox } from './TextBox'

export default function Landing() {
  const { jwt } = useJwt()
  const { networkName } = useNetworkName(
    process.env.NEXT_PUBLIC_LOTUS_NODE_JSONRPC
  )

  return (
    <Page hideAppHeader>
      <LandingPageColumns>
        <AppTile
          title='Verifier'
          description='A Filecoin notary service.'
          imgSrc='/bg-verifier.jpg'
          imgSrcHover='/bg-verifier-hover.jpg'
          small={false}
          large
        />
        <LandingPageContent>
          {networkName && networkName !== 'Mainnet' ? (
            <TextBox
              style={{
                background: theme.colors.core.primary
              }}
            >
              <P
                css={`
                  font-size: ${fontSize('large')};
                  color: white;
                  text-align: center;
                `}
              >
                We&apos;re sorry, the Glif Verifier only supports Mainnet right
                now!
              </P>
            </TextBox>
          ) : (
            <>
              {jwt ? <PostAuth /> : <PreAuth />}
              <CheckVerifiedStorageAmount />
            </>
          )}
          <Education />
        </LandingPageContent>
      </LandingPageColumns>
    </Page>
  )
}
