import Link from 'next/link'
import React from 'react'
import { MyPost } from '../../page'

interface PropsCard {
  myPost: MyPost[]
}

export const CardPostUser:React.FC<PropsCard> = ({myPost}) => {
  return (
    <aside className=" max-xl:hidden border-[1px] col-start-1 row-start-1 transition-all duration-300 border-slate-600 shadow-md shadow-slate-800 hover:shadow-slate-700 hover:border-slate-300 w-full  bg-slate-800 rounded-lg h-max  py-4 px-6 text-xl">
      <p className="uppercase mb-2 text-zinc-100 font-semibold text-center ">Mis Posteos</p>
      {myPost && myPost.length === 0 ? (
        <span className="flex flex-col justify-center items-center">
          <p className="text-zinc-200 text-sm text-center mb-2"> No tienes Posteos...</p> 
          <Link href={"/PostCreate"}>
            <button className="text-[#F3BF3A] p-2 flex justify-center items-center bg-slate-900 rounded-lg text-sm">Crear Post</button>
          </Link>
        </span>
      ) : (
        myPost && myPost.map((post, index) => (
          <Link key={index} href={`/SinglePost/${post.id_posts}`} className="text-zinc-100 text-sm">
            <p className="p-1 overflow-hidden text-ellipsis whitespace-nowrap hover:bg-slate-700 transition-all duration-200 rounded-lg">{post.title}</p>
          </Link>
        ))
      )}
    </aside>
  )
}
