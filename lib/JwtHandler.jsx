import React, { useState, createContext, useContext, useEffect } from 'react'
import { node } from 'prop-types'

const NETWORK_IDENTIFIER = process.env.NEXT_PUBLIC_NETWORK_IDENTIFIER

const JwtContext = createContext({})

export const JwtProvider = ({ children }) => {
  const [jwt, setJwt] = useState('')

  useEffect(() => {
    if (!!window && typeof window !== 'undefined') {
      const jwt = window.localStorage.getItem(
        `verifier-jwt:${NETWORK_IDENTIFIER}`
      )
      if (jwt) setJwt(jwt)
    }
  }, [setJwt])

  const storeJwt = (jwt) => {
    setJwt(jwt)
    window.localStorage.setItem(`verifier-jwt:${NETWORK_IDENTIFIER}`, jwt)
  }

  const removeJwt = () => {
    setJwt('')
    window.localStorage.removeItem(`verifier-jwt:${NETWORK_IDENTIFIER}`)
  }

  return (
    <JwtContext.Provider value={{ jwt, removeJwt, storeJwt }}>
      {children}
    </JwtContext.Provider>
  )
}

JwtProvider.propTypes = {
  children: node
}

JwtProvider.defaultProps = {
  children: <></>
}

export const useJwt = () => {
  return useContext(JwtContext)
}
