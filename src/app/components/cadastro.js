'use client'

import React, { useState } from 'react';
import { cadastrouser } from '../actions/cadastroUser';
import Link from 'next/link';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome || !email || !password || !confirmPassword) {
      setError('Todos os campos são obrigatórios.');
      clearMessage();
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      clearMessage();
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await cadastrouser(nome, email, password);
      if (response.status===201) {
        setMessage('Cadastro realizado com sucesso.');
        window.location.href="/conta"
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError('Erro ao realizar cadastro.');
    } finally {
      setIsSubmitting(false);
      clearMessage();
    }
  };

  const clearMessage = () => {
    setTimeout(() => {
      setMessage('');
      setError('');
    }, 2000);
  };

  return (
    <div className="bg-gray-100 p-6 flex items-center flex-col justify-center min-h-screen">
      <div className="max-w-lg  mx-auto w-full  bg-white shadow-lg rounded-lg flex flex-col p-4 items-center">
        <h2 className="text-xl font-bold mb-4">Cadastro</h2>
        {message && <div className="bg-green-100 p-3 mb-4 rounded">{message}</div>}
        {error && <div className="bg-red-100 p-3 mb-4 rounded">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-lg">
          <div>
            <label className="block mb-2 font-semibold">Nome</label>
            <input
              type="text"
              className="w-full p-3 bg-white rounded-lg shadow-md focus:outline-none border"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Email</label>
            <input
              type="email"
              className="w-full p-3 bg-white rounded-lg shadow-md focus:outline-none border"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Senha</label>
            <input
              type="password"
              className="w-full p-3 bg-white rounded-lg shadow-md focus:outline-none border"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Confirme a Senha</label>
            <input
              type="password"
              className="w-full p-3 bg-white rounded-lg shadow-md focus:outline-none border"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={`w-full p-3 text-white font-semibold rounded-lg shadow-md focus:outline-none ${
              isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
        <div className='mt-4 flex flex-col items-center justify-center'>
          <p>Já tem uma conta?</p>
          <Link href="/login" className='mx-auto text-[#3B82F6] font-bold underline'>Entrar</Link>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
