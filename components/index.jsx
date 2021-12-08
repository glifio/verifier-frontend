import React from 'react'
import {
  AppTile,
  Box,
  Footer,
  LandingPageContainer,
  LandingPageContentContainer,
  space
} from '@glif/react-components'
import { ResponsiveVerifierTile, ContentContainer } from './HelperComponents'
import PreAuth from './PreAuth'
import PostAuth from './PostAuth'
import CheckVerifiedStorageAmount from './CheckVerifiedStorageAmount'
import { useJwt } from '../lib/JwtHandler'

export default function Landing() {
  const { jwt } = useJwt()
  return (
    <>
      <LandingPageContainer
        css={`
          background: white;
        `}
      >
        <LandingPageContentContainer>
          <ResponsiveVerifierTile>
            <AppTile
              title='Verifier'
              description='A Filecoin notary service.'
              imgSrc='/imgverify.png'
              large
            />
          </ResponsiveVerifierTile>
          <ContentContainer>
            {true ? <PostAuth /> : <PreAuth />}
            <CheckVerifiedStorageAmount />
          </ContentContainer>
        </LandingPageContentContainer>
      </LandingPageContainer>
      <Box padding={`0 ${space()} ${space()}`}>
        <Footer />
      </Box>
    </>
  )
}
