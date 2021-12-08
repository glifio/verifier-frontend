import React, { useState } from 'react'
import axios from 'axios'
import {
  Box,
  Text,
  Input,
  InputLabelBase,
  StyledATag,
  P,
  fontSize,
  ButtonV2
} from '@glif/react-components'
import styled from 'styled-components'
import { validateAddressString } from '@glif/filecoin-address'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import reportError from '../utils/reportError'
import truncateAddr from '../utils/truncateAddress'
import niceBytes from '../utils/niceBytes'

const VERIFIER_URL = process.env.NEXT_PUBLIC_VERIFIER_URL

dayjs.extend(relativeTime)

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1;
  width: 100%;
`

export default function CheckVerifiedStorageAmount() {
  const [filAddress, setFilAddress] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const [remainingBytes, setRemainingBytes] = useState('')
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
          reportError(
            'components/CheckVerifiedStorageAmount.jsx:1',
            false,
            res.statusText
          )
        } else {
          setRemainingBytes(res.data.remainingBytes)
        }
      } catch (err) {
        setErr(err.response.data.error)
        reportError(
          'components/CheckVerifiedStorageAmount.jsx:2',
          false,
          err.response.data.error,
          err.message,
          err.stack
        )
      }
    } else {
      setErr('Invalid Filecoin address.')
    }
    setLoading(false)
  }

  return (
    <Box
      display='flex'
      flexDirection='column'
      p={3}
      mt={5}
      minHeight={10}
      width='100%'
      maxWidth={13}
      alignItems='center'
      justifyContent='center'
    >
      <Form onSubmit={onSubmit}>
        <InputLabelBase
          style={{ margin: '0', fontSize: fontSize() }}
          htmlFor='check-fil-address'
        >
          Enter an address to check its status
        </InputLabelBase>
        <Box mt={2} display='flex' flexDirection='row' width='100%'>
          <Input.Text
            id='check-fil-address'
            width='100%'
            mr={2}
            overflow='scroll'
            placeholder='f1gLiF...'
            value={filAddress}
            onChange={(e) => {
              setRemainingBytes(null)
              setErr('')
              setFilAddress(e.target.value)
            }}
          />
          <ButtonV2 disabled={!filAddress} small type='submit'>
            Check
          </ButtonV2>
        </Box>
        <Box pt={0} minHeight={4} mt={3}>
          {remainingBytes &&
            !err &&
            !loading &&
            (Number(remainingBytes) === 0 ? (
              <Text color='core.black'>
                <StyledATag
                  display='inline-block'
                  href={`https://filfox.info/en/address/${filAddress}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {truncateAddr(filAddress)}
                </StyledATag>{' '}
                is not a verified client.
              </Text>
            ) : (
              <Text color='core.black'>
                <StyledATag
                  display='inline-block'
                  href={`https://filfox.info/en/address/${filAddress}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {truncateAddr(filAddress)}
                </StyledATag>{' '}
                has {niceBytes(remainingBytes)} of DataCap left.
              </Text>
            ))}
          {loading && !err && (
            <P
              color='black'
              mb={0}
              style={{ fontSize: fontSize(), 'overflow-wrap': 'break-word' }}
            >
              Loading...
            </P>
          )}
          {err && (
            <P
              color='status.fail.background'
              mb={0}
              style={{ fontSize: fontSize(), 'overflow-wrap': 'break-word' }}
            >
              {err}
            </P>
          )}
        </Box>
      </Form>
    </Box>
  )
}
