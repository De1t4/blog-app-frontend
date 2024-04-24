'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../contexts/authContext';
import { VscThreeBars } from 'react-icons/vsc';
import { FaPlus, FaHeartCirclePlus, FaRegCircleUser, } from "react-icons/fa6";
import { MdLogout, MdHome  } from "react-icons/md";
import { Tangerine } from 'next/font/google'
import { Modal } from './Modal';
import { UserLogin } from '../interface/models';
import { toast } from 'sonner'
import axios from "axios";

const tangerine = Tangerine({
  weight: '400',
  subsets: ['latin'],
})

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userState, setUserState] = useState<boolean>(false)
  const [stateLogin, setStateLogin] = useState<boolean>(false)
  const {logout, isLoggedIn, authTokens} = useAuthContext()
  const [formUser, setFormUser] = useState<UserLogin>({
    email: "",
    password: ""
  });
  const { login } =  useAuthContext()
  const closeModal = () =>{
    setIsModalOpen(false)
  }
  const openModal = () =>{
    setIsModalOpen(true);
  }

  useEffect(() => {
    setUserState(isLoggedIn)
  }, [isLoggedIn])

  const logoutUser = () =>{
    logout()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (formUser.password === "" || formUser.password === "") {
      toast.error("Completar todos los campos");
    } else {
      try {
        const response = await axios.post("https://blog-app-backend-karg.onrender.com/loginUser", {
          email: formUser.email,
          password: formUser.password,
        });
        setStateLogin(false)
        const tokens = response.data;
        toast.success("Los datos son correctos");
        setFormUser({...formUser, email: "", password: ""})
        login(tokens)
      } catch(error) {
        if (axios.isAxiosError(error)) {
          if(error.response.status === 400){
            setStateLogin(true)
          }
        } else {
          console.error("Error desconocido:", error);
        }
      }
    }
  };

  const updateEmail = (value: React.ChangeEvent<HTMLInputElement>) => {
    setFormUser({ ...formUser, email: value.target.value });
  };

  const updatePassword = (value: React.ChangeEvent<HTMLInputElement>) => {
    setFormUser({ ...formUser, password: value.target.value});
  };

  return (
    <nav  id='inicio' className='  text-white items-center bg-slate-950 flex justify-between px-8 h-16'>
      <Link href="/"> 
        <p className={`${tangerine.className} text-[2.25rem] cursor-pointer font-bold text-2xl`}>Digital Corner</p>
      </Link>
      <div className='flex gap-4 font-semibold text-[#F3BF3A]'>
        <Link href={"/"} className={`max-md:hidden cursor-pointer p-2 rounded-lg hover:bg-slate-800 transition-all duration-300 hover:brightness-105 flex items-center gap-x-1`} ><MdHome />Inicio</Link>
        <VscThreeBars className=' text-2xl hidden max-md:block'/>
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
      {!userState && 
      <Modal stateModal={isModalOpen}>
        <section className={` transition-all duration-300 w-96 modal-content bg-slate-950  shadow-xl shadow-[#0a2170] text-white rounded-lg  p-6  max-md:w-4/5 h-96`}>
          <span onClick={closeModal} className="text-4xl close-btn cursor-pointer " id="closeModalBtn">&times;</span>
          <h2 className="text-3xl text-center mb-4 text-[#f0f3ff] font-bold">Iniciar Sesión</h2>

          <form className="flex flex-col" onSubmit={handleSubmit}>
              <label htmlFor="username" id='email' className="mb-2">Email</label>
              <input onChange={updateEmail} name='email' type="email" className=" bg-slate-800 w-full text-zinc-100 py-2 px-4 rounded-lg outline-none text-sm mb-2" placeholder="Example@gmail.com"/>
              <label htmlFor="password" id='password' className="mb-2">Contraseña</label>
              <input onChange={updatePassword} name='password' type="password" className=" bg-slate-800 w-full text-zinc-100 py-2 px-4 rounded-lg outline-none text-sm mb-4" placeholder="*********"/>
              <button disabled={formUser.email == "" || formUser.password == ""} type="submit" className="my-2 rounded-lg bg-slate-500 font-semibold text-zinc-100  px-4 py-2 ">Iniciar Sesión</button>
          </form>
          {stateLogin && (<p className=' text-red-600 font-bold text-sm'>La Contraseña o el Usuario son Incorrectos</p>)}
        </section>
      </Modal>}
    </nav>
  )
}
