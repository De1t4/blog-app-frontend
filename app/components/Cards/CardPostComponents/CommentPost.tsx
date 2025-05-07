'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { useAuthContext } from '../../../../contexts/authContext';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { calculeDate } from '../../../services/fetchApi';
import { FaTrash } from 'react-icons/fa6';
import { FaEdit } from 'react-icons/fa';
import Image from 'next/image';

interface CommentsProps {
  name:string
  idUser: number
  lastname: string
  email: string
  idComment: number
  deleteComment: (idComment: number) => void
  editComment: (idComment:number) => void
  content: string
  dateComment: string
}


const CommentPost:React.FC<CommentsProps> = ({name, idUser, lastname, email, idComment, deleteComment, editComment ,content, dateComment}) => {
  const [isPopoverOpen, setIsPopoverOpen ] = useState<boolean>(false)
  const { authTokens } = useAuthContext()
  const openPopover = () =>{
    setIsPopoverOpen(!isPopoverOpen)
  }

  return (
    <li className=" text-zinc-300 my-4">
    <div className="flex items-center justify-between relative  gap-4 ">
      <div className="flex gap-2 items-center">
        <Image src={`https://api.multiavatar.com/${idUser}.png`} width={40} height={40} alt={`image-profile-${name} `} className=" rounded-full w-10"/>
        <span className=" ">
          <Link href={`/Profile/${idUser}`}>
            <p className="text-zinc-100 font-bold max-md:text-xs">{name} {lastname}  <span className="text-xs font-semibold text-zinc-500 overflow-hidden text-ellipsis whitespace-nowrap">{calculeDate(dateComment)}</span></p>
          </Link>
          <p className=" text-xs font-semibold text-zinc-400 overflow-hidden text-ellipsis whitespace-nowrap">{email}</p>
        </span>
      </div>
      {idUser == authTokens?.idUser && (
      <>
        <BiDotsVerticalRounded onClick={() => openPopover()} className=" cursor-pointer text-xl" />
        {isPopoverOpen && (<ol  className=' z-10 border-[1px] border-slate-500 hover:border-slate-200 rounded-md flex justify-center items-left p-2 flex-col-reverse absolute transition-all duration-300  right-5 -translate-y-15 bg-slate-800 w-36 h-22'>
          <li onClick={() => deleteComment(idComment)} className='flex transition-all duration-300 items-center gap-x-2 hover:rounded-md cursor-pointer hover:bg-slate-700 p-1'><FaTrash /> Eliminar</li>
          <li onClick={() => editComment(idComment)} className='flex transition-all duration-300 items-center gap-x-2 hover:rounded-md cursor-pointer hover:bg-slate-700 p-1'><FaEdit /> Editar</li>
        </ol>)}
      </>)}
    </div>
    <p className="text-xs leading-5 mt-2 bg-slate-700 rounded-lg p-2">{content}</p>
  </li>
  );
}

export default CommentPost;
