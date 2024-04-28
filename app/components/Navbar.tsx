'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../contexts/authContext';
import { VscThreeBars } from 'react-icons/vsc';
import { MdLogout, MdHome  } from "react-icons/md";
import { Tangerine } from 'next/font/google'
import { Modal } from './Modal';
import FormUser from './Forms/FormUser';
import ListNavbar from './ListNavbar';
import { FaHeartCirclePlus, FaPlus, FaRegCircleUser } from 'react-icons/fa6';

const tangerine = Tangerine({
  weight: '400',
  subsets: ['latin'],
})

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userState, setUserState] = useState<boolean>(false)
  const [statusNavbar, setStatusNavbar] = useState<boolean>(false)
  const {logout, isLoggedIn, authTokens} = useAuthContext()
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
  });

  const closeModal = () =>{
    setIsModalOpen(false)
  }
  const openModal = () =>{
    setIsModalOpen(true);
  }

  useEffect(() => {
    setUserState(isLoggedIn)
    if(windowSize.width > 728){
      setStatusNavbar(false)
    }
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isLoggedIn, windowSize.width])

  const logoutUser = () =>{
    logout()
  }
  const openNavbar = () =>{
    setStatusNavbar(!statusNavbar)
  }
  return (
    <nav  id='inicio' className=' relative  text-white items-center bg-slate-950 flex justify-between px-8 h-16'>
      <Link href="/"> 
        <p className={`${tangerine.className} text-[2.25rem] cursor-pointer font-bold text-2xl`}>Digital Corner</p>
      </Link>
      <div className='flex gap-4 font-semibold text-[#F3BF3A]'>
        <Link href={"/"} className={`max-md:hidden cursor-pointer p-2 rounded-lg hover:bg-slate-800 transition-all duration-300 hover:brightness-105 flex items-center gap-x-1`} ><MdHome />Inicio</Link>
        {statusNavbar && <ListNavbar userState={userState} idUser={authTokens?.idUser} logoutUser={logoutUser} statusNavbar={statusNavbar} openModal={openModal} />}    
        <VscThreeBars onClick={openNavbar} className=' cursor-pointer transition-all duration-300 hover:scale-105 text-2xl hidden max-md:block'/>
        {userState && userState ?
          <span className="flex gap-4 max-[800px]:hidden">
            <Link href={`/Profile/${authTokens?.idUser}`} className=' cursor-pointer p-2 rounded-lg hover:bg-slate-800 transition-all duration-300 hover:brightness-105 flex items-center gap-x-1'><FaRegCircleUser/>Mi Perfil</Link>
            <Link href={`/PostCreate`} className='cursor-pointer p-2 rounded-lg hover:bg-slate-800 transition-all duration-300 hover:brightness-105 flex items-center gap-x-1'><FaPlus/> Crear Post</Link>
            <Link href={`/Favorites/${authTokens?.idUser}`} className='cursor-pointer p-2 rounded-lg hover:bg-slate-800 transition-all duration-300 hover:brightness-105 flex items-center gap-x-1'><FaHeartCirclePlus/>Favoritos</Link>
            <p className='cursor-pointer  p-2 rounded-lg hover:bg-slate-800 transition-all duration-300 hover:brightness-105 flex items-center gap-x-1' onClick={logoutUser}><MdLogout/>Cerrar Sesión</p>
          </span>
        :<>
          <p className='cursor-pointer  p-2 rounded-lg hover:bg-slate-800 transition-all duration-300 hover:brightness-105 max-[800px]:hidden' onClick={openModal}>Iniciar Sesión</p>
        </>
        } 
      </div>
      <Modal stateModal={isModalOpen} onClick={closeModal}>
        <FormUser  closeModal={closeModal}/>
      </Modal>
    </nav>
  )
}

