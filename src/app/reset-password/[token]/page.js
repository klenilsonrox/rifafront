'use client';
import React, { useState } from 'react';
import { baseUrl } from '../../../../baseUrl';

const ResetPasswordPage = ({ params }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function resetPass(e) {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    const { token } = params;

    try {
      const response = await fetch(`${baseUrl}/reset-password`, {
        next:{
          revalidate:1
        },
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Senha atualizada com sucesso!");
        setNewPassword("");
        setConfirmPassword("");
        setError("");
        setTimeout(()=>{
            window.location.href="/login"
        },2000)
      } else {
        setError(data.message || "Ocorreu um erro. Tente novamente.");
      }
    } catch (error) {
      setError("Erro na comunicação com o servidor.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Recuperação de Senha</h1>
        <form onSubmit={resetPass} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Nova Senha:</label>
            <input
              type="password"
              value={newPassword}
              onChange={({ target }) => setNewPassword(target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Confirme a Nova Senha:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={({ target }) => setConfirmPassword(target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Atualizar Senha
          </button>
          {message && <p className="text-green-500 mt-4 text-center">{message}</p>}
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
