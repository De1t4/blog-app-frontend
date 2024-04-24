import React from 'react'
import { ScaleLoader } from 'react-spinners'

export default function SkeletonPost({stateSkeleton}) {
  return (
    <>
      <article className={`${stateSkeleton ? "hidden":"opacity-100" } border-[1px] flex items-center justify-center h-80 border-slate-600 shadow-md shadow-slate-800 hover:shadow-slate-700 hover:border-slate-300 max-lg:w-full transition-all duration-300 py-4 px-6 bg-slate-800 h-min-72 w-full my-4 rounded-lg`}>
        <ScaleLoader color="#379DFF" loading />
      </article>
      <article className={`${stateSkeleton ? "hidden":"opacity-100" } border-[1px] flex items-center justify-center h-80 border-slate-600 shadow-md shadow-slate-800 hover:shadow-slate-700 hover:border-slate-300 max-lg:w-full transition-all duration-300 py-4 px-6 bg-slate-800 h-min-72 w-full my-4 rounded-lg`}>
        <ScaleLoader color="#379DFF" loading />
      </article>
    </>
  )
}
