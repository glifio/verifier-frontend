import React, { useState } from 'react'
import axios from 'axios'
import {
  Box,
  Button,
  Card,
  Text,
  Input,
  InputLabelBase,
  ErrorBox,
  StyledATag
} from '@glif/react-components'
import styled from 'styled-components'
import { validateAddressString } from '@glif/filecoin-address'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { logger } from '../logger'
import truncateAddr from '../utils/truncateAddress'
import niceBytes from '../utils/niceBytes'

const VERIFIER_URL = process.env.NEXT_PUBLIC_VERIFIER_URL

dayjs.extend(relativeTime)

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
`

export default () => {
  const [filAddress, setFilAddress] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const [remainingBytes, setRemainingBytes] = useState(null)
  // eslint-disable-next-line
  const [mostRecentAllocation, setMostRecentAllocation] = useState('')
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
          setMostRecentAllocation(res.data.mostRecentAllocation)
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
      <Text color='core.darkgray'>Enter an address to check its status</Text>
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
      >
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
              <InputLabelBase display='none' htmlFor='check-fil-address' />
              <Input.Base
                id='check-fil-address'
                width='100%'
                flexShrink='1'
                pr={8}
                pl={3}
                height='100%'
                overflow='scroll'
                placeholder='f1OwL...'
                value={filAddress}
                onChange={(e) => {
                  setMostRecentAllocation('')
                  setRemainingBytes(null)
                  setErr('')
                  setFilAddress(e.target.value)
                }}
              />
              <Button
                position='absolute'
                right='0'
                type='submit'
                title='Check'
                variant='secondary'
                mx={2}
                px={4}
                disabled={!filAddress}
                bg='transparent'
              />
            </Box>
          </Form>
        </Box>
      </Card>
      <Box pt={0} mx={3} minHeight={4} mt={3}>
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
        {loading && !err && <Text color='core.black'>Loading...</Text>}
      </Box>
      {err && <ErrorBox>{err}</ErrorBox>}
    </>
  )
}
