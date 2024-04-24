'use client'
import {useState } from "react"
import { calculeDate } from "../../services/fetchApi";
import React from "react";
import Link from "next/link";
import { DataCard } from "../../interface/models";
import { Modal } from "../Modal";
import { FormComment } from "../FormComment";

export const Cards:React.FC<DataCard> = ({name, loadComment, type, id, datePosts, content, title, picture, children}) => {
  const [statePicture, setStatePicture] = useState(false)

  const viewPicture = () =>{
    setStatePicture(!statePicture)
  }

  return (
    <>
      <nav className=" flex items-center justify-between ">
        <div className="flex gap-2 items-center">
          <img src={`https://i.pravatar.cc/100?img=${name}`} alt={`image-profile-${name} `} className="border-2 w-10 rounded-full "/>
          <span className="">
            <p className="text-xl max-md:text-sm text-[#F1F1E6] font-semibold font-sans">{name}</p>
            <p className="text-xs text-zinc-300 font-sans max-md:text-[10px]">{calculeDate(datePosts)}</p>
          </span>
        </div>
        <p className="text-xs max-md:w-auto text-[#F3BF3A] bg-slate-900 py-1 px-2 rounded-lg font-sans select-none max-md:text-xs" >{type}</p>
      </nav>
      <div className="my-2 flex flex-col">
        <Link href={`/SinglePost/${id}`}>
          <h1 className="hover:brightness-110 overflow-hidden text-ellipsis whitespace-nowrap transition-all duration-300 text-[#328FFF] font-bold text-2xl font-sans max-md:text-xl">{title}</h1>
        </Link>
        <p className="mt-2 text-zinc-100 text-sm font-sans">{content}</p>
        { picture != "" ? <img src={`${picture}`} className=" m-auto hover:scale-[1.015] cursor-pointer transition-all duration-300 my-2 rounded-lg" onClick={viewPicture} alt="" width={500} height={400} />:""            }
      </div>
      {
        children
      }
      <FormComment id={id} loadComment={loadComment}/>
      <Modal stateModal={statePicture} onClick={viewPicture}>
        {picture != "" && <img src={`${picture}`} className=" max-md:  w-96" width={550} height={200} alt=""></img>}  
      </Modal>
    </>
  )
}
