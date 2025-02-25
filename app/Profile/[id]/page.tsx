'use client'
import axios from "axios";
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from "../../../contexts/authContext";
import { Jakarta } from "../../services/fetchApi";
import { UserProfile } from "../../interface/models";
import { BounceLoader, GridLoader } from "react-spinners";
import { UserProfileInfo } from "../../components/UserProfile";


export default function Page() {
  const { id } = useParams()
  const [viewData, setViewData] = useState<boolean>(false)
  const [dataUser, setDataUser] = useState<UserProfile>()
  const { authTokens } = useAuthContext()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(()=>{
    const fetchDataUser = async (id:number) =>{
      try{
        const response = await axios.get(`https://blog-app-backend-karg.onrender.com/users/${id}`)
        setLoading(true)
        setDataUser(response.data)
      }catch{
        console.log("error")
        setLoading(false)
      }

    }
    fetchDataUser(Number(id))
  },[id])

  const fetchPosts = () =>{
    setViewData(!viewData)
  }

  const fetchComments = () =>{
    setViewData(false)
  }

  return (
    <section className='m-auto   max-lg:w-11/12 max-lg:flex-col flex justify-around relative border-[1px]  border-slate-600 shadow-md shadow-slate-800 hover:shadow-slate-700 hover:border-slate-300 transition-all duration-300 p-8 w-[65rem] max-md:p-6 text-zinc-100  h-max  rounded-lg bg-slate-800 ' >
      {!loading 
      ?<div className="h-80  flex justify-center items-center flex-col"> 
        <BounceLoader size={85} color='#379DFF'/>
        <p className='mt-4 font-bold text-zinc-200'>Buscando Perfil...</p>
      </div>
      :
      (<>
      {dataUser != undefined 
        ?
          (<UserProfileInfo 
            dataUser={dataUser} 
            authTokens={authTokens} 
            Jakarta={Jakarta.className} 
            viewData={viewData} 
            fetchComments={fetchComments} 
            fetchPosts={fetchPosts}/>
      ) : (
        "Usuario No encontrado"
        )}
      </>
      )}
    </section>
  )
}
