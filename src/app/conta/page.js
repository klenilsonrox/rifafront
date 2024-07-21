'use client'
import React, { useEffect, useState } from 'react';
import Rifas from '../components/Rifas';
import Link from 'next/link';
import { buscarUsuario } from '../functions/buscarUser';



const Page = () => {
  const [user, setUser] = useState(null);


  useEffect(() => {
 buscarUsuario().then(res=>setUser(res))
 
  }, []);

  if(!user) return null

  return (
    <>
      {user ? <div className='bg-gray-900 min-h-[70vh] flex justify-center  py-8'>
      <div className="bg-gray-800 p-6 max-w-4xl mx-auto flex flex-col gap-6 rounded-lg shadow-lg">
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-2xl font-bold text-white'>Rifas Compradas</h1>
          <Link href="/" className='bg-yellow-500 hover:bg-yellow-600 transition-all text-black py-2 rounded-md px-6 font-bold'>Comprar</Link>
        </div>
        <Rifas />
      </div>
    </div> : <div>
      <p>acesse a sua conta</p>
    </div>  }
    </>
  );
};

export default Page;
