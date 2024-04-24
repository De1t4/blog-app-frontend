import Link from 'next/link'
import React from 'react'
import { UserProfile } from '../interface/models'
import { AuthTokens } from '../../contexts/authContext'

interface UserProfileProps {
  dataUser: UserProfile
  authTokens: AuthTokens
  Jakarta: string
  viewData: boolean
  fetchComments: () => void
  fetchPosts: () => void
}

export const UserProfileInfo:React.FC<UserProfileProps> = ({ dataUser, authTokens, Jakarta, viewData, fetchComments, fetchPosts })=>{
  return (
    <>
      <div className="mt-6 flex flex-col items-center leading-[1.75rem]">
        {authTokens?.idUser != null && dataUser.id == authTokens.idUser && (
          <h1 className="text-3xl font-semibold text-[#328FFF] w-full text-center">Mi Perfil</h1>
        )}
        
        <img className="my-4 rounded-full w-32"
          src={`https://i.pravatar.cc/100?img=${dataUser.name}`}
          alt="" />
        <p className={`font-bold text-xl font-sans ${Jakarta}`}>{dataUser.name} {dataUser?.lastname}</p>
        <p className={`font-semibold text-gray-400 ${Jakarta}`}>{dataUser?.email}</p>
        <hr className="my-2" />
        <p className={`font-semibold text-gray-300 ${Jakarta}`}> Siguiendo ({dataUser.follows != null ? dataUser.follows : "0"})</p>
        <p className={`font-semibold text-gray-300 ${Jakarta}`}>Seguidores ({dataUser.followMe != null ? dataUser.followMe : "0"})</p>
      </div>
      <div className="w-full mt-8 ml-4 max-md:ml-0">
        <span className="flex max-md:justify-center transition-all duration-300">
          <h1
            className={` font-semibold cursor-pointer mr-4 ${
              viewData ? "text-zinc-500" : " text-zinc-200"
            }`}
            onClick={fetchComments}
          >
            Comentarios({dataUser.comments.length})
          </h1>
          <h1
            className={`font-semibold cursor-pointer ${
              viewData ? "text-zinc-200" : " text-zinc-500"
            }`}
            onClick={fetchPosts}
          >
            Posts({dataUser.posts.length})
          </h1>
        </span>
        <hr className="mt-4" />
        {viewData ? (
          <li className="list-none">
            {dataUser.posts.length == 0 ? (
              <h1 className={`text-center font-semibold text-zinc-400 text-2xl mt-8 ${Jakarta}`}>
                No hay Posteos
              </h1>
            ) : (
              dataUser.posts.map((post, index) => (
                <Link href={`/SinglePost/${post.id_posts}`} key={index}>
                  <ul
                    className="hover:bg-slate-600 transition-all duration-300 rounded-lg cursor-pointer px-2"
                    key={index}
                  >
                    <h1 className={`mt-2 font-semibold text-zinc-100  overflow-hidden text-ellipsis whitespace-nowrap ${Jakarta}`}>{post.title}</h1>
                    <p className="font-semibold text-sm text-zinc-400">{post.content}</p>
                  </ul>
                </Link>
              ))
            )}
          </li>
        ) : (
          <li className="list-none">
            {dataUser.comments.length == 0 ? (
              <h1 className={`text-center font-semibold text-zinc-400 text-2xl mt-8 ${Jakarta}`}>
                No hay Comentarios
              </h1>
            ) : (
              dataUser.comments.map((comment, index) => (
                <Link href={`/SinglePost/${comment.posts_id}`} key={index}>
                  <ul
                    className="hover:bg-slate-600 transition-all duration-300 rounded-lg cursor-pointer px-2"
                    key={index}
                  >
                    <h1 className={`mt-2 font-semibold text-zinc-100  overflow-hidden text-ellipsis whitespace-nowrap ${Jakarta}`}>{comment.title}</h1>
                    <p className="font-semibold text-sm text-zinc-400">{comment.comment}</p>
                  </ul>
                </Link>
              ))
            )}
          </li>
        )}
      </div>
    </>
  )
}
