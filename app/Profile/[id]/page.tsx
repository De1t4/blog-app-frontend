'use client'
import axios from "axios";
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from "../../../contexts/authContext";
import { type UserProfile } from "../../interface/models";
import { BounceLoader } from "react-spinners";
import { InfoUser } from "../../components/UserProfile";
import { ProfileUser } from "../components/profileUser";


export default function Page() {
  const { id } = useParams()
  const [data, setData] = useState<UserProfile | null>(null)
  const [dataUser, setDataUser] = useState<UserProfile | null>(null)
  const { authTokens } = useAuthContext()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchDataUser = async (id: number) => {
      try {
        const response = await axios.get(`https://blog-app-backend-karg.onrender.com/users/${id}`)
        setLoading(true)
        setDataUser(response.data)
      } catch {
        console.log("error")
        setLoading(false)
      }finally{
        setLoading(true)
      }

    }
    fetchDataUser(Number(id))
  }, [id])

  return (
    <section className='m-auto   max-lg:w-11/12 max-lg:flex-col flex justify-around relative border-[1px]  border-slate-600 shadow-md shadow-slate-800 hover:shadow-slate-700 hover:border-slate-300 transition-all duration-300 p-8 w-[65rem] max-md:p-6 text-zinc-100  h-max  rounded-lg bg-slate-800 ' >
      {!loading
        ? <div className="h-80  flex justify-center items-center flex-col">
          <BounceLoader size={85} color='#379DFF' />
          <p className='mt-4 font-bold text-zinc-200'>Buscando Perfil...</p>
        </div>
        :
        (<>
          {dataUser != undefined
            ?
            (<>
              <ProfileUser authTokens={authTokens} dataUser={dataUser} ></ProfileUser>
              <InfoUser comments={dataUser.comments} posts={dataUser.posts}></InfoUser>
            </>
            ) : (
              "Usuario No encontrado"
            )}
        </>
        )}
    </section>
  )
}
