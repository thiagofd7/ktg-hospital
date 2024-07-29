// components/Navbar.js
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
  <nav className=" flex items-center justify-between p-4 bg-white text-black shadow-md">
    <div className="text-2xl font-bold ml-6" >
      <img src="https://icones.pro/wp-content/uploads/2022/03/icone-de-l-hopital-bleu.png" alt="logohospital" className="w-8 h-8" />
      <p className='text-blue-700 text-lg'>KTG</p>
    </div>
      <div>          
        <Link href="/" className="hover:text-blue-600 mr-4">
           Página Inicial
         </Link>
        <Link href="/dashboard" className="hover:text-blue-600">
          Dashboard
        </Link>      
      </div>
    
    <div className="flex items-center">
      <span className="mr-2">Admin</span>
      <img src="https://icones.pro/wp-content/uploads/2022/07/icones-d-administration-bleu.png" alt="Descrição da Imagem" className="w-5 h-5  " />
    </div>
  </nav>


      
  );
};

export default Navbar;
