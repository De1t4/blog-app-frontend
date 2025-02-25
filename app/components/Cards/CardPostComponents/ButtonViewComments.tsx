import React from 'react';
import { FaCommentAlt } from 'react-icons/fa';

const ButtonViewComments = ({toggleComments, index, length}) => {
  return (
    <div>
      <div className="w-auto flex items-center justify-end">
        <p onClick={() => toggleComments(index)}
          className=" transition-all duration-300 p-1 rounded-lg hover:brightness-80 hover:bg-slate-700 cursor-pointer flex justify-center items-center text-zinc-300  mt-2 gap-2 text-sm">
        <FaCommentAlt/> Comentarios ({length})</p>
      </div>
      <hr className="my-4" />
    </div>
  );
}

export default ButtonViewComments;
