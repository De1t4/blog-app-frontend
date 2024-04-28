'use client'
import { useEffect, useState } from "react"
import React from "react";
import HeaderSearch from "./HeaderSearch";
import { Posts } from "../interface/models";
import axios from "axios";
import SkeletonPost from "./Skeletons/SkeletonPost";
import { toast } from "sonner";
import ButtonsFilter from "./ButtonsFilter";
import { CardsPost } from "./Cards/CardsPost";
import { setItem } from "../services/useLocalStorage";

export default function Post() {
  const [postData, setPostData] = useState<Posts[]>(null)
  const [search, setSearch] = useState("")
  const [option, setOption] = useState("")
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredData, setFilteredData] = useState<Posts[]>(postData);

  useEffect(()=>{
    if (localStorage.getItem("post")) {
      setPostData(JSON.parse(localStorage.getItem("post")));
      setFilteredData(JSON.parse(localStorage.getItem("post")));
      setLoading(false)
    } else {
      fetchDataPost();
    } 
  },[])
  

  const fetchDataPost = async () =>{
      try{
        const response = await axios.get('https://blog-app-backend-karg.onrender.com/getPosts')
        setPostData(response.data)
        setFilteredData(response.data)
        setItem("post", response.data)
      }catch{
        console.error("error");
      }finally{
        setLoading(false)
      }   
  }

  const updateSelect = (e:React.ChangeEvent<HTMLSelectElement>) =>{
    setOption(e.target.value)
    filterData(e.target.value, search)
  }

  const updateSearch = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setSearch(e.target.value)
    filterData(option, e.target.value)
  }

  const filterData = (option:string, search:string) =>{
    const filterPosts = option === "Todos" ? postData && postData.filter((post)=> post.title.toLowerCase().includes(search.toLowerCase())) 
    : postData && postData.filter((post)=>
    post.type.toLowerCase().includes(option.toLowerCase()) &&
    post.title.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredData(filterPosts)
  }
  
  const orderPostsNew = () =>{
    setFilteredData((prevData) => [...prevData].sort((a, b) => new Date(b.datePosts).getTime() - new Date(a.datePosts).getTime())
  );
  }
  const orderPostsOld = () =>{
    setFilteredData((prevData) => [...prevData].sort((a, b) => new Date(a.datePosts).getTime() - new Date(b.datePosts).getTime()));
  }

  const deleteComment = async (idComment: number) => {
    try {
      await axios.delete(`https://blog-app-backend-karg.onrender.com/deleteComment/${idComment}`);
      toast.success("Comentario eliminado correctamente");
      const filteredPosts = filteredData?.map(post => {
        const filteredComments = post.comments.filter(comment => comment.idComment !== idComment);
        return { ...post, comments: filteredComments };
      });
      setFilteredData(filteredPosts);
    } catch (error) {
      console.error("Error al eliminar el comentario:", error);
      toast.warning("Ocurrió un error, por favor intenta de nuevo");
    }
  };
  return (
    <div className=" max-md:col-span-4 max-lg:col-span-4 col-span-3 col-start-2 max-xl:col-start-1">
      <HeaderSearch updateSearch={updateSearch} updateSelect={updateSelect}></HeaderSearch>
      <ButtonsFilter orderPostsOld={orderPostsOld} orderPostsNew={orderPostsNew}/>
      <section className="w-full flex flex-col  items-center  ">
      {loading && <SkeletonPost/> }
      { filteredData?.map((post, index)=>(
        <CardsPost key={post.id} post={post} index={index} deleteComment={deleteComment}/>
      ))}

     {/* : <><NotFoundImage/> <p className=" text-2xl text-zinc-200 font-semibold">El post no fue encontrado</p></> */}
      
      </section>                
    </div>
  )
}
