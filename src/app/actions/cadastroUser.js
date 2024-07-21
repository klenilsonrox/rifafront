'use server'

import { cookies } from 'next/headers';
import { baseUrl } from '../../../baseUrl';

export async function cadastrouser(nome, email, password) {
  // Validação dos dados no servidor
  if (!nome || !email || !password ) {
    return { error: 'Todos os campos são obrigatórios.' };
  }


  try {
    const response = await fetch(`${baseUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      return {status:401, error: data.message || 'Erro ao realizar cadastro.' };
    }

    cookies().set('token', data.token, {
      secure: true,
      httpOnly: true
    });

    return {status:201, success: 'Cadastro realizado com sucesso.' };
  } catch (err) {
    return { error: 'Erro ao realizar cadastro.' };
  }
}
