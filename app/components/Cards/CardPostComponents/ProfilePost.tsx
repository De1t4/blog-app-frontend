import React from 'react';
import { calculeDate } from '../../../services/fetchApi';

interface ProfileProps{
  datePosts: string
  type: string
  name: string
}

const ProfilePost:React.FC<ProfileProps> = ({name, datePosts, type}) => {
  return (
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
  );
}

export default ProfilePost;
