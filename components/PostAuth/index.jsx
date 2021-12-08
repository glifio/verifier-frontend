import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { validateAddressString } from '@glif/filecoin-address'

const VERIFIER_URL = process.env.NEXT_PUBLIC_VERIFIER_URL

import {
  Box,
  Button,
  Loading,
  Text,
  Input,
  InputLabelBase,
  Label,
  Card
} from '@glif/react-components'
import { Confirming, Confirmed } from './CardStates'
import { useJwt } from '../../lib/JwtHandler'
import { useMessageConfirmation } from '../../lib/ConfirmMessage'
import { getVerification, removeVerificationCid } from '../../utils/storage'
import reportError from '../../utils/reportError'

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

export default () => {
  const [filAddress, setFilAddress] = useState('')
  const [confirming, setConfirming] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [cidToConfirm, setCidToConfirm] = useState('')
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
        reportError(
          'components/PostAuth/index.jsx:3',
          false,
          err.message,
          err.stack
        )
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
  }, [confirming, confirm, setConfirming, setErr])

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
      return res.data.cid
    } catch (err) {
      reportError(
        'components/PostAuth/index.jsx:1',
        false,
        err.response.data.error,
        err.message,
        err.stack
      )
      // throw a more readable error response from axios
      throw new Error(err.response.data.error)
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setErr('')
    const isValid = validateAddressString(filAddress)
    if (isValid) {
      setConfirming(true)
      try {
        const verificationCid = await verify(jwt, filAddress)
        await confirm(verificationCid)
        setConfirmed(true)
      } catch (error) {
        setErr(error.message)
        setFilAddress('')
        reportError(
          'components/PostAuth/index.jsx:2',
          false,
          err.message,
          err.stack
        )
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
      <Box
        display='flex'
        width='100%'
        justifyContent='space-between'
        flexWrap='wrap'
        mb={3}
      >
        <Text color='core.darkgray' textAlign='left' p='0' m={0}>
          Enter an address to grant an 32GiB verified data allowance
        </Text>
      </Box>
      <Card
        p={0}
        border={0}
        width='100%'
        maxWidth={13}
        height={7}
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        boxShadow={2}
        bg={
          err
            ? 'status.fail.background'
            : confirmed
            ? 'status.success.background'
            : 'input.background.base'
        }
      >
        {!confirming && !confirmed && !err && (
          <Box
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            flexWrap='wrap'
            height='100%'
          >
            <Form onSubmit={onSubmit}>
              <Box
                position='relative'
                display='flex'
                flexGrow='1'
                flexWrap='wrap'
                alignItems='center'
                height='100%'
              >
                <InputLabelBase display='none' htmlFor='fil-address' />
                <Input.Base
                  id='fil-address'
                  width='100%'
                  pr={8}
                  overflow='scroll'
                  placeholder='f1OwL...'
                  value={filAddress}
                  pl={3}
                  height='100%'
                  flexShrink='1'
                  onChange={(e) => {
                    setErr('')
                    setFilAddress(e.target.value)
                  }}
                />
                <Button
                  position='absolute'
                  right='0'
                  mx={2}
                  px={4}
                  type='submit'
                  title='Request'
                  disabled={!filAddress}
                />
              </Box>
            </Form>
          </Box>
        )}
        {(confirmed || err || confirming) && (
          <Box
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
            flexWrap='wrap'
            height='100%'
          >
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
                <Loading />
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
          </Box>
        )}
      </Card>
      <Box pt={0} mx={0} textAlign='center' minHeight={6} mt={3}>
        {confirming && <Confirming cid={cidToConfirm} err={err} />}
        {!confirming && confirmed && (
          <Confirmed address={filAddress} cid={cidToConfirm} />
        )}
        <Label color='status.fail.background' m={0}>
          {err}
        </Label>
      </Box>
    </>
  )
}
