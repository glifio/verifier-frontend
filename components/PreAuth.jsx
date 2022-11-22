import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { IconGitHub, ButtonV2Link } from '@glif/react-components'

const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
const OAUTH_STATE_STRING = process.env.NEXT_PUBLIC_OAUTH_STATE_STRING
const GITHUB_REDIRECT_URL = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URL

export const PreAuth = () => {
  const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URL}&state=${OAUTH_STATE_STRING}-${uuidv4()}`
  return (
    <>
      <h2>Connect</h2>
      <ButtonV2Link large href={url}>
        <IconGitHub height='1.25em' />
        GitHub
      </ButtonV2Link>
    </>
  )
}
