import styled from 'styled-components'
import { fontSize, space, devices } from '@glif/react-components'

export const TextBox = styled.div`
  font-size: ${fontSize('large')};
  border-radius: 8px;
  margin-top: ${space()};
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (max-width: ${devices.tablet}) {
    padding: 30px;
  }

  @media (min-width: ${devices.tablet}) {
    padding: 80px 40px;
  }

  p {
    margin: 0;
  }
`
