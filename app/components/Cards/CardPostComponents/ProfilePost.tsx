import React from 'react';
import { calculeDate } from '../../../services/fetchApi';
import Image from 'next/image';

interface ProfileProps {
  datePosts: string
  type: string
  name: string
  id: number
}

const ProfilePost: React.FC<ProfileProps> = ({ name, datePosts, type, id }) => {
  return (
    <nav className=" flex items-center justify-between ">
      <div className="flex gap-2 items-center">
        <p className="border bg-blue-100 shadow-md text-base text-blue-700 font-bold uppercase flex justify-center items-center w-8 h-8 rounded-full " >{name.slice(0, 1)}</p>
        <span className="">
          <p className="text-xl max-md:text-sm text-[#F1F1E6] font-semibold font-sans">{name}</p>
          <p className="text-xs text-zinc-300 font-sans max-md:text-[10px]">{calculeDate(datePosts)}</p>
        </span>
      </div>
      <p className="text-xs max-md:w-auto text-[#F3BF3A] border-[1px] border-slate-500 bg-slate-900 py-1 px-2 rounded-lg font-sans select-none max-md:text-xs" >{type}</p>
    </nav>
  );
}

export default ProfilePost;
