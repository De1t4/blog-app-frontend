'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../contexts/authContext';
import { VscThreeBars } from 'react-icons/vsc';
import { MdLogout, MdHome } from "react-icons/md";
import { Tangerine } from 'next/font/google'
import { Modal } from './Modal';
import FormUser from './Forms/FormUser';
import ListNavbar from './ListNavbar';
import { FaHeartCirclePlus, FaPlus } from 'react-icons/fa6';

const tangerine = Tangerine({
  weight: '400',
  subsets: ['latin'],
})

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusNavbar, setStatusNavbar] = useState<boolean>(false)
  const { logout, authTokens, isLoggedIn } = useAuthContext()


  const closeModal = () => {
    setIsModalOpen(false)
  }
  const openModal = () => {
    setIsModalOpen(true);
  }

  const logoutUser = () => {
    logout()
  }
  const openNavbar = () => {
    setStatusNavbar(!statusNavbar)
  }
  return (
    <nav id='inicio' className=' relative  m-auto text-white items-center bg-slate-950 flex justify-between px-8 h-16'>
      <div className="flex justify-between items-center w-[80rem] m-auto">
        <Link href="/#">
          <p className={`${tangerine.className} text-[2.25rem] cursor-pointer font-bold text-2xl`}>Digital Corner</p>
        </Link>
        <div className='flex gap-4 font-semibold text-[#F3BF3A]'>
          <Link href={"/"} className={`max-md:hidden cursor-pointer p-2 rounded-lg hover:bg-slate-800 transition-all duration-300 hover:brightness-105 flex items-center gap-x-1`} ><MdHome />Inicio</Link>
          {statusNavbar && <ListNavbar userState={isLoggedIn} idUser={authTokens?.idUser} logoutUser={logoutUser} statusNavbar={statusNavbar} openModal={openModal} />}
          <VscThreeBars onClick={openNavbar} className=' cursor-pointer transition-all duration-300 hover:scale-105 text-2xl hidden max-md:block' />
          {isLoggedIn ?
            <span className="flex gap-4 max-[800px]:hidden">
              <Link href={`/PostCreate`} className='cursor-pointer p-2 rounded-lg hover:bg-slate-800 transition-all duration-300 hover:brightness-105 flex items-center gap-x-1'><FaPlus /> Crear Post</Link>
              <Link href={`/Favorites/${authTokens?.idUser}`} className='cursor-pointer p-2 rounded-lg hover:bg-slate-800 transition-all duration-300 hover:brightness-105 flex items-center gap-x-1'><FaHeartCirclePlus />Favoritos</Link>
              <p className='cursor-pointer  bg-gold  p-2 rounded-lg text-slate-950 font-bold  transition-all duration-300 hover:brightness-105 flex items-center gap-x-1' onClick={logoutUser}><MdLogout />Cerrar Sesión</p>
              <Link href={`/Profile/${authTokens?.idUser}`}>
                <p className="border bg-blue-100 shadow-md text-xl text-blue-700 font-bold uppercase flex justify-center items-center w-10 h-10 rounded-full " >{authTokens?.name.slice(0, 1)}</p>
              </Link>
            </span>
            : <>
              <p className='cursor-pointer  p-2 rounded-lg hover:bg-slate-800 transition-all duration-300 hover:brightness-105 max-[800px]:hidden' onClick={openModal}>Iniciar Sesión</p>
            </>
          }
        </div>
        <Modal stateModal={isModalOpen} onClick={closeModal}>
          <FormUser closeModal={closeModal} />
        </Modal>
      </div>
    </nav>
  )
}

