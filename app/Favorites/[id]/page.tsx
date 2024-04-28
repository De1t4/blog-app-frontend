'use client'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../contexts/authContext';
import { Favorite } from '../../interface/models';
import axios from "axios";
import Link from 'next/link';
import { useParams } from 'next/navigation'
import { toast } from 'sonner';
import { SkeletonFavorite } from '../../components/Skeletons/SkeletonUser';
import { NotFavoritesImage } from '../../components/notFoundImage';
import { ButtonHome } from '../../components/Button/Buttons';

export default function Page() {
  const {id} = useParams()
  const { authTokens } = useAuthContext()
  const [favoriteData, setFavoriteData] = useState<Favorite[]>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(()=>{
    fetchFavorite()
  },[])

  const fetchFavorite = async () =>{
    setLoading(true)
    if( authTokens.idUser == Number(id)){
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

  return (
    <section className="flex items-center flex-col max-md:mx-2 ">
      <h1 className=' text-3xl font-semibold text-[#328FFF]'>Tus Favoritos</h1>
      {loading && <SkeletonFavorite/>}
      {favoriteData?.length == 0 && 
      <article  className="  items-center max-md:w-full transition-all duration-300 py-4 px-6 bg-slate-800 h-min-72 w-96 text-center my-4 flex flex-col  rounded-lg">
        <NotFavoritesImage/>
        <h1 className=' text-xl text-zinc-200 font-bold'>No tienes Posteos Favoritos</h1>
        <ButtonHome/>

      </article>}
      {favoriteData?.map((favorite, index)=>(
        <Link key={favorite.idPosts} href={`/SinglePost/${favorite.idPosts}`} className='transition-all duration-300  w-full'>
          <article key={index} className=" m-auto max-md:w-11/12 border-[1px] hover:scale-105  border-slate-600 shadow-md shadow-slate-800 hover:shadow-slate-700 hover:border-slate-300 w-[38rem]  transition-all duration-300 py-4 px-6 bg-slate-800 h-min-72 my-4 flex flex-col justify-between rounded-lg">
            <h1 className="hover:brightness-110 transition-all duration-300 text-[#328FFF] font-bold text-2xl font-sans max-md:text-xl">{favorite.title}</h1>
            <p className=' text-zinc-100'>{favorite.content}</p>
          </article>
        </Link>
      ))}
    </section>  
    )
}
