'use client'
import React, { useEffect, useState } from "react";
import Post from "./components/Post";
import { useAuthContext } from "../contexts/authContext";
import axios from "axios";
import { getUsers } from "./services/fetchApi";
import { toast } from "sonner";
import { UserCard } from "./components/Cards/UserCard";
import { UserList } from "./components/Cards/UserList";
import { CardPostUser } from "./components/Cards/CardPostUser";
import { TiArrowUpOutline } from "react-icons/ti";
import Link from "next/link";

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
  const [usersEntity, setUsersEntity] = useState<Users[]>([])
  const [prevDataUser, setPrevDataUser] = useState<Users[]>([])
  const [follow, setFollow] = useState<Users[]>([])
  const [visible, setVisible] = useState<boolean>(false);
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
      fetchUsers();
    }
    setUserState(isLoggedIn);
    window.addEventListener("scroll", toggleVisible);
  
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  
  }, [isLoggedIn]);
  
  const fetchUsers = async () =>{
    const fetchUsers:Users[] = await getUsers(authTokens?.idUser)
    setPrevDataUser(fetchUsers && fetchUsers.filter((user) => user.follow != 1 && user.id != authTokens.idUser))
    setUsersEntity(fetchUsers && fetchUsers.filter((user) => user.follow != 1 && user.id != authTokens.idUser)); 
    setFollow(fetchUsers && fetchUsers.filter((user) => user.follow == 1)) 
  }

  const fetchPostUser = async () =>{
    try{
      const response = await axios.get(`https://blog-app-backend-karg.onrender.com/getPostUser/${authTokens?.idUser}`)
      setMyPost(response.data)
    }catch{
      console.log("Error")
    }
  }

  const onFollow = (userData: Users) =>{
    try{
      axios.post(`https://blog-app-backend-karg.onrender.com/addNewFollower/${authTokens.idUser}/${userData.id}`);
      toast.success(`Está siguiendo al usuario ${userData.name}`);
      setPrevDataUser(prevDataUser.filter((a)=> a.id != userData.id))
      setFollow(follow.concat(usersEntity.filter((a)=> a.id == userData.id)))
      setUsersEntity(usersEntity.filter((a)=> a.id != userData.id))
    }catch{
      toast.warning("Sucedio un error vuelve a intentarlo")
    }
  }

  const onStopFollow = (userData:Users) =>{
    try{
      axios.delete(`https://blog-app-backend-karg.onrender.com/deleteFollower/${authTokens.idUser}/${userData.id}`)
      toast.success("El usuario fue removido de tus seguidores")
      setUsersEntity(usersEntity.concat(follow.filter((a)=> a.id == userData.id)))
      setFollow(follow.filter((a)=> a.id != userData.id))
    }catch{
      toast.warning("Sucedio un error vuelve a intentarlo")
    }
  }

  const updateSearchUser = (e:React.ChangeEvent<HTMLInputElement>) =>{
    e.preventDefault()
    const searchTerm = e.target.value.trim().toLowerCase();
    const userFind = searchTerm === "" ? prevDataUser : prevDataUser && prevDataUser.filter((data) => (data.name.concat(" ", data.lastname).toLowerCase().includes(searchTerm)));
    setUsersEntity(userFind);
  }

return (
  <div className="px-2 grid grid-cols-5 max-xl:grid-cols-3 max-lg:grid-cols-4 grid-rows-1 gap-8 flex-col m-auto w-full max-w-[1124px]  my-10]">
    {userState && (
      <CardPostUser myPost={myPost}/>
    )}
    <Post/>
    {userState &&
      <section className="max-h-[27.5rem] overflow-y-auto max-lg:hidden  w-full gap-y-8 max-lg:col-span-2 col-start-5 flex-col max-md:col-span-2 max-md:col-start-4 max-w-2xl  max-md:hidden  min-w-4xl scrollbar-thin scrollbar-track-slate-700 scrollbar-thumb-slate-400  scrollbar-thumb-rounded-full scrollbar-track-rounded-full ">
        <UserList title={"Personas que estas siguiendo"} users={follow} onStopFollow={onStopFollow}/>
        <UserCard title={"Buscar nuevos usuarios:"} users={usersEntity} onFollow={onFollow} updateSearchUser={updateSearchUser} />
      </section>
    }
    {visible && 
      <Link href="/#inicio" className=" bg-slate-500 items-center justify-center flex    w-10 rounded-full h-10 fixed right-5 bottom-5">
        <TiArrowUpOutline className=" scale-150"/>          
      </Link>
    }
  </div>
)
}
