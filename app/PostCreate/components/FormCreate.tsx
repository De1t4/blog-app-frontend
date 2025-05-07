import React, { ChangeEvent } from 'react'
import { MdSaveAlt } from 'react-icons/md'
import { FormEvents } from '../../interface/models'
import { Button, Select, SelectItem, Textarea } from '@nextui-org/react'

interface FormCreateProps {
  handleSubmit: (e: React.FormEvent) => void
  handleChangeInput: (e: FormEvents["change"]) => void
  handleChangedImage: (e: ChangeEvent<HTMLInputElement>) => void
  imageSelect: File | null
}

const opciones = [
  { key: "0", name: "Elegir Opción" },
  { key: "1", name: "Base de Datos" },
  { key: "2", name: "IA" },
  { key: "4", name: "Mobile" },
  { key: "5", name: "Programación" },
  { key: "6", name: "Testing" },
  { key: "7", name: "Otros" }
];

export const FormCreate: React.FC<FormCreateProps> = ({ handleSubmit, handleChangeInput, handleChangedImage, imageSelect }) => {
  return (
    <form className='flex flex-col mt-2 w-full gap-6' onSubmit={handleSubmit}>
      <label htmlFor="title" id="title" className='flex flex-col text-zinc-100 font-semibold'>Titúlo Post
        <input autoFocus minLength={10} name='title' className='bg-slate-600 p-2 rounded-lg text-zinc-100 outline-none' onChange={handleChangeInput} maxLength={45} type="text" placeholder='Ingresar un titúlo' />
      </label>
      <Textarea
        label="Ingresar una descripción para tu post"
        placeholder="Ingresar texto"
        minLength={20}
        className="w-full" // Ensuring the width is full
        onChange={handleChangeInput}
        fullWidth
        name="contentPost"
      />
      <Select
        label="Selecciona una opción"
        className="max-w-xs text-zinc-100 m-auto"
        required name="type" onChange={handleChangeInput}
      >
        {opciones.map((opc) => (
          <SelectItem className='text-zinc-100' key={opc.key} >
            {opc.name}
          </SelectItem>
        ))}
      </Select>
      <div className=" bg-slate-600 border-dashed border-2 border-t-zinc-400 h-max  text-zinc-200 font-semibold w-3/5 m-auto rounded-lg ">
        <input accept="image/*" onChange={handleChangedImage} id="upload-image" name="picture" type="file" defaultValue={""} className=' hidden' />
        <label htmlFor="upload-image" className='w-full '>
          <span className="flex justify-center flex-col items-center h-16  cursor-pointer" >
            <MdSaveAlt className='mr-2 scale-150' />
            <p className=" text-sm text-center">Agregar imagen aquí.</p>
          </span>
        </label>
      </div>
      {imageSelect != null && <p className=' text-center text-slate-100 font-semibold '>{imageSelect.name}</p>}
      <Button className='dark w-2/4 m-auto' type='submit'>Crear Post</Button>
    </form>
  )
}
