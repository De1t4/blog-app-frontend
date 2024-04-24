import axios from "axios";
import { Plus_Jakarta_Sans } from "next/font/google";
import { UserLogin } from "../interface/models";

export const fetchPosts = async () =>{
  try{
    const response = await axios.get('https://blog-app-backend-karg.onrender.com/getPosts')
    return response.data
  }catch{
    console.error("error");
  }
}

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