'use client'
import React, { useEffect, useState } from 'react';
import { getuser } from '../actions/getUSer';
import Rifas from '../components/Rifas';
import Link from 'next/link';

const Page = () => {
  const [user, setUser] = useState("");

  async function buscarUser() {
    try {
      const usuario = await getuser();

      if (usuario === 401) {
        window.location.href = "/login";
      }

      setUser(usuario);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    buscarUser();
  }, []);

  return (
    <div className='bg-gray-900 min-h-[70vh] flex justify-center  py-8'>
      <div className="bg-gray-800 p-6 max-w-4xl mx-auto flex flex-col gap-6 rounded-lg shadow-lg">
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-2xl font-bold text-white'>Rifas Compradas</h1>
          <Link href="/" className='bg-yellow-500 hover:bg-yellow-600 transition-all text-black py-2 rounded-md px-6 font-bold'>Comprar</Link>
        </div>
        <Rifas />
      </div>
    </div>
  );
};

export default Page;
