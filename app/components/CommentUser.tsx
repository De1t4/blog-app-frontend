import React, { useState } from 'react'
import { calculeDate } from '../services/fetchApi'
import Link from 'next/link'
import { BiDotsVerticalRounded } from "react-icons/bi"
import { useAuthContext } from '../../contexts/authContext'
import { Comment } from '../interface/models'
import { FaTrash,FaEdit  } from "react-icons/fa";

interface DataComment{
  dataComment:Comment
  deleteComment: (idComment: number) => void
}

export const CommentUser: React.FC<DataComment> = ({
  dataComment, deleteComment
}) => {
  const [isPopoverOpen, setIsPopoverOpen ] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>()

  const { authTokens } = useAuthContext()
  const openPopover = () =>{
    setIsPopoverOpen(!isPopoverOpen)
  }


  return (
    <li className=" text-zinc-300 my-4">
      <div className="flex items-center justify-between relative  gap-4 ">
        <div className="flex gap-2 items-center">
          <img src={`https://i.pravatar.cc/100?img=${dataComment.name}`} alt={`image-profile-${dataComment.name} `} className=" rounded-full w-10"/>
          <span className=" ">
            <Link href={`/Profile/${dataComment.idUser}`}>
              <p className="text-zinc-100 font-bold max-md:text-xs">{dataComment.name} {dataComment.lastname}  <span className="text-xs font-semibold text-zinc-500 overflow-hidden text-ellipsis whitespace-nowrap">{calculeDate(dataComment.dateComment)}</span></p>
            </Link>
            <p className=" text-xs font-semibold text-zinc-400 overflow-hidden text-ellipsis whitespace-nowrap">{dataComment.email}</p>
          </span>
        </div>
        {dataComment.idUser == authTokens?.idUser && (
        <>
          <BiDotsVerticalRounded onClick={() => openPopover()} className=" cursor-pointer text-xl" />
          {isPopoverOpen && (<ol  className=' z-10 border-[1px] border-slate-500 hover:border-slate-200 rounded-md flex justify-center items-left p-2 flex-col-reverse absolute transition-all duration-300  right-5 -translate-y-15 bg-slate-800 w-36 h-22'>
            <li onClick={() => deleteComment(dataComment.idComment)} className='flex transition-all duration-300 items-center gap-x-2 hover:rounded-md cursor-pointer hover:bg-slate-700 p-1'><FaTrash /> Eliminar</li>
          </ol>)}
        </>)}
      </div>
      {/* {!editComment ?
        <p className="text-xs leading-5 mt-2 bg-slate-700 rounded-lg p-2">{dataComment.content}</p>
        : <form action=""><input type="text" onChange={handleChangeInput} className='border-2 text-xs leading-5 mt-2 bg-slate-700 rounded-lg p-2 w-full outline-1' value={inputValue} placeholder={dataComment.content} /></form>
      } */}
        <p className="text-xs leading-5 mt-2 bg-slate-700 rounded-lg p-2">{dataComment.content}</p>

    </li>
  )
}
