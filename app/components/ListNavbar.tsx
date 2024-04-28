import Link from 'next/link';
import React from 'react';
import { FaHeartCirclePlus, FaPlus, FaRegCircleUser } from 'react-icons/fa6';
import { MdHome, MdLogout } from 'react-icons/md';

interface ListProps {
  userState: boolean
  idUser: number
  logoutUser: () => void
  openModal: () => void
  statusNavbar: boolean
}

const styleBtn = " cursor-pointer border-2 border-gold  w-2/4 flex justify-center items-center gap-x-2 h-10 rounded-lg transition-all duration-300 hover:bg-slate-800"

const ListNavbar:React.FC<ListProps> = ({userState, idUser, logoutUser, openModal, statusNavbar}) => {
  return (
    <div className=' '>
      {statusNavbar && (<>
        {userState && userState ?
          <div className=" absolute left-0  translate-y-11 rounded-xl z-50 w-full flex flex-col bg-slate-950 gap-y-8 p-8 text-center items-center justify-center border-b-4 border-gold">
            <Link href={`/Profile/${idUser}`} className={styleBtn}><FaRegCircleUser/>Mi Perfil</Link>
            <Link href={`/PostCreate`} className={styleBtn}><FaPlus/> Crear Post</Link>
            <Link href={`/Favorites/${idUser}`} className={styleBtn}><FaHeartCirclePlus/>Favoritos</Link>
            <span className={styleBtn} onClick={logoutUser}><MdLogout/>Cerrar Sesión</span>
          </div>
        :<>
          <div className=" absolute left-0  translate-y-11 rounded-xl z-30 w-full flex flex-col bg-slate-950 gap-y-8 p-8 text-center items-center justify-center border-b-4 border-gold">
            <Link href={`/`} className={styleBtn}><MdHome />Inicio</Link>
            <p className={styleBtn} onClick={openModal}><FaRegCircleUser/>Iniciar Sesión</p>

          </div>       
           </>
        }
      </>)
      }
    </div>
  );
}

export default ListNavbar;
