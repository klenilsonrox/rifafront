'use client'

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { loginuser } from '../actions/loginUser';

const Login = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await loginuser(email, password);

      if (response.status === 401) {
        setError('Dados inválidos');
        setTimeout(() => {
          setError('');
        }, 2000);
      }

      if (response.status === 201) {
        window.location.href = '/conta';
      }

    } catch (error) {
      console.error('Erro ao fazer login', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  function closeLogin(e) {
    if (e.target.id === "modalLogin") {
      window.location.href = "/";
    }
  }

  return (
    <div className="bg-gray-100 p-6 flex items-center flex-col justify-center min-h-screen" onClick={closeLogin} id='modalLogin'>
      <div className="max-w-lg mx-auto w-full bg-white shadow-lg rounded-lg flex flex-col p-4 items-center">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <form className="space-y-4 w-full max-w-lg" onSubmit={handleLogin}>
          <div>
            <label className="block mb-2 font-semibold">Email</label>
            <input
              type="email"
              className="w-full p-3 bg-white rounded-lg shadow-md focus:outline-none border"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Senha</label>
            <input
              type="password"
              className="w-full p-3 bg-white rounded-lg shadow-md focus:outline-none border"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full p-3 text-white font-semibold rounded-lg shadow-md focus:outline-none ${
              isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <div className='mt-4 flex flex-col items-center'>
          <p className='font-medium'>Não possui uma conta?</p>
          <Link href="/cadastro" className='text-center text-blue-700 underline font-bold'>Criar conta</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
