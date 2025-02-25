import React from 'react';

const Input = ({type, info, name, label, fetchData}) => {
  return (
    <div>
      <div className="w-full">
        <label htmlFor={name}>{label}
          <input required={true} id={name} onChange={fetchData} name={name} minLength={5} maxLength={255}  type={type}  className=" max-md:h-10 bg-transparent border-white border-2 placeholder:text-zinc-300 bg-slate-600 w-full text-zinc-200 py-2 px-4 rounded-md outline-1 h-10 outline-zinc-700 text-sm " placeholder={info}/>
        </label>
      </div>
    </div>
  );
}

export default Input;
