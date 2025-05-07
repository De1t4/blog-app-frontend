import React from 'react'
import { Jakarta } from '../../services/fetchApi'

export const ProfileUser = ({authTokens, dataUser}) => {
  return (
    <div className="mt-6 flex flex-col items-center leading-[1.75rem]  w-2/5">
      {authTokens?.idUser != null && dataUser.id == authTokens.idUser && (
        <h1 className="text-3xl font-semibold text-[#328FFF] w-full text-center">Mi Perfil</h1>
      )}

      <img className="my-4 rounded-full w-32"
        src={`https://api.multiavatar.com/${dataUser.id}.png`}
        alt="" />
      <p className={`font-bold text-xl font-sans ${Jakarta}`}>{dataUser.name} {dataUser?.lastname}</p>
      <p className={`font-semibold text-gray-400 ${Jakarta}`}>{dataUser?.email}</p>
      <hr className="my-2" />
      <p className={`font-semibold text-gray-300 ${Jakarta}`}> Siguiendo ({dataUser.follows != null ? dataUser.follows : "0"})</p>
      <p className={`font-semibold text-gray-300 ${Jakarta}`}>Seguidores ({dataUser.followMe != null ? dataUser.followMe : "0"})</p>
    </div>)
}
