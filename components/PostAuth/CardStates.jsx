import React from 'react'
import { string } from 'prop-types'
import { Text, Label, StyledATag } from '../Shared'
import { ADDRESS_PROPTYPE } from '../../customPropTypes'

export const Confirming = ({ err }) => {
  return (
    <>
      {err && (
        <Label color='status.fail.background' m={0}>
          {err}
        </Label>
      )}
    </>
  )
}

Confirming.propTypes = {
  err: string
}

Confirming.defaultProps = {
  err: ''
}

export const Confirmed = ({ address, cid }) => {
  return (
    <>
      <Text display='inline' m={0}>
        All set! {address} has an 8GB verified Filecoin allowance.
      </Text>
      <StyledATag
        display='inline'
        rel='noopener noreferrer'
        target='_blank'
        href={`https://filscan.io/#/message/detail?cid=${cid}`}
      >
        <Label display='inline' mx={2} color='core.primary'>
          VIEW
        </Label>
      </StyledATag>
    </>
  )
}

Confirmed.propTypes = {
  address: ADDRESS_PROPTYPE,
  cid: string.isRequired
}
