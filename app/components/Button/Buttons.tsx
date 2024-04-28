import Link from 'next/link';
import React from 'react';

const Buttons = () => {
  return (
    <div>
      
    </div>
  );
}

export const ButtonHome = () => {
  return (
    <Link href="/" className=" bg-slate-700 text-zinc-100 w-40 text-center rounded-lg h-8 mt-4 flex items-center justify-center font-semibold">Volver al Inicio</Link>
  );
}



export default Buttons;
