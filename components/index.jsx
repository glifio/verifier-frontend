import React from 'react'
import {
  AppTile,
  Box,
  Footer,
  LandingPageContainer,
  LandingPageContentContainer,
  space,
  devices,
  useNetworkName,
  fontSize,
  theme,
  P
} from '@glif/react-components'
import styled from 'styled-components'
import { ResponsiveVerifierTile, ContentContainer } from './HelperComponents'
import PreAuth from './PreAuth'
import PostAuth from './PostAuth'
import CheckVerifiedStorageAmount from './CheckVerifiedStorageAmount'
import { useJwt } from '../lib/JwtHandler'
import Education from './Education'
import { TextBox } from './TextBox'

const LandingPageContentContainerStyled = styled(LandingPageContentContainer)`
  @media (min-width: ${devices.tablet}) {
    grid-template-rows: none;
    grid-template-areas: 'icon content';
    min-height: 60vh;
    padding-bottom: ${space()};
  }
`

export default function Landing() {
  const { jwt } = useJwt()
  const { networkName } = useNetworkName(
    process.env.NEXT_PUBLIC_LOTUS_NODE_JSONRPC
  )

  return (
    <>
      <LandingPageContainer>
        <LandingPageContentContainerStyled>
          <ResponsiveVerifierTile>
            <AppTile
              title='Verifier'
              description='A Filecoin notary service.'
              imgSrc='/bg-verifier.jpg'
              imgSrcHover='/bg-verifier-hover.jpg'
              small={false}
              large
            />
          </ResponsiveVerifierTile>
          <ContentContainer>
            <Box
              css={`
                min-width: 0;
                box-sizing: border-box;
                display: -webkit-box;
                display: -webkit-flex;
                display: -ms-flexbox;
                display: flex;
                width: 100%;
                -webkit-flex-direction: column;
                -ms-flex-direction: column;
                flex-direction: column;
                max-width: 550px;
                margin: 0 auto;
                justify-content: space-around;
              `}
            >
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
                    We&apos;re sorry, the Glif Verifier only supports Mainnet
                    right now!
                  </P>
                </TextBox>
              ) : (
                <>
                  {jwt ? <PostAuth /> : <PreAuth />}
                  <CheckVerifiedStorageAmount />
                </>
              )}
            </Box>
          </ContentContainer>
        </LandingPageContentContainerStyled>
        <Box padding={`0 ${space()} ${space()}`}>
          <Education />
          <Footer />
        </Box>
      </LandingPageContainer>
    </>
  )
}
