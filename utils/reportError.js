import axios from 'axios'

const IS_PROD = process.env.NEXT_PUBLIC_IS_PROD

// This simply formats error messages and sends them to our slack channel
export default async (id, shouldSendToErrorPage, ...args) => {
  let errorText = args.reduce(
    (err, ele) => {
      return `${err}\n${ele}`
    },
    [`VERIFIER:${id}\n`]
  )
  errorText += '------------'
  if (IS_PROD) {
    await axios.post(
      'https://errors.glif.io',
      JSON.stringify({ text: errorText })
    )
  }
  if (shouldSendToErrorPage) Router.push('/error/wallet-down')
}
