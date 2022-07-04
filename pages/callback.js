import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import CallbackRedirect from '../components/CallbackRedirect'

const VERIFIER_URL = process.env.NEXT_PUBLIC_VERIFIER_URL

export default function Callback() {
  const router = useRouter()
  const [gettingJwt, setGettingJwt] = useState(false)
  const [jwt, setJwt] = useState('')

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
      } finally {
        setGettingJwt(false)
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

  return <> {gettingJwt && <CallbackRedirect jwt={jwt} />}</>
}
