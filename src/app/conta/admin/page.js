'use client'
import { getuser } from '@/app/actions/getUSer';
import Admin from '@/app/components/Admin';
import React, { useEffect, useState } from 'react';

const page = () => {
    const [user,setUser]=useState(null)

    async function buscarUser(){
        const usuario = await getuser()
        setUser(usuario)
        if(!usuario.isAdmin){
            window.location.href="/conta"
        }
    }

    useEffect(()=>{
        buscarUser()
    },[])

    if(user===null) return <p className='p-4'>Aguarde...</p>


  return (
    <>
    {user.isAdmin && <div className="p-4 max-w-7xl mx-auto">
        <Admin />
      </div>}
    </>
  );
};

export default page;