import { useState } from "react"
import { FormComment } from "../Forms/FormComment"
import ButtonViewComments from "./CardPostComponents/ButtonViewComments"
import CommentPost from "./CardPostComponents/CommentPost"
import ContentPost from "./CardPostComponents/ContentPost"
import ProfilePost from "./CardPostComponents/ProfilePost"
import { Posts } from "../../interface/models"
import { toast } from "sonner"
import axios from "axios";

interface CardPostProps{
  post: Posts
  index:number
  reloadData: () => void
}

export const CardsPost:React.FC<CardPostProps> = ({post, index, reloadData}) => {
  const [visibleComments, setVisibleComments] = useState<boolean[]>([]);

  const deleteComment = async (idComment: number) => {
    try {
      await axios.delete(`https://blog-app-backend-karg.onrender.com/deleteComment/${idComment}`);
      toast.success("Comentario eliminado correctamente");
      reloadData()
    } catch (error) {
      console.error("Error al eliminar el comentario:", error);
      toast.warning("Ocurrió un error, por favor intenta de nuevo");
    }
  };

  const toggleComments = (index:number) => {
    setVisibleComments(prevVisibleComments => {
      const updatedVisibleComments = [...prevVisibleComments];
      updatedVisibleComments[index] = !updatedVisibleComments[index];
      return updatedVisibleComments;
    });
  };

  const editComment = (idComment:number) =>{
    alert(idComment)
  }

  return (
    <>
      <article key={index} className=" border-[1px] max-md:p-4  border-slate-600 shadow-md shadow-slate-800 hover:shadow-slate-700 hover:border-slate-300 max-lg:w-full transition-all duration-300 py-4 px-6 bg-gradient-to-tl from-slate-950 to-slate-800 h-min-72 w-full my-4 flex flex-col justify-between rounded-lg">
        <ProfilePost id={post.idUser} name={post.name} datePosts={post.datePosts} type={post.type}/>
        <ContentPost id={post.id} picture={post.picture} content={post.content} title={post.title}/>
        <ButtonViewComments toggleComments={toggleComments} index={index} length={post.comments.length}/>
        <FormComment id={post.id} loadComment={reloadData}/>
          {visibleComments[index] && 
            <>
              <ol>
                {
                  post.comments.map((comment)=>(
                    <CommentPost key={comment.idComment} name={comment.name} idUser={comment.idUser} lastname={comment.lastname} email={comment.email} idComment={comment.idComment} editComment={editComment} deleteComment={deleteComment} content={comment.content} dateComment={comment.dateComment}/>
                  ))
                }
              </ol>
              {
                post.comments.length == 0 && <p className=" text-center mt-2 font-semibold text-zinc-200 ">No hay comentarios</p>
              }
            </>
          }
      </article>
    </>
  )
}
