import Link from 'next/link';
import React, { useState } from 'react';
import { Modal } from '../../Modal';
import Image from 'next/image';

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
      {picture != "" && <Image src={`${picture}`} className=" border-[1px] border-slate-500 overflow-hidden m-auto hover:scale-[1.015]  cursor-pointer transition-all duration-300 my-2 rounded-lg" objectFit='cover' onClick={viewPicture} alt={`picture-${title}`} width={500} height={500} />}
    </div>
    <Modal stateModal={statePicture} onClick={viewPicture}>
      <div className=" border-2 w-4/5 h-4/5 max-md:h-2/5">
        {picture != "" && <Image src={`${picture}`} className=" border-[1px] border-slate-500 overflow-hidden w-full h-full  object-fill" width={500} height={200} alt={`picture-${title}`}/>}  
      </div>
    </Modal>
    </>
  );
}

export default ContentPost;
