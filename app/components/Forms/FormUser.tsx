import React, { useState } from 'react';
import FormRegister from './FormRegister';
import FormLogin from './FormLogin';

const FormUser = ({closeModal}) => {
  const [statusForm, setStatusForm] = useState<boolean>(false)
  const changeForm = () =>{ 
    setStatusForm(!statusForm)
  }
  
  return (
    <div  className=" h-auto " onClick={(e) => e.stopPropagation()}>
      <div  className=" max-md:w-11/12  border-y-4  border-[#F3BF3A] flex h-[35rem] items-center justify-center w-[50rem] rounded-lg overflow-hidden m-auto">
        <div className="w-full h-full  max-md:hidden lg:w-2/5 flex flex-col items-center  justify-center  bg-no-repeat bg-cover bg-center">
          <img src={"bg-street.jpg"} alt='street-image' className=' w-max  h-full bg-cover select-none'/>
        </div>
        {statusForm
        ?<FormRegister changeForm={changeForm} closeModal={closeModal}/>
        :<FormLogin changeForm={changeForm} closeModal={closeModal}/>
        }
      </div>
    </div>
  );
}

export default FormUser;
