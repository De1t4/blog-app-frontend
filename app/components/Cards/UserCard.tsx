import Link from 'next/link'
import React from 'react'
import { SlUserFollow } from 'react-icons/sl'
import { Users } from '../../page';
import SkeletonUser from '../Skeletons/SkeletonUser';
export interface CardComponent {
  title: string
  users: Users[];
  onFollow?: (user: Users) => void;
  onStopFollow?: (user: Users) => void;
  updateSearchUser?: (e: React.ChangeEvent<HTMLInputElement>) => void
  loading?: boolean
}


export const UserCard: React.FC<CardComponent> = ({ loading, title, users, onFollow, updateSearchUser }) => {
  return (
    <>
      <aside className="border-[1px] mt-8 border-slate-600 shadow-md shadow-slate-800 hover:shadow-slate-700 hover:border-slate-300 transition-all duration-300   bg-slate-800 rounded-lg h-max p-3 text-xl">
        <label className=" flex flex-col justify-center items-center mb-4 gap-y-3 text-zinc-100 font-semibold text-center text-lg ">{title}
          <input type="text" onChange={updateSearchUser} placeholder='Buscar Usuarios' className='max-md:w-full bg-slate-600 font-semibold  text-zinc-100 py-2 px-4 rounded-lg outline-1 outline-zinc-700 text-sm w-full' /></label>
        {loading
          ?
          <>
            <SkeletonUser />
            <SkeletonUser />
          </>
          : <>
            {users && users.length == 0 ? <p className=' text-sm text-zinc-400 font-semibold'>No hay mas personas para seguir</p> :
              <>
                {users && users.map((user, index) => (
                  <div key={index} className=" flex items-center justify-between py-1 py-1order-2 px-2 hover:bg-slate-700 transition-all duration-200 rounded-lg cursor-pointer mb-2">
                    <Link href={`/Profile/${user.id}`} className="z-10 justify-center flex items-center gap-2 ">
                      <p className="border bg-blue-100 shadow-md text-blue-700 font-bold uppercase flex justify-center items-center w-8 h-8 rounded-full " >{user.name.slice(0, 1)}</p>
                      <span className="flex flex-col">
                        <p className="text-xs text-zinc-300 font-semibold overflow-hidden text-ellipsis whitespace-nowrap">{user.name} </p>
                        <p className="text-xs text-zinc-300 font-semibold overflow-hidden text-ellipsis whitespace-nowrap">{user.lastname}</p>
                      </span>
                    </Link>
                    <SlUserFollow onClick={() => onFollow(user)} className="mx-2 z-100 text-zinc-100 hover:bg-slate-800 transition-all duration-200 p-1 rounded-lg w-7 h-7  text-[0.5rem]" />
                  </div>
                ))
                }
              </>
            }
          </>
        }
      </aside>
    </>
  )
}
