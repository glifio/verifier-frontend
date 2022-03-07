import React from 'react'
import { ErrorView, OneColumnCentered } from '@glif/react-components'
import VerifierPage from '../components/VerifierPage'

const Error = () => (
  <VerifierPage>
    <OneColumnCentered>
      <ErrorView
        title='Oops, something went wrong.'
        description="We've been notified of the issue."
        linkDisplay='Follow @glifio for updates.'
        linkhref='https://twitter.com/glifio'
      />
    </OneColumnCentered>
  </VerifierPage>
)

export default Error
