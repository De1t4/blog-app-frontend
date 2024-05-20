import React from 'react';

const ButtonsFilter = ({orderPostsOld, orderPostsNew}) => {
  return (
    <section className="flex gap-2 justify-center">
      <p onClick={orderPostsNew} className="text-sm border-[1px] w-32 h-8 text-center flex justify-center items-center  border-slate-800 hover:brightness-150 cursor-pointer shadow-md transition-all duration-300 p-4 bg-slate-950 my-1 text-zinc-200 rounded-md max-[400px]:h-full">Ver Recientes</p>
      <p onClick={orderPostsOld} className="text-sm border-[1px] w-32 h-8 text-center flex justify-center items-center  border-slate-800 hover:brightness-150 cursor-pointer shadow-md transition-all duration-300 p-4 bg-slate-950 my-1 text-zinc-200 rounded-md max-[400px]:h-full">Ver Antiguos</p>
    </section>
  );
}

export default ButtonsFilter;
