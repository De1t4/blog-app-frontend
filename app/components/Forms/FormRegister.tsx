import React from 'react';
import Input from '../Input';

const FormRegister = ({closeModal, changeForm}) => {
  return (
    <div className="w-full lg:w-3/5 py-12 px-12 bg-slate-900 h-full relative">
    <span onClick={closeModal} className="text-4xl close-btn cursor-pointer absolute  right-8 top-8 " id="closeModalBtn">&times;</span>
    <h2  className="text-3xl mb-4">Register</h2>
    <p className="mb-4">
      Create your account. It’s free and only take a minute
    </p>
    <form>
      <div className="grid grid-cols-2 gap-5">
        <Input type={"text"} name={"name"} info={"Ingresar Nombre"} label={"Nombre:"}/>
        <Input type={"text"} name={"lastname"} info={"Ingresar Apellido"} label={"Apellido:"}/>
      </div>
      <div className="mt-2">
      <Input type={"email"} info={"Ingresar Email"} name={"email"} label={"Email:"}/>
      </div>
      <div className="mt-2">
      <Input type={"password"} info={"************"} name={"password"} label={"Contraseña:"}/>
      </div>
      <div className="mt-2">
      <Input type={"password"} info={"************"} name={"passwordRepeat"} label={"Repetir Contraseña"}/>
      </div>
      <div className="mt-2">
        <button className="w-full bg-[#F3BF3A] py-3 text-center text-black font-bold rounded-lg">Register Now</button>
      </div>
      <p className='mt-4 border-b-2  w-max cursor-pointer font-semibold' onClick={changeForm}>Ya estoy registrado</p>
    </form>
   </div>
  );
}

export default FormRegister;
