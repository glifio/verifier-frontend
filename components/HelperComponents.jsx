import styled, { css } from 'styled-components'
import {
  Box,
  ButtonV2,
  devices,
  space,
  fontSize,
  baseColors
} from '@glif/react-components'

export const ResponsiveVerifierTile = styled.div`
  cursor: default;

  @media (min-width: ${devices.gt.tablet}) {
    position: sticky;
    top: ${space()};
    height: 100%;
    min-height: 60vw;
  }

  @media (max-width: ${devices.tablet}) {
    height: 250px;
  }
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  @media (max-width: ${devices.tablet}) {
    padding: 80px 10px 10px;
  }

  @media (min-width: ${devices.gt.tablet}) {
    padding: ${space('large')} 50px 50px 50px;
  }
`
