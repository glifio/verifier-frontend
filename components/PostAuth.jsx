import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { validateAddressString } from '@glif/filecoin-address'

const EXPLORER = process.env.NEXT_PUBLIC_EXPLORER_URL
const VERIFIER_URL = process.env.NEXT_PUBLIC_VERIFIER_URL

import {
  Box,
  Button,
  LoadingIcon,
  Text,
  InfoBox,
  ErrorBox,
  Lines,
  SearchAddress,
  SmartLink,
  StandardBox
} from '@glif/react-components'
import { useJwt } from '../lib/JwtHandler'
import { useMessageConfirmation } from '../lib/ConfirmMessage'
import { getVerification, removeVerificationCid } from '../utils/storage'
import { logger } from '../logger'

const StepHeaderTitle = ({ confirming, confirmed, error }) => {
  if (error) return 'Oops. Please try again.'
  if (confirming) return 'Confirming...'
  if (confirmed) return 'Success'
  if (!confirming && !confirmed) return ''
}

export const PostAuth = () => {
  const [filAddress, setFilAddress] = useState('')
  const [confirming, setConfirming] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [cidToConfirm, setCidToConfirm] = useState('')
  const [allowance, setAllowance] = useState(BigInt(0))
  const [error, setError] = useState('')
  const { jwt, removeJwt } = useJwt()
  const { confirm } = useMessageConfirmation()

  useEffect(() => {
    const confirmMsgFromStorage = async (cid, address) => {
      setConfirming(true)
      try {
        await confirm(cid, address)
        setConfirmed(true)
      } catch (err) {
        setFilAddress('')
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
      setFilAddress(pendingVerification.address)
    }
  }, [confirming, confirm, setConfirming, setError, error])

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

  const onRequest = async (address) => {
    setError('')
    setFilAddress(address)
    const isValid = validateAddressString(address)
    if (isValid) {
      setConfirming(true)
      try {
        const verificationCid = await verify(jwt, address)
        await confirm(verificationCid)
        setConfirmed(true)
      } catch (error) {
        setError(error.message)
        setFilAddress('')
        logger.error('Error verifying client', error.message)
      }
      setConfirming(false)
    } else {
      setError('Invalid Filecoin address.')
      setFilAddress('')
    }
  }

  const reset = () => {
    setError('')
    setFilAddress('')
    removeJwt('')
    removeVerificationCid()
  }

  const back = () => {
    setError('')
    setFilAddress('')
    removeVerificationCid()
    setCidToConfirm('')
    setConfirmed(false)
  }

  const allowanceGbBig = allowance / 1073741824n
  const allowanceGbNr = Number(allowanceGbBig)

  return (
    <>
      <h3>Enter an address to grant a verified data allowance</h3>
      <Lines>
        {!confirming && !confirmed && !error && (
          <SearchAddress large buttonText='Request' onSearch={onRequest} />
        )}
        {(confirmed || error || confirming) && (
          <>
            <Text
              m={0}
              px={3}
              maxWidth={11}
              whiteSpace='nowrap'
              textOverflow='ellipsis'
              overflow='hidden'
            >
              {StepHeaderTitle({ confirmed, confirming, error: error })}
            </Text>
            {confirming && (
              <Box mr={2}>
                <LoadingIcon />
              </Box>
            )}
            {confirmed && (
              <Button
                mx={2}
                variant='secondary'
                title='Return'
                onClick={back}
              />
            )}
            {error && (
              <Button
                mx={2}
                variant='secondary'
                title='Retry'
                onClick={reset}
              />
            )}
          </>
        )}
        {confirming && (
          <StandardBox>
            <LoadingIcon />
            <p>Confirming...</p>
            <p>
              <SmartLink href={`${EXPLORER}/message/?cid=${cidToConfirm}`}>
                View the pending message
              </SmartLink>
            </p>
          </StandardBox>
        )}
        {!confirming && confirmed && (
          <InfoBox>
            <p>
              Granted a {allowanceGbNr}GiB verified data allowance to:{' '}
              <SmartLink href={`${EXPLORER}/actor/?address=${filAddress}`}>
                {truncateAddress(filAddress)}
              </SmartLink>
            </p>
            <p>
              <SmartLink href={`${EXPLORER}/message/?cid=${cidToConfirm}`}>
                View the confirmed message
              </SmartLink>
            </p>
          </InfoBox>
        )}
        {error && <ErrorBox>{error}</ErrorBox>}
      </Lines>
    </>
  )
}
