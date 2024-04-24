'use client'
import { useParams } from 'next/navigation'
import axios from "axios";
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../contexts/authContext';
import { toast } from 'sonner';
import { Posts } from '../../interface/models';
import { PostInfo } from '../../components/PostInfo';
import {BounceLoader} from 'react-spinners'

export interface Favorite {
  fav: boolean;
  idLike?: number
}

export default function Page() {
  const [postInfo, setPostInfo] = useState<Posts>()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<Favorite>()
  const { authTokens, isLoggedIn } = useAuthContext()
  const [uploadPost, setUploadPost] = useState<boolean>(true)
  const {id} = useParams()

  const closeModal = () =>{
    setIsModalOpen(false)
  }
  const openModal = () =>{
    setIsModalOpen(true);
  }

  useEffect(()=>{
    fetchDataPost()
  },[])

  const fetchDataPost = async () =>{
    try{
      const res = await axios.get(`https://blog-app-backend-karg.onrender.com/getPosts/${id}`)
      setPostInfo(res.data)
      setUploadPost(false)
      const resfav = await axios.get(`https://blog-app-backend-karg.onrender.com/favorite/${id}/${authTokens.idUser}`)
      setFavorite(resfav.data)
    }catch{
      console.log("error")
    }
  }

  const addFavorite = async () =>{
    if(!isLoggedIn){
      toast.warning("Es necesario iniciar sesión")
    }else{
      setFavorite({ fav: true })      
      try{
        await axios.post(`https://blog-app-backend-karg.onrender.com/favorite`,{
          idPosts: id,
          UserId: authTokens.idUser
        })
        toast.success("El post fue agregado a tus favoritos")
      }catch{
        toast.warning("Error vuelva intentarlo")
      }
    }
  }

  const removeFavorite = async () => {
    try{
      await axios.delete(`https://blog-app-backend-karg.onrender.com/favoriteDelete/${authTokens.idUser}/${id}`)
      toast.success("El post fue elimando de tus favoritos")
      setFavorite({ fav: false })      

    }catch{
      toast.warning("Error vuelva intentarlo")
    }
  }

  const deletePost = async () =>{
    try{
      await axios.delete(`https://blog-app-backend-karg.onrender.com/deletePost/${id}`)
      toast.success("El post fue eliminado")
      window.location.replace("/")
    }catch{
      toast.warning("Ocurrio un error vuelve a intentarlo")
    }
  }
  
  const deleteComment =  (idComment: number) =>{
    try{
      axios.delete(`https://blog-app-backend-karg.onrender.com/deleteComment/${idComment}`)
      toast.success("Comentario eliminado correctamente")
      const filteredComments = postInfo.comments.filter(comment => comment.idComment !== idComment);
      setPostInfo({...postInfo, comments: filteredComments})

    }catch{
      toast.warning("Sucedio un error vuelve a intentarlo")
    }
  }
  const loadComment = () =>{
    fetchDataPost()
    setUploadPost(false)

  }
  return (
    <article className="border-[1px] m-auto  border-slate-600 shadow-md shadow-slate-800 hover:shadow-slate-700 hover:border-slate-300 max-lg:w-full max-md:w-full transition-all duration-300 py-4 px-6 bg-slate-800 h-max w-[38rem] my-4 flex flex-col justify-between rounded-lg">
      {uploadPost ? <BounceLoader className='m-auto' color='#379DFF'/>
      :<PostInfo loadComment={loadComment} postInfo={postInfo} favorite={favorite} authTokens={authTokens} openModal={openModal} isModalOpen={isModalOpen} addFavorite={addFavorite} removeFavorite={removeFavorite} deletePost={deletePost} closeModal={closeModal} idUser={Number(id)} deleteComment={deleteComment}/>
      }
    </article>
  )
}
