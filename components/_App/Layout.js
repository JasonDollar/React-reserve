import React from 'react'
import Head from 'next/head'
import { Container } from 'semantic-ui-react'
import PropTypes from 'prop-types'


import Header from './Header'
import HeadContent from './HeadContent'

function Layout({ children, user }) {
  return (
    <>
      <Head>
        <HeadContent />
        <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
        <link rel="stylesheet" type="text/css" href="/static/styles.css" />
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"
        />
        <title>NextReserve</title>
      </Head>
      <Header user={user} />
      <Container text style={{ paddingTop: '1em' }}>
        {children}
      </Container>
    </>
  )
}

export default Layout

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}