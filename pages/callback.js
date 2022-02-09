import { Component } from 'react'
import axios from 'axios'
import Router from 'next/router'
import CallbackRedirect from '../components/CallbackRedirect'
import { logger } from '../logger'

const VERIFIER_URL = process.env.NEXT_PUBLIC_VERIFIER_URL

const getJWT = async (code, state) => {
  const res = await axios.post(`${VERIFIER_URL}/oauth/github`, {
    code,
    state
  })
  if (res.status !== 200) throw new Error(res.statusText)
  return res.data.jwt
}

export default class Callback extends Component {
  static async getInitialProps({ query, res }) {
    try {
      const jwt = await getJWT(query.code, query.state)
      return { jwt, err: null }
    } catch (err) {
      if (typeof window === 'undefined') {
        logger.error('Server side error getting jwt', err.message)
        res.writeHead(307, { Location: '/error' })
        res.end()
      } else {
        logger.error('client side error getting jwt', err.message)
        Router.push('/error')
      }
      return { jwt: '', err }
    }
  }

  render() {
    return <CallbackRedirect jwt={this.props.jwt} />
  }
}
