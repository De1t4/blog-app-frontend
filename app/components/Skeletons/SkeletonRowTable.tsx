import React from 'react';
import { VscHeartFilled } from 'react-icons/vsc';

const SkeletonRowTable = () => {
  return (
    <>
          <tr className='bg-slate-800'>
            <td className='p-4 font-semibold animate-pulse'>
              <p className='w-4 h-4 rounded-md  bg-slate-600'></p>
            </td>
            <td className='p-4 font-semibold animate-pulse'>
              <p className='w-full h-4 rounded-md  bg-slate-600'></p>
            </td>
            <td className='p-4 font-semibold animate-pulse'>
              <p className='w-full h-4 rounded-md  bg-slate-600'></p>
            </td>
            <td className='p-4 font-semibold items-center flex justify-center animate-pulse'> 
              <VscHeartFilled className="cursor-pointer text-3xl border-2 bg-red-100 text-red-600 rounded-lg p-1 hover:brightness-90 transition-all duration-200" />
            </td>
          </tr>
          <tr>
            <td className='p-4 font-semibold animate-pulse'>
              <p className='w-4 h-4 rounded-md  bg-slate-600'></p>
            </td>
            <td className='p-4 font-semibold animate-pulse'>
              <p className='w-full h-4 rounded-md  bg-slate-600'></p>
            </td>
            <td className='p-4 font-semibold animate-pulse'>
              <p className='w-full h-4 rounded-md  bg-slate-600'></p>
            </td>
            <td className='p-4 font-semibold items-center flex justify-center animate-pulse'> 
              <VscHeartFilled className="cursor-pointer text-3xl border-2 bg-red-100 text-red-600 rounded-lg p-1 hover:brightness-90 transition-all duration-200" />
            </td>
          </tr>
          <tr className='bg-slate-800'>
            <td className='p-4 font-semibold animate-pulse'>
              <p className='w-4 h-4 rounded-md  bg-slate-600'></p>
            </td>
            <td className='p-4 font-semibold animate-pulse'>
              <p className='w-full h-4 rounded-md  bg-slate-600'></p>
            </td>
            <td className='p-4 font-semibold animate-pulse'>
              <p className='w-full h-4 rounded-md  bg-slate-600'></p>
            </td>
            <td className='p-4 font-semibold items-center flex justify-center animate-pulse'> 
              <VscHeartFilled className="cursor-pointer text-3xl border-2 bg-red-100 text-red-600 rounded-lg p-1 hover:brightness-90 transition-all duration-200" />
            </td>
          </tr>
          <tr>
            <td className='p-4 font-semibold animate-pulse'>
              <p className='w-4 h-4 rounded-md  bg-slate-600'></p>
            </td>
            <td className='p-4 font-semibold animate-pulse'>
              <p className='w-full h-4 rounded-md  bg-slate-600'></p>
            </td>
            <td className='p-4 font-semibold animate-pulse'>
              <p className='w-full h-4 rounded-md  bg-slate-600'></p>
            </td>
            <td className='p-4 font-semibold items-center flex justify-center animate-pulse'> 
              <VscHeartFilled className="cursor-pointer text-3xl border-2 bg-red-100 text-red-600 rounded-lg p-1 hover:brightness-90 transition-all duration-200" />
            </td>
          </tr>
          <tr className='bg-slate-800'>
            <td className='p-4 font-semibold animate-pulse'>
              <p className='w-4 h-4 rounded-md  bg-slate-600'></p>
            </td>
            <td className='p-4 font-semibold animate-pulse'>
              <p className='w-full h-4 rounded-md  bg-slate-600'></p>
            </td>
            <td className='p-4 font-semibold animate-pulse'>
              <p className='w-full h-4 rounded-md  bg-slate-600'></p>
            </td>
            <td className='p-4 font-semibold items-center flex justify-center animate-pulse'> 
              <VscHeartFilled className="cursor-pointer text-3xl border-2 bg-red-100 text-red-600 rounded-lg p-1 hover:brightness-90 transition-all duration-200" />
            </td>
          </tr>
    </>
  );
}

export default SkeletonRowTable;
