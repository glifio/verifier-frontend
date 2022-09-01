import { useState } from 'react'
import axios from 'axios'
import {
  Lines,
  LoadingIcon,
  StandardBox,
  ErrorBox,
  SearchAddress,
  SmartLink,
  truncateAddress,
  useLogger,
  useEnvironment
} from '@glif/react-components'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import niceBytes from '../utils/niceBytes'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

dayjs.extend(relativeTime)

export const CheckAddress = () => {
  const logger = useLogger()
  const { explorerUrl } = useEnvironment()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState('')
  const [remainingBytes, setRemainingBytes] = useState(null)

  const addressUrl = `${explorerUrl}/actor/?address=${address}`
  const truncated = truncateAddress(address)

  const onCheck = async (address) => {
    setError('')
    setLoading(true)
    setAddress(address)
    setRemainingBytes(null)

    try {
      const url = `${BACKEND_URL}/account-remaining-bytes/${address}`
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
      <h3>Enter an address to check its status</h3>
      <Lines>
        <SearchAddress large buttonText='Check' onSearch={onCheck} />
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
