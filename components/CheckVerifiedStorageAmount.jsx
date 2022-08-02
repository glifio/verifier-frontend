import { useState } from 'react'
import axios from 'axios'
import {
  Lines,
  LoadingIcon,
  StandardBox,
  ErrorBox,
  SearchAddress,
  SmartLink,
  truncateAddress
} from '@glif/react-components'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { logger } from '../logger'
import niceBytes from '../utils/niceBytes'

const VERIFIER_URL = process.env.NEXT_PUBLIC_VERIFIER_URL

dayjs.extend(relativeTime)

export default () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState('')
  const [remainingBytes, setRemainingBytes] = useState(null)

  const addressUrl = `https://filfox.info/en/address/${address}`
  const truncated = truncateAddress(address)

  const onSearch = async (address) => {
    setError('')
    setLoading(true)
    setAddress(address)
    setRemainingBytes(null)

    try {
      const url = `${VERIFIER_URL}/account-remaining-bytes/${address}`
      const res = await axios.get(url)
      if (res.status === 200) {
        setRemainingBytes(res.data.remainingBytes)
      } else {
        setError(res.statusText)
        logger.error(
          'Non 200 response when getting account-remaining-bytes',
          res.statusText
        )
      }
    } catch (err) {
      setError(err.response.data.error)
      logger.error(
        'Error getting account-remaining-bytes',
        err.response.data.error,
        err.message
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h2>Enter an address to check its status</h2>
      <Lines>
        <SearchAddress large buttonText='Check' onSearch={onSearch} />
        {error ? (
          <ErrorBox>{error}</ErrorBox>
        ) : loading ? (
          <StandardBox>
            <LoadingIcon />
            <p>Loading...</p>
          </StandardBox>
        ) : (
          remainingBytes !== null && (
            <StandardBox>
              {Number(remainingBytes) === 0 ? (
                <>
                  <SmartLink href={addressUrl}>{truncated}</SmartLink> is not a
                  verified client.
                </>
              ) : (
                <>
                  <SmartLink href={addressUrl}>{truncated}</SmartLink> has{' '}
                  {niceBytes(remainingBytes)} of DataCap left.
                </>
              )}
            </StandardBox>
          )
        )}
      </Lines>
    </>
  )
}
