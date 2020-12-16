import React from 'react'
import { string } from 'prop-types'
import { AddressLink, Label, StyledATag } from '@glif/react-components'
import { ADDRESS_PROPTYPE } from '../../customPropTypes'

export const Confirming = ({ err, cid }) => {
  return (
    <>
      {' '}
      <StyledATag
        display='inline'
        rel='noopener noreferrer'
        target='_blank'
        border='none'
        height='min-content'
        href={`https://filfox.info/en/message/${cid}`}
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

export const Confirmed = ({ address, cid }) => {
  return (
    <>
      <Label display='inline-block' my={0} mx={2}>
        Granted an 8GB verified data allowance to:{' '}
        <StyledATag
          display='inline-block'
          target='_blank'
          rel='noopener noreferrer'
          href={`https://filfox.info/en/address/${address}`}
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
        href={`https://filfox.info/en/message/${cid}`}
      >
        VIEW
      </StyledATag>
    </>
  )
}

Confirmed.propTypes = {
  address: ADDRESS_PROPTYPE,
  cid: string.isRequired
}
