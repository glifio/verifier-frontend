import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { validateAddressString } from '@glif/filecoin-address'

import {
  LoadingIcon,
  StandardBox,
  InfoBox,
  ErrorBox,
  SearchAddress,
  SmartLink,
  ButtonV2,
  ButtonRowCenter,
  truncateAddress,
  useLogger,
  useEnvironment
} from '@glif/react-components'
import { useJwt } from '../lib/JwtHandler'
import { useMessageConfirmation } from '../lib/ConfirmMessage'
import { getVerification, removeVerificationCid } from '../utils/storage'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export const PostAuth = () => {
  const logger = useLogger()
  const { explorerUrl } = useEnvironment()
  const [error, setError] = useState('')
  const [address, setAddress] = useState('')
  const [messageCid, setMessageCid] = useState('')
  const [makingRequest, setMakingRequest] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [allowance, setAllowance] = useState(BigInt(0))
  const { jwt, removeJwt } = useJwt()
  const { confirm } = useMessageConfirmation()

  const messageUrl = `${explorerUrl}/tx/${messageCid}`
  const addressUrl = `${explorerUrl}/address/${address}`
  const truncated = truncateAddress(address)
  const allowanceGbBig = allowance / 1073741824n
  const allowanceGbNr = Number(allowanceGbBig)

  useEffect(() => {
    const confirmMsgFromStorage = async (cid, address) => {
      setConfirming(true)
      try {
        await confirm(cid, address)
        setConfirmed(true)
      } catch (err) {
        setAddress('')
        setError(err.message)
        logger.error('Error confirming msg from storage', err.message)
      }
      setConfirming(false)
    }
    const pendingVerification = getVerification()
    if (pendingVerification.cid && !confirming && !error) {
      confirmMsgFromStorage(
        pendingVerification.cid,
        pendingVerification.address
      )
      setAddress(pendingVerification.address)
    }
  }, [confirming, confirm, setConfirming, setError, error, logger])

  const verify = async (jwt, filAddress) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/verify/${filAddress}`,
        {},
        {
          headers: { Authorization: `Bearer ${jwt}` }
        }
      )
      if (res.status !== 200) throw new Error(res.data.error)
      setMessageCid(res.data.cid)
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

  const onRequest = async (address) => {
    setError('')
    setAddress(address)
    const isValid = validateAddressString(address)
    if (isValid) {
      setMakingRequest(true)
      try {
        const verificationCid = await verify(jwt, address)
        setMakingRequest(false)
        setConfirming(true)
        await confirm(verificationCid)
        setConfirmed(true)
      } catch (error) {
        setError(error.message)
        setAddress('')
        logger.error('Error verifying client', error.message)
      }
      // setConfirming(false)
    } else {
      setError('Invalid Filecoin address.')
      setAddress('')
    }
  }

  const resetState = () => {
    setError('')
    setAddress('')
    setMessageCid('')
    setConfirming(false)
    setConfirmed(false)
    setAllowance(BigInt(0))
  }

  const onReset = () => {
    resetState()
    removeJwt()
    removeVerificationCid()
  }

  const onReturn = () => {
    resetState()
    removeVerificationCid()
  }

  return error ? (
    <>
      <h3>Oops, something went wrong</h3>
      <ErrorBox>{error}</ErrorBox>
      <ButtonRowCenter>
        <ButtonV2 large onClick={onReset}>
          Retry
        </ButtonV2>
      </ButtonRowCenter>
    </>
  ) : makingRequest ? (
    <>
      <h3>Sending request...</h3>
      <StandardBox>
        <LoadingIcon />
      </StandardBox>
    </>
  ) : confirming ? (
    <>
      <h3>Confirming...</h3>
      <StandardBox>
        <LoadingIcon />
        <p>
          <SmartLink href={messageUrl}>View the pending message</SmartLink>
        </p>
      </StandardBox>
    </>
  ) : confirmed ? (
    <>
      <h3>Success</h3>
      <InfoBox>
        <p>
          Granted a {allowanceGbNr}GiB verified data allowance to:{' '}
          <SmartLink href={addressUrl}>{truncated}</SmartLink>
        </p>
        <p>
          <SmartLink href={messageUrl}>View the confirmed message</SmartLink>
        </p>
      </InfoBox>
      <ButtonRowCenter>
        <ButtonV2 large onClick={onReturn}>
          Return
        </ButtonV2>
      </ButtonRowCenter>
    </>
  ) : (
    <>
      <h3>Enter an address to grant a verified data allowance</h3>
      <SearchAddress large buttonText='Request' onSearch={onRequest} />
    </>
  )
}
