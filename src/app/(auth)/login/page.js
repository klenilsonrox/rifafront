'use client'
import Login from '@/app/components/Login';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../../../baseUrl';
import { getToken } from '@/app/actions/getToken';

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

    // if(data.message===undefined){
    //   window.location.href="/"
    // }

  
    } catch (error) {
      return error.message
    }
  }

  
  useEffect(()=>{
    getUser()
  },[])



  return (
    <>
      <Login />
    </>
  );
};

export default page;