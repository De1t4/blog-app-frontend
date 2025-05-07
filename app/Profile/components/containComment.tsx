import React from 'react'
import { Jakarta } from '../../services/fetchApi'
import { Comment } from './comment'

export const ContainComment = ({dataUser}) => {
  return (
    <li className="list-none">
      {dataUser.comments.length == 0 ? (
        <h1 className={`text-center font-semibold text-zinc-400 text-2xl mt-8 ${Jakarta}`}>
          No hay Comentarios
        </h1>
      ) : (
        dataUser.comments.map((comment, index) => (
          <Comment key={index} index={index} comment={comment.comment} title={comment.title}></Comment>
        ))
      )}
    </li>)
}
