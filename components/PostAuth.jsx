import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import {
  ShadowBox,
  InputV2,
  ButtonRowCenter,
  ButtonV2,
  LoadingIcon,
  AddressLink,
  IconCheck
} from '@glif/react-components'
import { useJwt } from '../lib/JwtHandler'
import { useMessageConfirmation } from '../lib/ConfirmMessage'
import { getVerification, removeVerificationCid } from '../utils/storage'
import { logger } from '../logger'
import { ResponseWrap } from './Helpers'

const VERIFIER_URL = process.env.NEXT_PUBLIC_VERIFIER_URL
const EXPLORER_URL = process.env.NEXT_PUBLIC_EXPLORER_URL

const P = styled.p`
  padding-bottom: 0;
  margin-bottom: 0;
  color: ${({ color }) => color};
`

const Header = styled.h2`
  margin-top: 0;
`

const Loading = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: var(--space-m);
  margin-top: var(--space-m);
`

const RequestState = {
  FILLING_FORM: 0,
  MAKING_REQUEST: 1,
  CONFIRMING_REQUEST: 2,
  CONFIRMED_REQUEST: 3,
  ERROR: 4
}

export default function PostAuth() {
  const [filAddress, setFilAddress] = useState('t080')
  const [requestState, setRequestState] = useState(
    RequestState.CONFIRMED_REQUEST
  )
  const [isValid, setIsValid] = useState(false)
  const [cidToConfirm, setCidToConfirm] = useState('')
  const [allowance, setAllowance] = useState(BigInt(0))
  const [err, setErr] = useState('')
  const { jwt, removeJwt } = useJwt()
  const { confirm } = useMessageConfirmation()

  useEffect(() => {
    const confirmMsgFromStorage = async (cid, address) => {
      setRequestState(RequestState.CONFIRMING_REQUEST)
      try {
        await confirm(cid, address)
        setRequestState(RequestState.CONFIRMED_REQUEST)
      } catch (err) {
        setFilAddress('')
        setErr(err.message)
        setRequestState(RequestState.ERROR)
        logger.error('Error confirming msg from storage', err.message)
      }
    }
    const pendingVerification = getVerification()
    if (
      pendingVerification.cid &&
      requestState < RequestState.CONFIRMING_REQUEST &&
      !err
    ) {
      confirmMsgFromStorage(
        pendingVerification.cid,
        pendingVerification.address
      )
      setFilAddress(pendingVerification.address)
    }
  }, [confirm, requestState, setRequestState, setErr, err])

  const verify = async (jwt, filAddress) => {
    try {
      const res = await axios.post(
        `${VERIFIER_URL}/verify/${filAddress}`,
        {},
        {
          headers: { Authorization: `Bearer ${jwt}` }
        }
      )
      if (res.status !== 200) throw new Error(res.data.error)
      setCidToConfirm(res.data.cid)
      setAllowance(BigInt(res.data.allowance))
      return res.data.cid
    } catch (err) {
      logger.error(
        'Error verifying client',
        err.response.data.error,
        err.message
      )
      // throw a more readable error response from axios
      throw new Error(err.response.data.error)
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setErr('')
    if (isValid) {
      setRequestState(RequestState.CONFIRMING_REQUEST)
      try {
        setRequestState(RequestState.MAKING_REQUEST)
        const verificationCid = await verify(jwt, filAddress)
        await confirm(verificationCid)
        setRequestState(RequestState.CONFIRMED_REQUEST)
      } catch (error) {
        setErr(error.message)
        setFilAddress('')
        setRequestState(RequestState.ERROR)
        logger.error('Error verifying client', err.message)
      }
    }
  }

  const reset = () => {
    setErr('')
    setFilAddress('')
    removeJwt('')
    removeVerificationCid()
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <Header>Request DataCap Allowance</Header>
        <ShadowBox>
          <InputV2.Address
            truncate
            disabled={requestState === RequestState.CONFIRMING_REQUEST}
            label='Address'
            setIsValid={setIsValid}
            value={filAddress}
            onChange={(address) => {
              setErr('')
              setFilAddress(address)
            }}
          />
          {requestState > RequestState.FILLING_FORM &&
            requestState < RequestState.CONFIRMED_REQUEST && (
              <Loading>
                <LoadingIcon size='2em' />
                {requestState === RequestState.MAKING_REQUEST && (
                  <p>Making request...</p>
                )}
                {requestState === RequestState.CONFIRMING_REQUEST && (
                  <a href={`${EXPLORER_URL}/?cid=${cidToConfirm}`}>
                    View your pending request.
                  </a>
                )}
              </Loading>
            )}
          {requestState === RequestState.CONFIRMED_REQUEST && (
            <ResponseWrap>
              <IconCheck />
              <p>
                Granted a {Number(allowance / 1073741824n)}GiB DataCap allowance
                to
              </p>
              <AddressLink address={filAddress} truncate hideCopy />
            </ResponseWrap>
          )}
          {err && <P color='var(--red-medium)'>{err}</P>}
        </ShadowBox>
        <ButtonRowCenter>
          {err ? (
            <ButtonV2 type='button' red onClick={reset}>
              Start over
            </ButtonV2>
          ) : (
            <ButtonV2
              disabled={!isValid || requestState > RequestState.FILLING_FORM}
              green
              type='submit'
            >
              Request
            </ButtonV2>
          )}
        </ButtonRowCenter>
      </form>
    </>
  )
}
