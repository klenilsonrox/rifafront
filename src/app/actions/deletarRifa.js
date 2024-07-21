'use server'

import { cookies } from "next/headers"
import { baseUrl } from "../../../baseUrl"
import { revalidatePath } from "next/cache";


export async function deletarRifa(rifaId) {
    const token = cookies().get('token')
    try {
        const response = await fetch(`${baseUrl}/rifas/${rifaId}`, {
            next:{
                revalidate:1
            },
            method:"delete",
            headers: {
                "Authorization": `Bearer ${token ? token.value : ''}`
            }
        });

        if (!response.ok) {
          return response.status
        }

        const data = await response.json();
        console.log(data)
        revalidatePath("/conta/admin")
       
        return data;

    } catch (error) {
        console.error('Erro ao deletarRifa:', error.message);
        throw new Error(`Erro ao DeletarRifa: ${error.message}`);
    }
}
