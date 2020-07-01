import React, {
  createContext,
  useContext,
  useRef,
  useCallback,
  useEffect
} from 'react'
import { node } from 'prop-types'
import LotusRpcEngine from '@openworklabs/lotus-jsonrpc-engine'

const ConfirmMessageContext = createContext({})

const getVerificationCid = () => {
  return localStorage.getItem('verification-cid')
}

const setVerificationCid = (msgCid) => {
  if (!getVerificationCid()) localStorage.setItem('verification-cid', msgCid)
}

export const MessageConfirmerProvider = ({ children }) => {
  const timeout = useRef()
  const confirm = useCallback((msgCid, pollInterval = 3000) => {
    setVerificationCid(msgCid)
    return new Promise((resolve, reject) => {
      if (timeout.current) {
        clearTimeout(timeout.current)
      }

      timeout.current = setTimeout(async () => {
        try {
          const lotus = new LotusRpcEngine({
            apiAddress: process.env.LOTUS_NODE_JSONRPC
          })
          const res = await lotus.request('StateSearchMsg', {
            '/': msgCid
          })

          if (res && res.Receipt.ExitCode === 0) {
            return resolve(true)
          } else if (res && res.Receipt.ExitCode !== 0) {
            return reject(new Error('Transaction failed'))
          } else {
            return resolve(confirm(msgCid))
          }
        } catch (err) {
          if (err.message.includes('504')) return resolve(confirm(msgCid))
          return reject(err)
        }
      }, pollInterval)
    })
  })

  useEffect(() => {
    const pendingVerificationCid = getVerificationCid()
    if (pendingVerificationCid) confirm(pendingVerificationCid)
  }, [confirm])

  return (
    <ConfirmMessageContext.Provider
      value={{
        confirm
      }}
    >
      {children}
    </ConfirmMessageContext.Provider>
  )
}

MessageConfirmerProvider.propTypes = {
  children: node
}

MessageConfirmerProvider.defaultProps = {
  children: <></>
}

export const useMessageConfirmation = () => {
  return useContext(ConfirmMessageContext)
}
