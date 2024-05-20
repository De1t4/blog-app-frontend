'use client'
import React, { useEffect, useState } from "react";
import Post from "./components/Post";
import { useAuthContext } from "../contexts/authContext";
import axios from "axios";
import { getUsers } from "./services/fetchApi";
import { toast } from "sonner";
import { CardPostUser } from "./components/Cards/CardPostUser";
import { TiArrowUpOutline } from "react-icons/ti";
import Link from "next/link";
import ContentCards from "./components/ContentCards";

export interface MyPost{
  title: string
  id_posts: number
}
export interface Users {
  id: number
  name: string
  lastname: string
  email: string
  follow: number
}
export default function Page() {
  const [myPost, setMyPost] = useState<MyPost[]>()
  const { authTokens, isLoggedIn } = useAuthContext()
  const [userState, setUserState] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false);
  const [loadingMyPost, setLoadingMyPost] = useState<boolean>(false);


  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  useEffect(() => {
    if (authTokens?.idUser != null) {
      fetchPostUser();
    }
    setUserState(isLoggedIn);
    window.addEventListener("scroll", toggleVisible);
  
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  
  }, [isLoggedIn]);
  
  const fetchPostUser = async () =>{
    setLoadingMyPost(true)
    try{
      const response = await axios.get(`https://blog-app-backend-karg.onrender.com/getPostUser/${authTokens?.idUser}`)
      setMyPost(response.data)
    }catch{
      console.log("Error")
    }finally{
      setLoadingMyPost(false)
    }
  }

return (
  <div className="px-2 grid grid-cols-5 max-xl:grid-cols-3 max-lg:grid-cols-4 grid-rows-1 gap-8 flex-col m-auto w-full max-w-[1124px]  my-10]">
    {userState && (
      <CardPostUser loading={loadingMyPost} myPost={myPost}/>
    )}
    <Post/>
    {userState && (
      <ContentCards/>
     )}
    {visible && 
    <Link href="/#inicio" className=" border-slate-700 z-30 bg-slate-400 border-2 items-center justify-center flex animate-bounce w-10 rounded-full h-10 fixed right-5 bottom-5">
      <TiArrowUpOutline className=" scale-150"/>          
    </Link>
    }
  </div>
)
}
