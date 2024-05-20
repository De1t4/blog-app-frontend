import React, { useState } from 'react';
import FormRegister from './FormRegister';
import FormLogin from './FormLogin';
import Image from 'next/image';

const FormUser = ({closeModal}) => {
  const [statusForm, setStatusForm] = useState<boolean>(false)
  const changeForm = () =>{ 
    setStatusForm(!statusForm)
  }
  
  return (
    <div  className="h-[35rem] w-[45rem] max-md:w-4/5 border-y-4 rounded-lg border-[#F3BF3A] flex justify-center items-center" onClick={(e) => e.stopPropagation()}>
      <div className=" h-full w-full max-md:hidden ">
        <Image     width={600} height={800}  	loading="lazy" src={"/bg-street.jpg"} alt='street-image' className=' object-cover h-full'/>
      </div>
      <div className="relative w-full h-full max-md:w-full p-10 bg-slate-900 flex flex-col justify-center">
        {statusForm
          ?<FormRegister changeForm={changeForm} closeModal={closeModal}/>
          :<FormLogin changeForm={changeForm} closeModal={closeModal}/>
        }
        <span onClick={closeModal} className="text-4xl close-btn cursor-pointer absolute  right-8 top-4 " id="closeModalBtn">&times;</span>

      </div>
    </div>
  );
}

export default FormUser;
