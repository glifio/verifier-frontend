import React from 'react'

import ErrorView from '../components/ErrorView'

const Error = () => (
  <ErrorView
    title='Oops, something went wrong.'
    description="We've been notified of the issue."
    linkDisplay='Follow @glifio for updates.'
    linkhref='https://twitter.com/glifio'
  />
)

export default Error
