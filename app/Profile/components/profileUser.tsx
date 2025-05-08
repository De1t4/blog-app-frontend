import React from 'react'
import { Jakarta } from '../../services/fetchApi'
import { Image } from '@nextui-org/react'

export const ProfileUser = ({ authTokens, dataUser }) => {
  return (
    <div className="mt-6 flex flex-col items-center leading-8 gap-2  w-2/5">
      {authTokens?.idUser != null && dataUser.id == authTokens.idUser && (
        <h1 className="text-3xl font-semibold text-[#328FFF] w-full text-center">Mi Perfil</h1>
      )}
      <p className="border bg-blue-100 shadow-md text-7xl text-blue-700 font-bold uppercase flex justify-center items-center w-32 h-32 rounded-full " >{authTokens.name.slice(0, 1)}</p>
      <p className={`font-bold text-xl font-sans ${Jakarta}`}>{dataUser.name} {dataUser?.lastname}</p>
      <p className={`font-semibold text-gray-400 ${Jakarta}`}>{dataUser?.email}</p>
      <hr className="my-2" />
      <p className={`font-semibold text-gray-300 ${Jakarta}`}> Siguiendo ({dataUser.follows != null ? dataUser.follows : "0"})</p>
      <p className={`font-semibold text-gray-300 ${Jakarta}`}>Seguidores ({dataUser.followMe != null ? dataUser.followMe : "0"})</p>
    </div>)
}
