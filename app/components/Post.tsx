import { useEffect, useState } from "react"
import React from "react";
import HeaderSearch from "./HeaderSearch";
import { Posts } from "../interface/models";
import axios from "axios";
import SkeletonPost from "./Skeletons/SkeletonPost";
import { toast } from "sonner";
import ButtonsFilter from "./ButtonsFilter";
import { CardsPost } from "./Cards/CardsPost";
import { fetchPosts } from "../services/fetchApi";
import NotFoundImage from "./notFoundImage";
import { setItem } from "../services/useLocalStorage";

export default function Post() {
  const [postData, setPostData] = useState<Posts[]>()
  const [search, setSearch] = useState("")
  const [option, setOption] = useState("all")
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPost, setCurrentPost] = useState(0);
  const [sort, setSort] = useState(false)

  const INICIO = 0;
  const FIN = 5 + currentPost;  
  useEffect(()=>{
    if (localStorage.getItem("post")) {
      setLoading(false)
      setPostData(JSON.parse(localStorage.getItem("post")));
    }
    fetchDataPost();
  },[])

  const fetchDataPost = async () =>{
    try{
      const data:Posts[] = await fetchPosts()
      setPostData(data)
      if(data != null){
        setItem("post", data)
      }
    }catch{
      console.error("error");
    }finally{
      setLoading(false)
    }   
  }

  const updateSelect = (e:React.ChangeEvent<HTMLSelectElement>) =>{
    setOption(e.target.value)
  }

  const updateSearch = (e:React.ChangeEvent<HTMLInputElement>)=>{
      setSearch(e.target.value)
  }

  const filterPostsData = ():Posts[] =>{
    let dataPosts = postData

    if(postData){
    
      if(option !== "all"){
        dataPosts = dataPosts.filter((a)=> a.type === option)
      }
  
      if(search !== ""){
        dataPosts = dataPosts.filter((a)=> a.title.toLowerCase().includes(search.toLowerCase()))
      }

      if(sort){
        dataPosts = dataPosts.sort((a, b)=> new Date(a.datePosts).getTime() - new Date(b.datePosts).getTime())
      }else{
        dataPosts = dataPosts.sort((a, b)=> new Date(b.datePosts).getTime() - new Date(a.datePosts).getTime())
      }
  
    }
    return dataPosts
  }



  const viewMorePosts = () =>{
    if(postData.length > currentPost){
      setCurrentPost(currentPost+5)
    }else{
      toast.warning("Ya no hay mas posts")
    }
  }
  
  const orderPostsNew = () =>{
    setSort(false)
  } 

  const orderPostsOld = () =>{
    setSort(true)
  }

  const reloadData =  () => {
    fetchDataPost();
  };


  return (
    <div className=" max-md:col-span-4 max-lg:col-span-4 col-span-3 col-start-2 max-xl:col-start-1">
      <HeaderSearch updateSearch={updateSearch} updateSelect={updateSelect}></HeaderSearch>
      <ButtonsFilter orderPostsOld={orderPostsOld} orderPostsNew={orderPostsNew}/>
      <section className="w-full flex flex-col  items-center  ">
      {loading && <SkeletonPost/> }
      { filterPostsData() && filterPostsData().slice(INICIO,FIN).map((post, index)=>(
        <CardsPost key={post.id} post={post} index={index} reloadData={reloadData} />
      ))}
     {!loading && <button onClick={viewMorePosts} className={`mt-4 w-40 bg-gold p-2 rounded-lg font-semibold  transition-all duration-300 hover:brightness-75 ${(postData != null && filterPostsData().length <= FIN) && 'hidden'}`}>Mostrar más</button>}
      {postData && filterPostsData().length == 0 &&  <><NotFoundImage/> <p className=" text-2xl text-zinc-200 font-semibold">El post no fue encontrado</p></>}      
      </section>                
    </div>
  )
}
