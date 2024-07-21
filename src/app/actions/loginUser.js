'use server'

import { cookies } from 'next/headers';
import { baseUrl } from '../../../baseUrl';

export async function loginuser(email, password) {
  // Validação dos dados no servidor
  if (!email || !password ) {
    return { error: 'Todos os campos são obrigatórios.' };
  }


  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    console.log(data)

    if (!response.ok) {
      return {status:401, error: data.message || 'Erro ao realizar login.' };
    }

    cookies().set('token', data.token, {
      secure: true,
      httpOnly: true
    });

    return {status:201, success: 'login realizado com sucesso.' };
  } catch (err) {
    return { error: 'Erro ao fazer login.' };
  }
}
