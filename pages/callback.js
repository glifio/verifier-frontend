import { useEffect, useState } from 'react'
import axios from 'axios'
import { ErrorBox, LoadingScreen, OneColumn } from '@glif/react-components'
import { useRouter } from 'next/router'
import CallbackRedirect from '../components/CallbackRedirect'
import { logger } from '../logger'

const VERIFIER_URL = process.env.NEXT_PUBLIC_VERIFIER_URL

export default function Callback() {
  const router = useRouter()
  const [gettingJwt, setGettingJwt] = useState(false)
  const [jwt, setJwt] = useState('')
  const [jwtErr, setJwtErr] = useState('')

  useEffect(() => {
    const getJWT = async () => {
      const res = await axios.post(`${VERIFIER_URL}/oauth/github`, {
        code: router.query.code,
        state: router.query.state
      })
      if (res.status !== 200) throw new Error(res.statusText)
      setJwt(res.data.jwt)
    }

    if (!gettingJwt && !jwt && !!router.query.code && !!router.query.state) {
      setGettingJwt(true)
      try {
        getJWT()
      } catch (err) {
        setJwtErr(err?.message || JSON.stringify(err))
        logger.error(err?.message || JSON.stringify(err))
      }
    }
  }, [
    gettingJwt,
    setGettingJwt,
    setJwt,
    jwt,
    router.query.code,
    router.query.state
  ])

  return (
    <>
      {jwtErr && (
        <OneColumn>
          <ErrorBox>There was an error authenticating with GitHub.</ErrorBox>
        </OneColumn>
      )}
      {gettingJwt && !jwt && !jwtErr && <LoadingScreen height='100vh' />}
      {jwt && !jwtErr && <CallbackRedirect jwt={jwt} />}
    </>
  )
}
