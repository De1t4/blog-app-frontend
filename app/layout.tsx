import './globals.css'
import Navbar from './components/Navbar'
import { Toaster } from 'sonner'
import React from 'react'
import AuthContextProvider from '../contexts/authContext'
import Footer from './components/Footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='scroll-smooth focus:scroll-auto scrollbar scrollbar-track-slate-700 scrollbar-thumb-slate-400  scrollbar-thumb-rounded-full scrollbar-track-rounded-full '>
      <title>Digital Corner</title>
      <body className=' '>
      <Toaster richColors/>
        <AuthContextProvider>
          <Navbar></Navbar>
          <main className='m-auto min-h-screen bg-slate-900  py-10 max-lg:px-0'>{children}</main>
          <Footer/>
        </AuthContextProvider>
      </body>
    </html>
  )
}

