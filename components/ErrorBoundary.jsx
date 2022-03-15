import React from 'react'
import PropTypes from 'prop-types'
import { ErrorView, OneColumnCentered } from '@glif/react-components'
import { logger } from '../logger'
import VerifierPage from './VerifierPage'

// This component catches all uncaught react and syncronous JS errors
// and forwards the user to an error page + sends us the error report
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    logger.error(
      'ErrorBoundary',
      error instanceof Error ? error.message : JSON.stringify(error),
      errorInfo
    )
  }

  render() {
    if (this.state.hasError) {
      return (
        <VerifierPage>
          <OneColumnCentered>
            <ErrorView
              title='Glif is currently down'
              description="We've been notified of the outage and expect to be back up and running again shortly."
            />
          </OneColumnCentered>
        </VerifierPage>
      )
    }
    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
}

export default ErrorBoundary
