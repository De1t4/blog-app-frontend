'use client'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../contexts/authContext';
import { Favorite } from '../../interface/models';
import axios from "axios";
import Link from 'next/link';
import { useParams } from 'next/navigation'

export default function Page() {
  const {id} = useParams()
  const { authTokens } = useAuthContext()
  const [favoriteData, setFavoriteData] = useState<Favorite[]>([])
  useEffect(()=>{
    const fetchFavorite = async () =>{
      if( authTokens.idUser == Number(id)){
        try{
          const response = await axios.get(`https://blog-app-backend-karg.onrender.com/favorites/${id}`)
          setFavoriteData(response.data)
        }catch{
          console.log("error")
        }
      }else{
        window.location.replace("/")
      }
    }
    fetchFavorite()
  },[])

  return (
    <section className="flex items-center flex-col max-md:mx-2 ">
      <h1 className=' text-3xl font-semibold text-[#328FFF]'>Tus Favoritos</h1>
      {favoriteData.length !== 0 ? (favoriteData.map((favorite, index)=>(
        <Link key={favorite.idPosts} href={`/SinglePost/${favorite.idPosts}`} className='transition-all duration-300  w-full'>
          <article key={index} className=" m-auto max-md:w-11/12 border-[1px] hover:scale-105  border-slate-600 shadow-md shadow-slate-800 hover:shadow-slate-700 hover:border-slate-300 w-[38rem]  transition-all duration-300 py-4 px-6 bg-slate-800 h-min-72 my-4 flex flex-col justify-between rounded-lg">
            <h1 className="hover:brightness-110 transition-all duration-300 text-[#328FFF] font-bold text-2xl font-sans max-md:text-xl">{favorite.title}</h1>
            <p className=' text-zinc-100'>{favorite.content}</p>
          </article>
        </Link>
      ))
      ):(
      <article  className=" max-md:w-full transition-all duration-300 py-4 px-6 bg-slate-800 h-min-72 w-96 text-center my-4 flex flex-col justify-between rounded-lg">
        <h1 className=' text-zinc-100 font-semibold text-xl'>No cuentas con Favoritos</h1>
      </article>
      )}
    </section>  
    )
}
