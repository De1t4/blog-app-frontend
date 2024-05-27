'use client'
import React, { useState, useEffect, ChangeEvent } from "react";
import { toast } from 'sonner'
import axios from "axios";
import { useAuthContext } from '../../contexts/authContext'
import { FaArrowLeftLong } from 'react-icons/fa6';
import Link from 'next/link';
import { FormEvents } from '../interface/models';
import { FormCreate } from '../components/Forms/FormCreate';

interface FormPost{
  title: string
  contentPost: string
  type: number
  picture: File | null
}

export default function Page() {
  const { isLoggedIn, authTokens } = useAuthContext();

  useEffect(()=>{
    if(!isLoggedIn){
      window.location.replace("/")
    }
  },[isLoggedIn])

  const [formPost, setFormPost] = useState<FormPost>({
    title:"",
    contentPost: "",
    type: 0,
    picture: null
  })

  const handleSubmit = async (e:React.FormEvent) =>{
    e.preventDefault()
    if(!isLoggedIn){
      toast.warning("Es necesario iniciar sesión")
    }else{
      if(formPost.contentPost == "" || formPost.title == "" || formPost.type == 0){
        toast.warning("Completar Datos")
      }else{
        try{
          const formData = new FormData();
          formData.append("Title", formPost.title);
          formData.append("Content", formPost.contentPost);
          formData.append("Type", formPost.type.toString()); // Convertir a cadena si es necesario
          formData.append("Picture", formPost.picture);

          await axios.post(`https://blog-app-backend-karg.onrender.com/createPosts/${authTokens.idUser}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          toast.success("Post creado exitosamente");
          console.log(formData)

        }catch{
          toast.error("Sucedio un error, vuelve a intentarlo")
        }
        (e.target as HTMLFormElement).reset();

      }
      
    }  
  }
  const handleChangeInput = (e: FormEvents["change"]): void => {
    const { name, value } = e.target;
    setFormPost({
      ...formPost,
      [name]: value,
    });
  };

  const handleChangedImage = (e: ChangeEvent<HTMLInputElement>) =>{
    const image = (e.target as HTMLInputElement).files[0]
    setFormPost({...formPost, picture: image})
  }

  return (
    <article className="relative m-auto items-center  max-lg:w-11/12  border-[1px]  border-slate-600 shadow-md shadow-slate-800 hover:shadow-slate-700 hover:border-slate-300 transition-all duration-300 py-10 px-6 bg-slate-800 h-max w-[38rem] flex flex-col rounded-lg">
      <Link href={"/"}>
        <FaArrowLeftLong  className=" text-zinc-100 absolute top-4 left-6 cursor-pointer hover:scale-110 transition-all duration-200"/>
      </Link>
      <h1 className='w-full text-3xl font-semibold text-[#328FFF] text-center border-b-[1px] pb-2 border-slate-500'>Crear Post</h1>
    
      <FormCreate imageSelect={formPost.picture} handleSubmit={handleSubmit} handleChangeInput={handleChangeInput} handleChangedImage={handleChangedImage}/>
    </article>
  )
}
