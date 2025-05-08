import React, { useRef, useState } from 'react';
import Input from '../Input';
import { UserLogin } from '../../interface/models';
import { toast } from 'sonner';
import axios from "axios";
import { useAuthContext } from '../../../contexts/authContext';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa6';

const FormLogin = ({ closeModal, changeForm }) => {
  const [stateLogin, setStateLogin] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const { login } = useAuthContext()
  const formRef = useRef(null);
  const [warning, setWarning] = useState(false)
  const [formUser, setFormUser] = useState<UserLogin>({
    email: "",
    password: ""
  });

  const updateEmail = (value: React.ChangeEvent<HTMLInputElement>) => {
    setFormUser({ ...formUser, email: value.target.value });
  };

  const updatePassword = (value: React.ChangeEvent<HTMLInputElement>) => {
    setFormUser({ ...formUser, password: value.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formUser.password === "" || formUser.password === "") {
      toast.error("Completar todos los campos");
      setWarning(true)
      setStateLogin(false)
    } else {
      try {
        setWarning(false)
        setLoading(true)
        const response = await axios.post("https://blog-app-backend-karg.onrender.com/loginUser", {
          email: formUser.email,
          password: formUser.password,
        });
        if (response.status === 200) {
          setStateLogin(false)
          const tokens = response.data;
          toast.success("Los datos son correctos");
          setFormUser({ ...formUser, email: "", password: "" })
          login(tokens)
          formRef.current.reset();
          closeModal()
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response.status === 400) {
            setStateLogin(true)
          }
        } else {
          console.error("Error desconocido:", error);
        }
      } finally {
        setLoading(false)
      }
    }
  };

  return (
    <div className="relative">
      <h2 className="text-3xl mb-4">Iniciar Sesión</h2>
      <p className="mb-4">
        Ingresa tus datos para iniciar sesión.
      </p>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="mt-4 ">
          <Input fetchData={updateEmail} type={"email"} info={"Ingresar Email"} name={"email"} label={"Email:"} />
        </div>
        <div className="mt-4">
          <Input fetchData={updatePassword} type={"password"} info={"************"} name={"password"} label={"Password:"} />
        </div>
        <div className="my-4">
          <button disabled={loading} className="w-full disabled:cursor-not-allowed bg-gold py-2 text-center text-black font-bold rounded-lg flex items-center justify-center">{loading && <AiOutlineLoading3Quarters className='mr-2 animate-spin' />} Iniciar Sesión</button>
        </div>
        {stateLogin && (<p className=' text-red-600 font-bold text-sm'>La Contraseña o el Usuario son Incorrectos</p>)}
        {warning && (<p className=' text-red-600 font-bold text-sm'>Ingresar los datos faltantes</p>)}
        <p className='mt-4 border-b-2  w-max cursor-pointer font-semibold' onClick={changeForm}>Quiero Registrame</p>
      </form>
      <div className=" flex justify-center gap-8 mt-4 text-xl ">
        <FaFacebook className=' hover:scale-105 transition-all duration-300 cursor-pointer' />
        <FaTwitter className=' hover:scale-105 transition-all duration-300 cursor-pointer' />
        <FaInstagram className=' hover:scale-105 transition-all duration-300 cursor-pointer' />
      </div>
    </div>
  );
}

export default FormLogin;
