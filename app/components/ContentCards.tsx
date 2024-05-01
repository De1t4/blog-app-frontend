import React, { useEffect, useState } from 'react';
import { UserList } from './Cards/UserList';
import { UserCard } from './Cards/UserCard';
import axios from "axios";
import { Users } from '../page';
import { toast } from 'sonner';
import { useAuthContext } from '../../contexts/authContext';
import { getUsers } from '../services/fetchApi';

const API_REQUEST = "https://blog-app-backend-karg.onrender.com"

const ContentCards = () => {
  const [usersEntity, setUsersEntity] = useState<Users[]>([])
  const [prevDataUser, setPrevDataUser] = useState<Users[]>([])
  const [loadingFollowing, setLoadingFollowing] = useState(true)
  const [follow, setFollow] = useState<Users[]>([])
  const { authTokens } = useAuthContext()

  useEffect(()=>{
    if (authTokens?.idUser != null) {
      fetchUsers();
    }  
  },[])

  const fetchUsers = async () =>{
    setLoadingFollowing(true)
    try{
      const fetchUsers:Users[] = await getUsers(authTokens?.idUser)
      setPrevDataUser(fetchUsers && fetchUsers.filter((user) => user.follow != 1 && user.id != authTokens.idUser))
      setUsersEntity(fetchUsers && fetchUsers.filter((user) => user.follow != 1 && user.id != authTokens.idUser)); 
      setFollow(fetchUsers && fetchUsers.filter((user) => user.follow == 1))
    }catch(error:any){
      console.log(error)
    }finally{
      setLoadingFollowing(false)
    }
  }

  const onStopFollow = (userData:Users) =>{
    try{
      axios.delete(`${API_REQUEST}/deleteFollower/${authTokens.idUser}/${userData.id}`)
      toast.success("El usuario fue removido de tus seguidores")
      setUsersEntity(usersEntity.concat(follow.filter((a)=> a.id == userData.id)))
      setFollow(follow.filter((a)=> a.id != userData.id))
    }catch{
      toast.warning("Sucedio un error vuelve a intentarlo")
    }
  }

  const onFollow = (userData: Users) =>{
    try{
      axios.post(`${API_REQUEST}/addNewFollower/${authTokens?.idUser}/${userData.id}`);
      toast.success(`Está siguiendo al usuario ${userData.name}`);
      setPrevDataUser(prevDataUser.filter((a)=> a.id != userData.id))
      setFollow(follow.concat(usersEntity.filter((a)=> a.id == userData.id)))
      setUsersEntity(usersEntity.filter((a)=> a.id != userData.id))
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
    <section className="max-h-[27.5rem] overflow-y-auto max-lg:hidden  w-full gap-y-8 max-lg:col-span-2 col-start-5 flex-col max-md:col-span-2 max-md:col-start-4 max-w-2xl  max-md:hidden  min-w-4xl scrollbar-thin scrollbar-track-slate-700 scrollbar-thumb-slate-400  scrollbar-thumb-rounded-full scrollbar-track-rounded-full ">
      <UserList loading={loadingFollowing} title={"Personas que estas siguiendo"} users={follow} onStopFollow={onStopFollow}/>
      <UserCard loading={loadingFollowing} title={"Buscar nuevos usuarios:"} users={usersEntity} onFollow={onFollow} updateSearchUser={updateSearchUser} />
     </section>
  );
}

export default ContentCards;
