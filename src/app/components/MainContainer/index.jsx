"use client"
import React from 'react'
import Header from '../header'
import Footer from '../footer'
import Cookies from 'js-cookie'

const MainContainer = ({ children, FooterClassName, className }) => {
  return (
    <div className={className}>
      <main data-main-content className='transition-all duration-300 overflow-hidden'>
        <Header />
        <div className="mt-[64px]">
          {children}
        </div>
        <Footer className={FooterClassName} />
      </main>
    </div>
  )
}

export default MainContainer
