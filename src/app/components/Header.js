'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { getToken } from '../actions/getToken';
import { baseUrl } from '../../../baseUrl';
import { deleteToken } from '../actions/deleteToken';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user,setUser]=useState(null)

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  async function getUser(){
    try {
      const token = await getToken()
    const response= await fetch(`${baseUrl}/me`, {
      headers:{
        "authorization":`Bearer ${token}`
      }
    } )

    const data = await response.json()
    setUser(data)
    console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  
  useEffect(()=>{
    getUser()
  },[])

  async function sair(){
    await deleteToken()
    window.location.href="/"
  }

 


  return (
    <div className='bg-gray-900 text-white rounded-xl'>
      <header className="p-4 max-w-6xl mx-auto flex items-center flex-col justify-between lg:flex-row">
        <button
          onClick={handleMenuToggle}
          className='text-white lg:hidden flex items-center'
        >
          {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
        <Link href="/">
          <p className='text-2xl font-bold'>
            Rx<span className='text-red-500'>Campanhas</span>
          </p>
        </Link>
        <nav className={`lg:flex ${isMenuOpen ? 'flex' : 'hidden'} lg:items-center lg:gap-6 flex-col lg:flex-row`}>
          <Link href="/" className='text-lg font-medium hover:text-red-500 transition-colors'>
            Início
          </Link>
          {user && user.message===undefined && <Link href="/conta" className='text-lg font-medium hover:text-red-500 transition-colors'>
            Minha conta
          </Link> }
          {user && user.message==="Não autenticado" && <Link href="/login" className='text-lg font-medium hover:text-blue-500 transition-colors'>
            Entrar
          </Link> }
         {user && user.message===undefined &&  <button className='text-lg font-medium hover:text-red-500 transition-colors' onClick={sair}>
            Sair da conta
          </button> }
          {user && user.message==="Não autenticado" && <Link href="/cadastro" className='text-lg font-medium hover:text-blue-500 transition-colors'>
            Cadastre-se
          </Link> }
        </nav>
      </header>
    </div>
  );
};

export default Header;
