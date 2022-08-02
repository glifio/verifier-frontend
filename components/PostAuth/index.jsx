import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { validateAddressString } from '@glif/filecoin-address'

const VERIFIER_URL = process.env.NEXT_PUBLIC_VERIFIER_URL

import {
  Box,
  Button,
  LoadingIcon,
  Text,
  Label,
  SearchAddress
} from '@glif/react-components'
import { Confirming, Confirmed } from './CardStates'
import { useJwt } from '../../lib/JwtHandler'
import { useMessageConfirmation } from '../../lib/ConfirmMessage'
import { getVerification, removeVerificationCid } from '../../utils/storage'
import { logger } from '../../logger'

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
`

const StepHeaderTitle = ({ confirming, confirmed, error }) => {
  if (error) return 'Oops. Please try again.'
  if (confirming) return 'Confirming...'
  if (confirmed) return 'Success'
  if (!confirming && !confirmed) return ''
}

export default function PostAuth() {
  const [filAddress, setFilAddress] = useState('')
  const [confirming, setConfirming] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [cidToConfirm, setCidToConfirm] = useState('')
  const [allowance, setAllowance] = useState(BigInt(0))
  const [err, setErr] = useState('')
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
        setErr(err.message)
        logger.error('Error confirming msg from storage', err.message)
      }
      setConfirming(false)
    }
    const pendingVerification = getVerification()
    if (pendingVerification.cid && !confirming && !err) {
      confirmMsgFromStorage(
        pendingVerification.cid,
        pendingVerification.address
      )
      setFilAddress(pendingVerification.address)
    }
  }, [confirming, confirm, setConfirming, setErr, err])

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
    setErr('')
    setFilAddress(address)
    const isValid = validateAddressString(address)
    if (isValid) {
      setConfirming(true)
      try {
        const verificationCid = await verify(jwt, address)
        await confirm(verificationCid)
        setConfirmed(true)
      } catch (error) {
        setErr(error.message)
        setFilAddress('')
        logger.error('Error verifying client', err.message)
      }
      setConfirming(false)
    } else {
      setErr('Invalid Filecoin address.')
      setFilAddress('')
    }
  }

  const reset = () => {
    setErr('')
    setFilAddress('')
    removeJwt('')
    removeVerificationCid()
  }

  const back = () => {
    setErr('')
    setFilAddress('')
    removeVerificationCid()
    setCidToConfirm('')
    setConfirmed(false)
  }

  return (
    <>
      <h3>Enter an address to grant a verified data allowance</h3>
      {!confirming && !confirmed && !err && (
        <SearchAddress large buttonText='Request' onSearch={onRequest} />
      )}
        {(confirmed || err || confirming) && (
          <>
            <Text
              m={0}
              px={3}
              maxWidth={11}
              whiteSpace='nowrap'
              textOverflow='ellipsis'
              overflow='hidden'
            >
              {StepHeaderTitle({ confirmed, confirming, error: err })}
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
            {err && (
              <Button
                mx={2}
                variant='secondary'
                title='Retry'
                onClick={reset}
              />
            )}
          </>
        )}
      <Box pt={0} mx={0} textAlign='center' minHeight={6} mt={3}>
        {confirming && <Confirming cid={cidToConfirm} err={err} />}
        {!confirming && confirmed && (
          <Confirmed
            address={filAddress}
            cid={cidToConfirm}
            allowance={allowance}
          />
        )}
        <Label color='status.fail.background' m={0}>
          {err}
        </Label>
      </Box>
    </>
  )
}
