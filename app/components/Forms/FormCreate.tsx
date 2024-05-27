import React, { ChangeEvent } from 'react'
import { MdSaveAlt } from 'react-icons/md'
import { FormEvents } from '../../interface/models'

interface FormCreateProps{
  handleSubmit:  (e:React.FormEvent) => void
  handleChangeInput: (e:FormEvents["change"]) => void
  handleChangedImage: (e:ChangeEvent<HTMLInputElement>) => void
  imageSelect: File | null
}

export const FormCreate:React.FC<FormCreateProps> = ({handleSubmit, handleChangeInput, handleChangedImage, imageSelect}) =>{
  return (
    <form className='flex flex-col mt-2 w-full' onSubmit={handleSubmit}>
    <label htmlFor="title" id="title" className='flex flex-col text-zinc-100 font-semibold'>Titúlo Post         
      <input autoFocus minLength={10} name='title' className='bg-slate-600 p-2 rounded-lg text-zinc-100 outline-none' onChange={handleChangeInput} maxLength={45} type="text" placeholder='Ingresar un titúlo'/>
    </label>
    <label htmlFor="content" id='content' className='mt-4 text-zinc-100 font-semibold'>Ingresar una descripción para tu post</label>
    <textarea  minLength={20} name='contentPost' maxLength={255} className=' h-32 max-h-40 bg-slate-600 p-2 rounded-lg text-zinc-100 outline-none ' placeholder='Ingresar texto' onChange={handleChangeInput}></textarea>
    <select required name="type" onChange={handleChangeInput} className='mt-4 m-auto rounded-lg font-semibold h-10 w-3/5  bg-slate-600 text-zinc-100'>
      <option value="0" hidden>Elegir Opción</option>
      <option value="1">Base de Datos</option>
      <option value="2">IA</option>
      <option value="4">Mobile</option>
      <option value="5">Programación</option>
      <option value="6">Testing</option>
      <option value="7">Otros</option>
    </select>
    <div className=" bg-slate-600 border-dashed border-2 border-t-zinc-400 h-max  text-zinc-200 mt-4 font-semibold w-3/5 m-auto rounded-lg ">
      <input accept="image/*" onChange={handleChangedImage} id="upload-image" name="picture" type="file" defaultValue={""}  className=' hidden'/>
      <label htmlFor="upload-image" className='w-full '>
        <span className="flex justify-center flex-col items-center h-16  cursor-pointer" >
          <MdSaveAlt className='mr-2 scale-150'/>
          <p className=" text-sm text-center">Agregar imagen aquí.</p>
        </span>
      </label>

    </div>
    {imageSelect != null && <p className=' text-center text-slate-100 font-semibold mt-4'>{imageSelect.name}</p>}

    <button type='submit' className=' transition-all duration-300 hover:scale-105 bg-slate-700 w-2/4 h-10 mt-4 m-auto  rounded-lg text-zinc-100 font-semibold'>Crear Posts</button>
  </form>  
  )
}
