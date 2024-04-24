import React, { FC } from 'react'
import { VscClose, VscHeart, VscHeartFilled } from 'react-icons/vsc'
import { CommentUser } from './CommentUser'
import Link from 'next/link'
import { Modal } from './Modal'
import { Favorite } from '../SinglePost/[id]/page'
import { AuthTokens } from '../../contexts/authContext'
import { FormComment } from './FormComment'
import { toast } from 'sonner'
import { Posts } from '../interface/models'

interface PostInfoProps {
  loadComment: () => void;
  postInfo: Posts;
  favorite: Favorite | undefined;
  authTokens: AuthTokens; 
  openModal: () => void;
  isModalOpen: boolean;
  addFavorite: () => void;
  removeFavorite: () => void;
  deletePost: () => void;
  closeModal: () => void;
  idUser: number
  deleteComment: (idComment: number) => void;
}

export const  PostInfo:React.FC<PostInfoProps> = ({loadComment, postInfo, favorite, authTokens, openModal, isModalOpen, addFavorite, removeFavorite, deletePost, closeModal, idUser, deleteComment}) =>{


  return (
    <>
      {postInfo != undefined ? (
        <div className="w-full">
          <div className="flex justify-between">
            {favorite?.fav ? (
              <VscHeartFilled
                onClick={removeFavorite}
                className="text-red-700 text-2xl text-end cursor-pointer"
              />
            ) : (
              <VscHeart onClick={addFavorite} className="text-red-700 text-2xl text-end cursor-pointer" />
            )}
            {authTokens != null && authTokens.idUser == postInfo.idUser && (
              <VscClose onClick={openModal} className="text-zinc-100 text-2xl text-end cursor-pointer" />
            )}
          </div>
          <h1 className="text-[#F1F1E6] text-xl text-center font-semibold">{postInfo.title}</h1>
          <p className="text-zinc-100 my-4 max-md:text-sm">{postInfo.content}</p>

          <hr className='mb-4'/>
          <span className="flex flex-col justify-center items-center">
            {postInfo.picture != "" && (
              <img
                src={`${postInfo.picture}`}
                className="rounded-lg mt-4"
                alt={`picture-${postInfo.picture}`}
                width={500}
                height={400}
              />
            )}
          </span>
          {postInfo && postInfo.comments.map((comment, index) => (
            <ol key={comment.idComment}>
              <CommentUser deleteComment={deleteComment} key={index} dataComment={comment} />
            </ol>
          ))}
          <FormComment id={idUser} loadComment={loadComment}/>
          <Link href="/" className="bg-slate-700 text-zinc-100 w-40 text-center rounded-lg h-8 flex items-center justify-center m-auto mt-4 font-semibold">
            Volver al Inicio
          </Link>
        </div>
      ) : (
        <>
          <h1 className="text-zinc-100 font-semibold text-lg text-center">El post no fue encontrado</h1>
          <Link
            href="/"
            className="bg-slate-700 text-zinc-100 w-20 text-center rounded-lg h-8 flex items-center justify-center m-auto mt-4 font-semibold"
          >
            Atras
          </Link>
        </>
      )}

      <Modal stateModal={isModalOpen}>
        <section className="flex flex-col border-2 border-blue-800  items-center justify-center transition-all duration-300 w-96 modal-content bg-slate-950  shadow-xl shadow-[#0a2170] text-white rounded-lg  p-6  max-md:w-4/5 h-96">
          <h2 className="text-3xl text-center mb-4 text-[#f0f3ff] font-bold">Eliminar Post</h2>
          <p>
            ¿Estás seguro de que deseas eliminar este post? Ten en cuenta que esta acción también eliminará los comentarios y los marcadores de favoritos asociados a este post. Esta acción no se puede deshacer. Por favor, confirma la eliminación solo si estás seguro.
          </p>
          <span className="flex justify-between gap-2">
            <button onClick={deletePost} className="font-semibold border-2 p-2 w-40 mt-4 text-red-500 border-red-500 rounded-lg">
              Eliminar
            </button>
            <button onClick={closeModal} className="font-semibold border-2 p-2 w-40 mt-4 text-blue-800 border-blue-800 rounded-lg">
              Atras
            </button>
          </span>
        </section>
      </Modal>
    </>  
  )
}
