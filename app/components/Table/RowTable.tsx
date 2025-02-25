import React, { FC } from 'react';
import { calculeDate } from '../../services/fetchApi';
import { VscHeartFilled } from 'react-icons/vsc';
import Link from 'next/link';
import { Favorite } from '../../interface/models';

interface PropsRowTable{
  index:number;
  favorite: Favorite
  removeFavorite:  (idPosts: number) => void
}

const RowTable:React.FC<PropsRowTable> = ({index, favorite, removeFavorite}) => {
  return (
    <>
        <td className='p-4 font-semibold'>{index+1}</td>
        <td className='p-4 font-semibold'><Link href={`/SinglePost/${favorite.idPosts}`}>{favorite.title}</Link></td>
        <td className='p-4 font-semibold'>{calculeDate(favorite.date)}</td>
        <td onClick={() => removeFavorite(favorite.idPosts)} className='p-4 font-semibold items-center flex justify-center'><VscHeartFilled className="cursor-pointer text-3xl border-2 bg-red-100 text-red-600 rounded-lg p-1 hover:brightness-90 transition-all duration-200" />    </td>
    </>
  );
}

export default RowTable;
