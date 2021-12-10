import React from 'react'
import {
  AppTile,
  Box,
  Footer,
  LandingPageContainer,
  LandingPageContentContainer,
  space,
  devices
} from '@glif/react-components'
import { ResponsiveVerifierTile, ContentContainer } from './HelperComponents'
import PreAuth from './PreAuth'
import PostAuth from './PostAuth'
import CheckVerifiedStorageAmount from './CheckVerifiedStorageAmount'
import { useJwt } from '../lib/JwtHandler'
import Education from './Education'
import styled, { css } from 'styled-components'

const LandingPageContentContainerStyled = styled(LandingPageContentContainer)`
  @media (min-width: ${devices.gt.tablet}) {
    grid-template-rows: none;
    grid-template-areas: 'icon content';
    min-height: 60vh;
    padding-bottom: ${space()};
  }
`

export default function Landing() {
  const { jwt } = useJwt()
  return (
    <>
      <LandingPageContainer>
        <LandingPageContentContainerStyled>
          <ResponsiveVerifierTile>
            <AppTile
              title='Verifier'
              description='A Filecoin notary service.'
              imgSrc='/bg-verifier.jpg'
              small={false}
              large
            />
          </ResponsiveVerifierTile>
          <ContentContainer>
            <Box
              style={css`
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
              `}
            >
              {false ? <PostAuth /> : <PreAuth />}
              <CheckVerifiedStorageAmount />
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
