'use client'
import React, { useEffect, useRef } from 'react'
import { IoSearch } from "react-icons/io5";

export default function HeaderSearch({updateSearch, updateSelect}) {
  const inputRef = useRef(null);
  useEffect(() => {
    // Entra al componente, establece el foco en el input
    inputRef.current.focus();
  }, [])
  return (
    <section className="border-[1px]  border-slate-600 shadow-md shadow-slate-800 hover:shadow-slate-700 hover:border-slate-300 max-xl:items-center max-lg:w-full max-xl:flex-col max-xl:gap-y-4  h-auto flex justify-between max-md:w-full transition-all duration-300 py-4 px-6 bg-slate-900 w-full mb-4 rounded-lg">
      <span className=' relative flex items-center'>
        <IoSearch className=' absolute left-2   text-zinc-200'/>
        <input  ref={inputRef} type="text" onChange={updateSearch} placeholder="Buscar Post" className="max-md:w-full bg-slate-600 font-semibold  text-zinc-100 py-2 px-7 rounded-lg outline-1 outline-zinc-700 text-sm"/>
      </span>
      <select required name="select-post" onChange={updateSelect} className='  max-[500px]:w-full rounded-lg font-semibold h-9  bg-slate-600 text-zinc-100'>
        <option value="Todos">Todos</option>
        <option value="Base de Datos">Base de Datos</option>
        <option value="IA">IA</option>
        <option value="Lenguajes de Programación">Lenguajes de Programación</option>
        <option value="Mobile">Mobile</option>
        <option value="Programación">Programación</option>
        <option value="Testing">Testing</option>
        <option value="Otros">Otros</option>
      </select>      
    </section>
  )
}
