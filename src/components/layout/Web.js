import React from 'react'
import styled from 'styled-components'
import { Container } from '@dataesr/react-dsfr'
import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Header from './Header'
import Footer from './Footer'
import FetchIndicator from './web/FetchIndicator'

const StyledContainer = styled(Container)`
  max-width: 52rem;
  min-height: 100vh;
  padding-top: 3rem;
  padding-bottom: 3rem;
`
export default function Web(props) {
  return (
    <>
      <FetchIndicator />
      <Header />

      <StyledContainer role='main'>{props.children}</StyledContainer>
      <Footer />
      <ToastContainer
        position='bottom-left'
        transition={Slide}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        limit={2}
      />
    </>
  )
}
