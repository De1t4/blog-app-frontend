import React, { useState } from 'react'
import { IoMdSend } from 'react-icons/io'
import axios from "axios";
import { toast } from "sonner";
import { useAuthContext } from '../../../contexts/authContext';


export const FormComment = ( {id} ) => {
  const { isLoggedIn, authTokens } = useAuthContext();
  const [formUser, setFormUser] = useState({
    comment:""
  });
  
  const updateComment = (value: React.ChangeEvent<HTMLInputElement>) => {
    setFormUser({ ...formUser, comment: value.target.value });
  };

  const registerComment = async (e: React.FormEvent, idPosts: number) => {
    e.preventDefault();

    if (!isLoggedIn) {
      toast.warning('Es necesario iniciar sesión');
    } else {
      if (formUser.comment === '') {
        toast.warning('Ingresar texto');
      } else {
        try {
          // Envía el comentario a través de una solicitud HTTP
          await axios.post(`https://blog-app-backend-karg.onrender.com/createComment/${idPosts}`, {
            idUser: authTokens?.idUser,
            comment: formUser.comment
          });
          setFormUser({ comment: '' });
          toast.success('Comentario creado');
          (e.target as HTMLFormElement).reset();
        } catch (error) {
          // Maneja errores de la solicitud HTTP
          console.error('Error al enviar comentario:', error);
          toast.error('Error al enviar comentario');
        }
      }
    }
  };

  return (
    <form onSubmit={(e) => registerComment(e, id)}>
      <div className="w-full h-full relative flex justify-center items-center z-10 my-2">
        <input minLength={10} name='textComment' id='textComment'  maxLength={255} onChange={updateComment} type="text"  className=" bg-slate-600 w-full text-zinc-100 py-2 px-4 rounded-lg outline-1  outline-zinc-700 text-sm " placeholder="Escribe tu comentario"/>
        <button className="text-zinc-100 absolute right-4 " type="submit"><IoMdSend className=""></IoMdSend></button>
      </div>
    </form>
  )
}
