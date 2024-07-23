'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getuser } from '../actions/getUSer';
import { deleteToken } from '../actions/deleteToken';
import { FaBars, FaTimes } from 'react-icons/fa';

const HeaderLogado = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  function openMenu() {
    setOpen(open => !open);
  }


  async function buscarUser() {
    try {
      const response = await getuser();

console.log(response)

if(response===401){
  setUser(null)
} else{
  setUser(response)
}

    

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    buscarUser();
  }, []);

  function logout() {
    deleteToken();
    window.location.href = "/login";
  }

  function closeMenu(){
    setOpen(false)
  }

  
console.log(user)

  return (
    <div className='bg-gray-900 text-white'>
      <header className="p-4 max-w-6xl mx-auto flex items-center justify-between relative ">
        <Link href="/conta">
          <p className="text-2xl font-bold">RxCampanhas</p>
        </Link>
        <button className='lg:hidden z-30' onClick={openMenu}>
          {open ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
        <nav className={`flex-col lg:flex-row lg:flex ${open ? 'flex' : 'hidden'} items-center gap-4 absolute lg:static top-0 left-0 w-full lg:w-auto bg-gray-900 lg:bg-transparent h-screen lg:h-auto pt-16 lg:pt-0 transition-all duration-300 ease-in-out`}>
          <li className="list-none" onClick={closeMenu}>
            <Link href="/">
              <p className="text-lg font-medium hover:text-yellow-400 transition-colors">Inicio</p>
            </Link>
          </li>
          {user && <li className="list-none" onClick={closeMenu}>
            <Link href="/configuracoes">
              <p className="text-lg font-medium hover:text-yellow-400 transition-colors">Configurações</p>
            </Link>
          </li>}
          {user && <li className="list-none" onClick={closeMenu}>
            <Link href="/conta">
              <p className="text-lg font-medium hover:text-yellow-400 transition-colors">minha conta</p>
            </Link>
          </li>}
          {!user && <li className="list-none" onClick={closeMenu}>
            <Link href="/login">
              <p className="text-lg font-medium hover:text-yellow-400 transition-colors">Entrar</p>
            </Link>
          </li>}
          {!user && <li className="list-none" onClick={closeMenu}>
            <Link href="/cadastro">
              <p className="text-lg font-medium hover:text-yellow-400 transition-colors">Criar conta</p>
            </Link>
          </li>}
          {user && <li className="list-none cursor-pointer" onClick={closeMenu}>
            <p onClick={logout} className="text-lg font-medium hover:text-red-500 transition-colors">Sair da conta</p>
          </li>}
        </nav>
      </header>
    </div>
  );
};

export default HeaderLogado;
