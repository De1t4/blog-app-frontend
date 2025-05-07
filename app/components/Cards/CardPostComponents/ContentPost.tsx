import Link from 'next/link';
import React from 'react';
import { Image as ImageUI } from '@nextui-org/react';

const ContentPost = ({ id, picture, content, title }) => {

  return (
    <>
      <div className="my-2 flex flex-col">
        <Link href={`/SinglePost/${id}`}>
          <h1 className="hover:brightness-110 overflow-hidden text-ellipsis whitespace-nowrap transition-all duration-300 text-[#328FFF] font-bold text-2xl font-sans max-md:text-xl">{title}</h1>
        </Link>
        <p className="mt-2 text-zinc-100 text-sm font-sans">{content}</p>
        <div className=" flex justify-center">
          <ImageUI src={picture} className='mt-4 m-auto' isZoomed></ImageUI>
        </div>
      </div>
    </>
  );
}

export default ContentPost;
