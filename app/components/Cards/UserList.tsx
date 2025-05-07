import Link from 'next/link'
import React from 'react'
import { SlUserFollowing } from 'react-icons/sl'
import { CardComponent } from './UserCard'
import SkeletonUser from '../Skeletons/SkeletonUser'


export const UserList:React.FC<CardComponent> = ({ title, users, onStopFollow, loading})=> {
  return (
    <>
      <aside className="border-[1px]  border-slate-600 shadow-md shadow-slate-800 hover:shadow-slate-700 hover:border-slate-300 transition-all duration-300   bg-slate-800 rounded-lg h-max p-3 text-xl">
        <p className=" mb-2 text-zinc-100 font-semibold text-center text-lg">{title}</p>
        {loading 
        ?
        <>
          <SkeletonUser/>
          <SkeletonUser/>
        </>
        : 
        <>
        { users  && users.length == 0 ? <p className=' text-sm text-zinc-400 font-semibold'>No estas siguiendo a nadie</p> :users && users.map((user,index)=>(
          <div key={index} className="py-1 flex items-center justify-between py-1order-2 px-2 hover:bg-slate-700 transition-all duration-200 rounded-lg cursor-pointer mb-2 ">
            <Link href={`/Profile/${user.id}`} className="z-10 justify-center flex items-center gap-2 ">
              <img src={`https://api.multiavatar.com/${user.id}.png`} alt={`image-profile-${user.name} `} className="w-8 rounded-full" />
              <span className="flex flex-col ">
                <p className="text-xs text-zinc-300 font-semibold overflow-hidden text-ellipsis whitespace-nowrap">{user.name} </p>
                <p className="text-xs text-zinc-300 font-semibold overflow-hidden text-ellipsis whitespace-nowrap">{user.lastname}</p>
              </span>
            </Link>
            <SlUserFollowing onClick={()=> onStopFollow(user)} className="mx-2 z-100 text-blue-500 hover:bg-slate-800 transition-all duration-200 p-1 rounded-lg w-7 h-7 text-[0.5rem] relavite  "/> 
          </div>
        ))
        }
        </>
        }

      </aside>
    </>
  )
}
