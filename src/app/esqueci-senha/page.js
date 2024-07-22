'use client';
import React, { useState } from 'react';
import { baseUrl } from '../../../baseUrl';
import Link from 'next/link';



const RequestPasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/request-password-reset`, {
        next:{
          revalidate:1
        },
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("E-mail de recuperação enviado com sucesso!");
        setEmail("");
        setError("");


      } else {
        setError(data.message || "Ocorreu um erro. Tente novamente.");
        setMessage("");
      }
    } catch (error) {
      setError("Email inválido");
      setMessage("");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Solicitação de Recuperação de Senha</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Digite seu e-mail:</label>
            <input
              type="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Enviar E-mail de Recuperação
          </button>
          <Link href="/login" className=' block mt-2 text-center mx-auto text-blue-700 underline font-bold'>Voltar para o login</Link>
          {message && <p className="text-green-500 mt-4 text-center">{message}</p>}
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default RequestPasswordReset;
