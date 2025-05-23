import React, { FC } from 'react'
import { VscClose, VscHeart, VscHeartFilled } from 'react-icons/vsc'
import Link from 'next/link'
import { Modal } from './Modal'
import { Favorite } from '../SinglePost/[id]/page'
import { FormComment } from './Forms/FormComment'
import { Posts } from '../interface/models'
import CommentPost from './Cards/CardPostComponents/CommentPost'
import NotFoundImage from './notFoundImage'
import { ButtonHome } from './Button/Buttons'
import ContentPost from './Cards/CardPostComponents/ContentPost'
import { AuthTokens } from '../interface/auth.model'

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
  isLoggedIn: boolean
}

export const  PostInfo:React.FC<PostInfoProps> = ({loadComment, postInfo, favorite, authTokens, openModal, isModalOpen, addFavorite, removeFavorite, deletePost, closeModal, idUser, deleteComment, isLoggedIn}) =>{

  const editComment = (idComment: number) =>{
    alert(idComment)
  }
  if (!postInfo) {
    return (
      <div className='flex flex-col justify-center items-center'>
        <h1 className="text-zinc-100 font-semibold text-lg text-center">El post no fue encontrado</h1>
        <NotFoundImage />
        <ButtonHome />
      </div>
    );
  }

  return (
    <>
      <section className="w-full">
        {isLoggedIn && (
          <div className="flex justify-between">
            {favorite?.fav ? (
              <VscHeartFilled
                onClick={removeFavorite}
                className="text-red-700 text-2xl cursor-pointer"
              />
            ) : (
              <VscHeart
                onClick={addFavorite}
                className="text-red-700 text-2xl cursor-pointer"
              />
            )}
            {authTokens?.idUser === postInfo.idUser && (
              <VscClose
                onClick={openModal}
                className="text-zinc-100 text-2xl cursor-pointer"
              />
            )}
          </div>
        )}
        <div className="mb-4 border-2 border-transparent">
          <ContentPost
            id={postInfo.id}
            picture={postInfo.picture}
            content={postInfo.content}
            title={postInfo.title}
          />
          {postInfo.comments.map((comment) => (
            <ol key={comment.idComment}>
              <CommentPost
                name={comment.name}
                editComment={editComment}
                idUser={comment.idUser}
                lastname={comment.lastname}
                email={comment.email}
                idComment={comment.idComment}
                deleteComment={deleteComment}
                content={comment.content}
                dateComment={comment.dateComment}
              />
            </ol>
          ))}
        </div>
        <FormComment id={idUser} loadComment={loadComment}/>
        <Link
          href="/"
          className="bg-slate-700 text-zinc-100 w-40 text-center rounded-lg h-8 flex items-center justify-center m-auto mt-4 font-semibold"
        >
          Volver al Inicio
        </Link>
      </section>

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
