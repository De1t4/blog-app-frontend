import React from 'react';

const SkeletonUser = () => {
  return (
    <>
  <div className="py-1 flex items-center justify-between px-2 mb-2 animate-pulse">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-slate-600 rounded-full"></div>
      <div className="flex flex-col gap-y-2">
        <div className="w-20 h-2 bg-slate-600  rounded"></div>
        <div className="w-20 h-2 bg-slate-600  rounded"></div>
      </div>
    </div>
  </div>
  <div className="py-1 flex items-center justify-between px-2 mb-2 animate-pulse">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-slate-600 rounded-full"></div>
      <div className="flex flex-col gap-y-2">
        <div className="w-20 h-2 bg-slate-600  rounded"></div>
        <div className="w-20 h-2 bg-slate-600  rounded"></div>
      </div>
    </div>
  </div>
    </>
  
  );
}


export const SkeletonFavorite = () => {
  return (
<>
<div className=" border bg-slate-800 transition-all duration-300  shadow-slate-800 hover:shadow-slate-700 mt-4 hover:border-slate-300 border-slate-600  shadow rounded-md p-6 max-w-xl w-full mx-auto">
    <div className="space-y-3 animate-pulse">
      <div className="h-6 bg-slate-600 rounded"></div>
      <div className="h-4 bg-slate-600 rounded"></div>
      <div className="h-4 bg-slate-600 rounded"></div>
    </div>
  </div>    
  <div className=" border bg-slate-800 transition-all duration-300  shadow-slate-800 hover:shadow-slate-700 mt-4 hover:border-slate-300 border-slate-600  shadow rounded-md p-6 max-w-xl w-full mx-auto">
    <div className="space-y-3 animate-pulse">
      <div className="h-6 bg-slate-600 rounded"></div>
      <div className="h-4 bg-slate-600 rounded"></div>
      <div className="h-4 bg-slate-600 rounded"></div>
    </div>
  </div>
  <div className=" border bg-slate-800 transition-all duration-300  shadow-slate-800 hover:shadow-slate-700 mt-4 hover:border-slate-300 border-slate-600  shadow rounded-md p-6 max-w-xl w-full mx-auto">
    <div className="space-y-3 animate-pulse">
      <div className="h-6 bg-slate-600 rounded"></div>
      <div className="h-4 bg-slate-600 rounded"></div>
      <div className="h-4 bg-slate-600 rounded"></div>
    </div>
  </div>
</>
  );
}



export default SkeletonUser;
