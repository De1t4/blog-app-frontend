import React, { useState } from 'react';
import Input from '../Input';
import axios from "axios";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { toast } from 'sonner';

interface IUser{
  name: string,
  lastname: string
  email: string
  password: string
  passwordRepeat?: string
}

const API = "https://blog-app-backend-karg.onrender.com"
const FOUND_USER:number = 302

const FormRegister = ({closeModal, changeForm}) => {
  const [userData, setUserData] = useState<IUser>()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const InitialFormUser: IUser = {
    name: "",
    lastname: "",
    email: "",
    password: ""
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    if(userData.password !== userData.passwordRepeat){
      setError("Verificar contraseñas ingresadas")
    }else{
      setError("")
      const editUser: IUser = {
        name: userData.name,
        lastname: userData.lastname,
        email: userData.email,
        password: userData.password
      }
      

      registerUser(editUser)
    }
  }

  const registerUser = async (editUser: IUser) =>{
    setLoading(true)
    try{
      await axios.post(`${API}/createUser`, editUser)
      closeModal()
    }catch(error: any){
      if(error.response.status === FOUND_USER){
        setError("El email ingresado ya existe")
      }
    }finally{
      setLoading(false)
    }
  }

  /* VERIFICAR POR QUE NO REGISTRA FAVORITOS CON LOS NUEVOS USUARIOS*/
  return (
    <div className="relative">
    <h2  className="text-3xl mb-4">Register</h2>

    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-5">
        <Input type={"text"} name={"name"} info={"Ingresar Nombre"} label={"Nombre:"} fetchData={handleChangeInput}/>
        <Input type={"text"} name={"lastname"} info={"Ingresar Apellido"} label={"Apellido:"} fetchData={handleChangeInput}/>
      </div>
      <div className="mt-2">
        <Input type={"email"} info={"Ingresar Email"} name={"email"} label={"Email:"} fetchData={handleChangeInput}/>
      </div>
      <div className="mt-2">
        <Input type={"password"} info={"************"} name={"password"} label={"Contraseña:"} fetchData={handleChangeInput}/>
      </div>
      <div className="mt-2">
        <Input type={"password"} info={"************"} name={"passwordRepeat"} label={"Repetir Contraseña"} fetchData={handleChangeInput}/>
      </div>
      <div className="mt-2">
        <button className="w-full bg-[#F3BF3A] py-2 text-center text-black font-bold rounded-lg flex justify-center items-center">{loading && <AiOutlineLoading3Quarters className='mr-2 animate-spin'/>}  Register Now</button>
      </div>
      <p className='text-red-600 font-bold text-sm'>{error}</p>
      <p className='mt-4 border-b-2  w-max cursor-pointer font-semibold' onClick={changeForm}>Ya estoy registrado</p>
    </form>
   </div>
  );
}

export default FormRegister;
