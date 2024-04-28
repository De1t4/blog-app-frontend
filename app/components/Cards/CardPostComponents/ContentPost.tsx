import Link from 'next/link';
import React, { useState } from 'react';
import { Modal } from '../../Modal';

const ContentPost = ({id, picture, content,title}) => {
  const [statePicture, setStatePicture] = useState(false)

  const viewPicture = () =>{
    setStatePicture(!statePicture)
  }

  return (
    <>
    <div className="my-2 flex flex-col">
      <Link href={`/SinglePost/${id}`}>
        <h1 className="hover:brightness-110 overflow-hidden text-ellipsis whitespace-nowrap transition-all duration-300 text-[#328FFF] font-bold text-2xl font-sans max-md:text-xl">{title}</h1>
      </Link>
      <p className="mt-2 text-zinc-100 text-sm font-sans">{content}</p>
      { picture != "" ? <img src={`${picture}`} className=" m-auto hover:scale-[1.015] cursor-pointer transition-all duration-300 my-2 rounded-lg" onClick={viewPicture} alt="" width={500} height={400} />:""}
    </div>
    <Modal stateModal={statePicture} onClick={viewPicture}>
      {picture != "" && <img src={`${picture}`} className=" max-md:  w-96" width={550} height={200} alt={title + "image"}></img>}  
    </Modal>
    </>
  );
}

export default ContentPost;
