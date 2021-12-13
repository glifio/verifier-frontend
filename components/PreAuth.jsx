import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { IconGitHub, H2, fontSize, ButtonV2, Box } from '@glif/react-components'

const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
const OAUTH_STATE_STRING = process.env.NEXT_PUBLIC_OAUTH_STATE_STRING
const GITHUB_REDIRECT_URL = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URL

export default function PreAuthenticated() {
  return (
    <>
      <H2
        style={{
          marginTop: 0,
          marginBottom: '1em',
          fontWeight: 'normal',
          fontSize: fontSize('large'),
          lineHeight: '1.3em'
        }}
      >
        Connect
      </H2>
      <ButtonV2
        onClick={() => {
          window.location.href = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URL}&state=${OAUTH_STATE_STRING}-${uuidv4()}`
        }}
        css={`
          &:hover {
            color: black;
            border-color: black;
          }
        `}
      >
        <IconGitHub size={5} mr={2} fill='black' />
        GitHub
      </ButtonV2>
      <Box mx={0} minHeight={6} mt={3} />
    </>
  )
}
