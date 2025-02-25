import Link from 'next/link'
import React from 'react'
import { ButtonHome } from './components/Button/Buttons'
import { NotFoundPage } from './components/notFoundImage'

export default function NotFound() {
  return (
    <div className=' flex flex-col items-center'>
      <h1 className=' text-4xl text-[#FFC83D] text-center font-bold'>Pagina No Encontrada</h1>
      <ButtonHome/>
      <NotFoundPage/>
    </div>
  )
}
