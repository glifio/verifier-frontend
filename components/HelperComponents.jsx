import styled from 'styled-components'
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
    width: 50%;
    flex-grow: 0;
  }

  @media (max-width: ${devices.tablet}) {
    height: 250px;
  }
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;

  width: 100%;
  max-width: 650px;

  @media (max-width: ${devices.tablet}) {
    padding: 40px;
  }

  @media (min-width: ${devices.gt.tablet}) {
    width: 50%;
    flex-grow: 0;
    padding: ${space('large')} 50px 50px 50px;
  }
`
