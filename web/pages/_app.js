import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import createEmotionCache from '../styles/createEmotionCache'
import { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import LoggedOutNavBar from '../components/shared/LoggedOutNavBar'
import LoggedInNavBar from '../components/shared/LoggedInNavBar'
import Footer from '../components/shared/Footer'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import '/styles/globals.css'
import theme from '../styles/theme'
import axios from 'axios'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Sending the JWT token on every request
  axios.interceptors.request.use(function (config) {
    const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'))
    if (loggedInUser) {
      const token = `Bearer ${loggedInUser.accessToken}`
      config.headers['Authorization'] = token
    }
    return config
  })

  // Finding the logged in user for showing the AppBar on every page
  const [loggedInUser, setLoggedInUser] = useState([])
  useEffect(() => {
    setLoggedInUser(JSON.parse(window.localStorage.getItem('loggedInUser')))
  }, [])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>FishNChill</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <body>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <AppBar position="relative">{loggedInUser ? <LoggedInNavBar /> : <LoggedOutNavBar />}</AppBar>
            <Component {...pageProps} />
            <Footer></Footer>
          </LocalizationProvider>
        </ThemeProvider>
      </body>
    </CacheProvider>
  )
}
