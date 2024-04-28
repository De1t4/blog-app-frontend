'use client'
import axios from "axios";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Posts, UserLogin } from "../interface/models";
import { useEffect, useState } from "react";

const API_REQUEST = "https://blog-app-backend-karg.onrender.com"

// export function fetchPostID(id:string | string[]){
//   const [dataPost, setDataPost] = useState<Posts>();
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState(null);
//     setLoading(true)
//     useEffect(()=>{
//       fetch(`${API_REQUEST}/getPosts/${id}`)
//       .then((response) => response.json())
//       .then((data) => setDataPost(data.data))
//       .catch((error)=> setError(error))
//       .finally(() => setLoading(false))
//     },[id])
//   return {dataPost, loading, error}
// }

// export function fetchPosts(){
//   const [data, setData] = useState<Posts[]>();
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState(null);
//   useEffect(()=>{
//     setLoading(true)
//       axios.get(`${API_REQUEST}/getPosts`)
//       .then((response) => setData(response.data))
//       .catch((error)=> setError(error))
//       .finally(() => setLoading(false))
//   },[])

//   return {data, loading, error}
// }

export const fetchPostSingle = async (id: number) =>{
  try{
    const response = await axios.get(`https://blog-app-backend-karg.onrender.com/getPosts/${id}`)
    return response.data
  }catch{
    console.log("error no encontrado")
    return "error"
  }
}


export async function loginUser(
  data: UserLogin
){
    const response = await axios
    .post("https://blog-app-backend-karg.onrender.com/loginUser", {
      email: data.email,
      password: data.password,
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    });
    return response
}


export const calculeDate = (fechaISO:any) =>{
  const fecha = new Date(fechaISO);

  const dia = fecha.getDate();
  const mes = fecha.toLocaleString('es-ES', { month: 'long' }); // Obtener el nombre del mes
  const año = fecha.getFullYear();

  const fechaFormateada = `${mes} ${dia} de ${año}`;
  return fechaFormateada
}

export const getUsers = async (idUser:number) =>{
  try{
    const response = await axios.get(`https://blog-app-backend-karg.onrender.com/usersData/${idUser}`)
    return response.data
  }catch{
     return console.log("ERROR USUARIOS NO ENCONTRADOS")
  }
}

export const Jakarta = Plus_Jakarta_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
})