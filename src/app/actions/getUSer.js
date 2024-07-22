'use server'

import { cookies } from "next/headers"
import { baseUrl } from "../../../baseUrl";


export async function getuser() {
    const token = cookies().get('token')
    try {
        const response = await fetch(`${baseUrl}/me`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token ? token.value : ''}`
            }
        });

        if (!response.ok) {
          return response.status
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Erro ao buscar usuário:', error.message);
        throw new Error(`Erro ao buscar usuário: ${error.message}`);
    }
}
