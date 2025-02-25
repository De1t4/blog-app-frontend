import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <div className=' bg-slate-950 px-8 text-gold flex flex-col justify-center items-center py-8'>
      <ul className='flex gap-8 font-semibold'>
        <li className=' cursor-pointer duration-300 transition-all hover:scale-105'>Acerca de</li>
        <li className=' cursor-pointer duration-300 transition-all hover:scale-105'>Ayuda</li>
        <li className=' cursor-pointer duration-300 transition-all hover:scale-105'>Privacidad</li>
        <li className=' cursor-pointer duration-300 transition-all hover:scale-105'>Términos</li>
      </ul>
      <div className="border-b-[1px] border-gray-500 w-full pb-4 flex justify-center gap-8 mt-4 text-xl">
        <FaFacebook className=' hover:scale-105 transition-all duration-300 cursor-pointer'/>
        <FaTwitter className=' hover:scale-105 transition-all duration-300 cursor-pointer'/>
        <FaInstagram className=' hover:scale-105 transition-all duration-300 cursor-pointer'/>
      </div>
      <p className='mt-2'>© Derechos Reservados <a href='https://www.linkedin.com/in/mauricio-chambi-7a90b724a/' className=' font-semibold underline'>Mauricio Chambi</a></p>
    </div>
  );
}

export default Footer;
