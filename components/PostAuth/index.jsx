import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { validateAddressString } from '@openworklabs/filecoin-address'

import {
  Box,
  Button,
  StepHeader,
  Text,
  Input,
  InputLabelBase,
  Label,
  Card
} from '../Shared'
import { Confirming, Confirmed } from './CardStates'
import { useJwt } from '../../lib/JwtHandler'
import { useMessageConfirmation } from '../../lib/ConfirmMessage'
import { getVerification } from '../../utils/storage'

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const StepHeaderTitle = ({ confirming, confirmed, error }) => {
  if (error) return 'Error'
  if (confirming) return 'Confirming...'
  if (confirmed) return 'Verified'
  if (!confirming && !confirmed) return ''
}

export default () => {
  const [filAddress, setFilAddress] = useState('')
  const [confirming, setConfirming] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [cidToConfirm, setCidToConfirm] = useState('')
  const [err, setErr] = useState('')
  const { jwt } = useJwt()
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
      }
      setConfirming(false)
    }
    const pendingVerification = getVerification()
    if (pendingVerification.cid && !confirming) {
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
        `${process.env.VERIFIER_URL}/verify`,
        {
          targetAddr: filAddress
        },
        {
          headers: { Authorization: `Bearer ${jwt}` }
        }
      )
      if (res.status !== 200) throw new Error(res.data.error)
      setCidToConfirm(res.data.cid)
      return res.data.cid
    } catch (err) {
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
      }
      setConfirming(false)
    } else {
      setErr('Invalid Filecoin address.')
      setFilAddress('')
    }
  }

  return (
    <Box display='flex' flexDirection='column' width='700px' minWidth='700px'>
      <Text color='core.darkgray' textAlign='center' m='0' p='0'>
        {!confirmed &&
          !confirming &&
          !err &&
          'Enter an address to grant an 8GB verified data allowance'}
        {confirming && '.  .  .'}
        {confirmed && 'Niceee, transaction success!'}
        {err && 'Uh oh'}
      </Text>
      <Card
        p={3}
        m={3}
        mt={1}
        border={0}
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        width='100%'
        bg='background.screen'
        boxShadow={2}
      >
        <Box display='flex' flexDirection='row' justifyContent='space-between'>
          <StepHeader
            showStepper={false}
            glyphAcronym='Vr'
            loading={confirming}
            title=''
            width='auto'
            mr={2}
            my={2}
            title={StepHeaderTitle({ confirmed, confirming, error: err })}
          />
          {!confirming && !confirmed && !err && (
            <Form onSubmit={onSubmit}>
              <Input.Base
                height={7}
                width={12}
                placeholder='f1OwL...'
                value={filAddress}
                onChange={(e) => {
                  setErr('')
                  setFilAddress(e.target.value)
                }}
                borderRadius={2}
              />
              <Button type='submit' title='Verify' ml={3} />
            </Form>
          )}
        </Box>
      </Card>
      <Box p={3} pt={0} mx={3}>
        {confirming && <Confirming cid={cidToConfirm} err={err} />}
        {!confirming && confirmed && (
          <Confirmed address={filAddress} cid={cidToConfirm} />
        )}
        {err && (
          <Label color='status.fail.background' mt={3} mb={0}>
            {err}
          </Label>
        )}
      </Box>
    </Box>
  )
}
