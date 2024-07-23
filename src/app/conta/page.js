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
    <div className='min-h-screen'>
      {user ? <div className='bg-gray-900 flex justify-center py-8 min-h-screen items-start'>
      <div className="bg-gray-800 p-6 max-w-2xl mx-auto w-full flex flex-col gap-6 rounded-lg shadow-lg">
        <div className='flex justify-between w-full items-center mb-4'>
          <h1 className='text-2xl font-bold text-white'>Rifas Compradas</h1>
          <Link href="/" className='bg-yellow-500 hover:bg-yellow-600 transition-all text-black py-2 rounded-md px-6 font-bold'>Comprar</Link>
        </div>
        <Rifas />
  
      </div>
    </div> : <div>
      <p>acesse a sua conta</p>
    </div>  }
    </div>
  );
};

export default Page;
