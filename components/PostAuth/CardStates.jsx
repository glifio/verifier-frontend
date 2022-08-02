import React from 'react'
import { string, bigint } from 'prop-types'
import { ADDRESS_PROPTYPE, Label, StyledATag } from '@glif/react-components'
import truncateAddress from '../../utils/truncateAddress'

const EXPLORER = process.env.NEXT_PUBLIC_EXPLORER_URL

export const Confirming = ({ err, cid }) => {
  return (
    <>
      <StyledATag
        display='inline'
        rel='noopener noreferrer'
        target='_blank'
        border='none'
        height='min-content'
        href={`${EXPLORER}/message/?cid=${cid}`}
      >
        View your pending message.
      </StyledATag>
      {err && (
        <Label color='status.fail.background' m={0}>
          {err}
        </Label>
      )}
    </>
  )
}

Confirming.propTypes = {
  err: string,
  cid: string.isRequired
}

Confirming.defaultProps = {
  err: ''
}

export const Confirmed = ({ address, cid, allowance }) => {
  const allowanceGbBig = allowance / 1073741824n
  const allowanceGbNr = Number(allowanceGbBig)
  return (
    <>
      <Label display='inline-block' my={0} mx={2}>
        Granted a {allowanceGbNr}GiB verified data allowance to:{' '}
        <StyledATag
          display='inline-block'
          target='_blank'
          rel='noopener noreferrer'
          href={`${EXPLORER}/actor/?address=${address}`}
        >
          {truncateAddress(address)}
        </StyledATag>
      </Label>{' '}
      <StyledATag
        display='inline'
        rel='noopener noreferrer'
        target='_blank'
        border='none'
        height='min-content'
        href={`${EXPLORER}/message/?cid=${cid}`}
      >
        VIEW
      </StyledATag>
    </>
  )
}

Confirmed.propTypes = {
  address: ADDRESS_PROPTYPE,
  cid: string.isRequired,
  allowance: bigint.isRequired
}
