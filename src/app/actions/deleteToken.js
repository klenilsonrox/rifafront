'use server'
import { cookies } from "next/headers";

export async function deleteToken(){
    cookies().delete("token")
}