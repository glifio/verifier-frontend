import React, { createContext, useContext, useCallback } from 'react'
import { node } from 'prop-types'
import confirmMessage from '@glif/filecoin-message-confirmer'

import { setVerification, removeVerificationCid } from '../utils/storage'

const LOTUS_NODE_JSONRPC = process.env.NEXT_PUBLIC_LOTUS_NODE_JSONRPC

const ConfirmMessageContext = createContext({})

export const MessageConfirmerProvider = ({ children }) => {
  const confirm = useCallback(async (msgCid, filecoinAddress) => {
    setVerification(msgCid, filecoinAddress)
    const confirmed = await confirmMessage(msgCid, {
      apiAddress: LOTUS_NODE_JSONRPC
    })

    removeVerificationCid()
    if (confirmed) {
      return true
    } else {
      throw new Error('Transaction failed.')
    }
  }, [])

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
