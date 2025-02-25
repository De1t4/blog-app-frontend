'use client'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../contexts/authContext';
import { Favorite } from '../../interface/models';
import axios from "axios";
import { useParams } from 'next/navigation'
import { toast } from 'sonner';
import { NotFavoritesImage } from '../../components/notFoundImage';
import { ButtonHome } from '../../components/Button/Buttons';

import RowTable from '../../components/Table/RowTable';
import { VscHeartFilled } from 'react-icons/vsc';
import SkeletonRowTable from '../../components/Skeletons/SkeletonRowTable';
import { calculeDate } from '../../services/fetchApi';
import Link from 'next/link';

const API_REQUEST = "https://blog-app-backend-karg.onrender.com"

export default function Page() {
  const {id} = useParams()
  const { authTokens, isLoggedIn } = useAuthContext()
  const [favoriteData, setFavoriteData] = useState<Favorite[]>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(()=>{
      fetchFavorite()
  },[isLoggedIn])

  const fetchFavorite = async () =>{
    setLoading(true)
    if( authTokens?.idUser == Number(id)){
      try{
        const response = await axios.get(`https://blog-app-backend-karg.onrender.com/favorites/${id}`)
        setFavoriteData(response.data)
      }catch(error:any){
        toast.warning("Sucedio un error: ", error)
      }finally{
        setLoading(false)
      }
    }else{
      window.location.replace("/")
    }
  }

  const removeFavorite = async (idPosts: number) => {
    try{
      await axios.delete(`${API_REQUEST}/favoriteDelete/${idPosts}/${authTokens.idUser}`)
      toast.success("El post fue elimando de tus favoritos")
      setFavoriteData(favoriteData.filter((post)=> post.idPosts != idPosts))
    }catch{
      toast.warning("Error vuelva intentarlo")
    }
  }

  return (
    <section className="flex items-center flex-col max-md:mx-2 ">
      <h1 className=' text-3xl font-semibold text-[#328FFF]'>Tus Favoritos</h1>
      {favoriteData?.length == 0 ?
      <article  className="  items-center max-md:w-full transition-all duration-300 py-4 px-6 bg-slate-800 h-min-72 w-96 text-center my-4 flex flex-col  rounded-lg">
        <NotFavoritesImage/>
        <h1 className=' text-xl text-zinc-200 font-bold'>No tienes Posteos Favoritos</h1>
        <ButtonHome/>
      </article>
      :
      <table className="text-zinc-200 table-auto border-[1px] border-slate-500 rounded-lg w-[45rem] max-md:w-full mt-4">
      <thead className=''>
        <tr className='border-b-2 bg-slate-900 border-slate-500'>
          <th className="p-4 text-sm font-semibold tracking-wide text-left">#</th>
          <th className="p-4 text-sm font-semibold tracking-wide text-left">Titulo Post</th>
          <th className="p-4 text-sm font-semibold tracking-wide text-left">Fecha Post</th>
          <th className='p-4 text-sm font-semibold tracking-wide '>Quitar</th>
        </tr>
      </thead>
      <tbody className="">
        {favoriteData?.map((favorite, index)=>(
        <tr key={favorite.idPosts} className={`${index % 2 == 0 && " bg-slate-800"}`}>
          <td className='p-4 font-semibold'>{index+1}</td>
          <td className='p-4 font-semibold'><Link href={`/SinglePost/${favorite.idPosts}`}>{favorite.title}</Link></td>
          <td className='p-4 font-semibold'>{calculeDate(favorite.date)}</td>
          <td onClick={() => removeFavorite(favorite.idPosts)} className='p-4 font-semibold items-center flex justify-center'><VscHeartFilled className="cursor-pointer text-3xl border-2 bg-red-100 text-red-600 rounded-lg p-1 hover:brightness-90 transition-all duration-200" />    </td>          
        </tr>
        ))}
        {loading &&
          <SkeletonRowTable/>
        }
        </tbody>  
    </table>
      }

    </section>  
    )
}
