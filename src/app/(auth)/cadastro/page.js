'use client'
import React, { useEffect } from 'react';
import Cadastro from '../../components/cadastro';
import { getToken } from '@/app/actions/getToken';
import { baseUrl } from '../../../../baseUrl';

const page = () => {


  
  async function getUser(){ 
    try { 
      const token = await getToken()
    const response= await fetch(`${baseUrl}/me`, {
      headers:{
        "authorization":`Bearer ${token}`
      }
    } )

    const data = await response.json()
    console.log(data)
    if(data.message===undefined){
      // window.location.href="/"
    }
    console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  
  useEffect(()=>{
    getUser()
  },[])


  return (
    <div>
    <Cadastro />
    </div>
  );
};

export default page;