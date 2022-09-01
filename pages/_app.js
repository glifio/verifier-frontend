import '@glif/base-css'
import App from 'next/app'
import Head from 'next/head'
import {
  EnvironmentProvider,
  theme,
  ThemeProvider,
  ErrorBoundary
} from '@glif/react-components'
import { JwtProvider } from '../lib/JwtHandler'
import { MessageConfirmerProvider } from '../lib/ConfirmMessage'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Head>
          <title>GLIF Verify</title>
          <meta
            name='description'
            content='A Filecoin verifier, made by Open Work Labs.'
          />
          <meta
            name='keywords'
            content='Filecoin,Data,Web,Storage,Blockchain'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/favicon-32x32.png'
          />
        </Head>
        <EnvironmentProvider
          homeUrl={process.env.NEXT_PUBLIC_HOME_URL}
          blogUrl={process.env.NEXT_PUBLIC_BLOG_URL}
          walletUrl={process.env.NEXT_PUBLIC_WALLET_URL}
          safeUrl={process.env.NEXT_PUBLIC_SAFE_URL}
          explorerUrl={process.env.NEXT_PUBLIC_EXPLORER_URL}
          verifierUrl={process.env.NEXT_PUBLIC_BACKEND_URL}
          nodeStatusApiUrl='https://api.uptimerobot.com/v2/getMonitors'
          isProd={false}
          sentryDsn={process.env.NEXT_PUBLIC_SENTRY_DSN}
          sentryEnv={process.env.NEXT_PUBLIC_SENTRY_ENV}
        >
          <ThemeProvider theme={theme}>
            <MessageConfirmerProvider>
              <JwtProvider>
                <ErrorBoundary>
                  <Component {...pageProps} />
                </ErrorBoundary>
              </JwtProvider>
            </MessageConfirmerProvider>
          </ThemeProvider>
        </EnvironmentProvider>
      </>
    )
  }
}

export default MyApp
