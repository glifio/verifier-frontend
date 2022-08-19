import React, { useState } from 'react'
import axios from 'axios'
import {
  InputV2,
  ShadowBox,
  ButtonV2,
  ButtonRowCenter,
  AddressLink
} from '@glif/react-components'
import styled from 'styled-components'
import { validateAddressString } from '@glif/filecoin-address'

import { logger } from '../logger'
import niceBytes from '../utils/niceBytes'
import { ResponseWrap } from './Helpers'

const VERIFIER_URL = process.env.NEXT_PUBLIC_VERIFIER_URL

const P = styled.p`
  padding-bottom: 0;
  margin-bottom: 0;
  color: ${({ color }) => color};
`

function CheckVerifiedStorage() {
  const [filAddress, setFilAddress] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const [remainingBytes, setRemainingBytes] = useState(null)
  const onSubmit = async (e) => {
    e.preventDefault()
    const isValid = validateAddressString(filAddress)
    if (isValid) {
      setLoading(true)
      try {
        const res = await axios.get(
          `${VERIFIER_URL}/account-remaining-bytes/${filAddress}`
        )
        if (res.status !== 200) {
          setErr(res.statusText)
          logger.error(
            'Non 200 response when getting account-remaining-bytes',
            res.statusText
          )
        } else {
          setRemainingBytes(res.data.remainingBytes)
        }
      } catch (err) {
        setErr(err.response.data.error)
        logger.error(
          'Error getting account-remaining-bytes',
          err.response.data.error,
          err.message
        )
      }
    } else {
      setErr('Invalid Filecoin address.')
    }
    setLoading(false)
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <h2>Check DataCap Allowance</h2>
        <ShadowBox>
          <InputV2.Address
            label='Address'
            value={filAddress}
            setIsValid={setIsValid}
            onChange={(addr) => {
              setRemainingBytes(null)
              setErr('')
              setFilAddress(addr)
            }}
            truncateAddr
          />
          {remainingBytes &&
            !err &&
            !loading &&
            (Number(remainingBytes) === 0 ? (
              <ResponseWrap>
                <AddressLink address={filAddress} truncate hideCopy />
                <p>is not a verified client.</p>
              </ResponseWrap>
            ) : (
              <ResponseWrap>
                <AddressLink address={filAddress} truncate hideCopy />
                <p>has {niceBytes(remainingBytes)} of DataCap left.</p>
              </ResponseWrap>
            ))}
          {loading && <P>Loading...</P>}
          {!loading && err && <P color='var(--red-medium)'>{err}</P>}
        </ShadowBox>

        <ButtonRowCenter>
          <ButtonV2 type='submit' disabled={!isValid}>
            Check
          </ButtonV2>
        </ButtonRowCenter>
      </form>
    </>
  )
}

export default CheckVerifiedStorage
