import React from 'react'
import { ScaleLoader } from 'react-spinners'

export default function SkeletonPost() {
  return (
    <>
    <article className={` border-[1px] r h-auto border-slate-600 shadow-md shadow-slate-800 hover:shadow-slate-700 hover:border-slate-300 max-lg:w-full transition-all duration-300 py-4 px-6 bg-slate-800 h-min-72 w-full my-4 rounded-lg`}>
      <div className="animate-pulse">
        <div className=" flex items-center justify-between mb-4">
          <div className="flex gap-2 items-center">
            <div className="w-10 h-10 bg-slate-600  rounded-full"></div>
            <div className=" gap-y-2 flex flex-col">
              <div className="w-32 h-3 bg-slate-600  rounded"></div>
              <div className="w-32 h-3 bg-slate-600  rounded"></div>
            </div>
          </div>
          <div className="w-32 h-4 bg-slate-600  rounded-lg"></div>
        </div>
        <div className="my-2 flex flex-col  gap-1">
          <div className="h-6 w-60 bg-slate-600  rounded mb-2"></div>
          <div className="h-3 w-full bg-slate-600  rounded mb-2"></div>
          <div className="h-3 w-full bg-slate-600  rounded mb-2"></div>
          <div className="h-3 w-full bg-slate-600  rounded mb-2"></div>
          <div className="h-3 w-full bg-slate-600  rounded mb-2"></div>
        </div>
        <div className="my-2 flex flex-col items-end  gap-1">
          <div className="h-4 w-32 bg-slate-600  rounded mb-2"></div>
        </div>
        <hr className='my-1'/>
        <div className="mt-6 flex flex-col items-end  gap-1">
          <div className="h-6 w-full bg-slate-600  rounded mb-2"></div>
        </div>
      </div>      
    </article>
    <article className={` border-[1px] r h-auto border-slate-600 shadow-md shadow-slate-800 hover:shadow-slate-700 hover:border-slate-300 max-lg:w-full transition-all duration-300 py-4 px-6 bg-slate-800 h-min-72 w-full my-4 rounded-lg`}>
      <div className="animate-pulse">
        <div className=" flex items-center justify-between mb-4">
          <div className="flex gap-2 items-center">
            <div className="w-10 h-10 bg-slate-600  rounded-full"></div>
            <div className=" gap-y-2 flex flex-col">
              <div className="w-32 h-3 bg-slate-600  rounded"></div>
              <div className="w-32 h-3 bg-slate-600  rounded"></div>
            </div>
          </div>
          <div className="w-32 h-4 bg-slate-600  rounded-lg"></div>
        </div>
        <div className="my-2 flex flex-col  gap-1">
          <div className="h-6 w-60 bg-slate-600  rounded mb-2"></div>
          <div className="h-3 w-full bg-slate-600  rounded mb-2"></div>
          <div className="h-3 w-full bg-slate-600  rounded mb-2"></div>
          <div className="h-3 w-full bg-slate-600  rounded mb-2"></div>
          <div className="h-3 w-full bg-slate-600  rounded mb-2"></div>
        </div>
        <div className="my-2 flex flex-col items-end  gap-1">
          <div className="h-4 w-32 bg-slate-600  rounded mb-2"></div>
        </div>
        <hr className='my-1'/>
        <div className="mt-6 flex flex-col items-end  gap-1">
          <div className="h-6 w-full bg-slate-600  rounded mb-2"></div>
        </div>
      </div>      
    </article>
    </>
  )
}
