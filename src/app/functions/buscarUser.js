import { getuser } from "../actions/getUSer";

export async function buscarUsuario() {
    try {
      const usuario = await getuser();


      if (usuario === 401) {
        window.location.href = "/login";
  
      }

      if(usuario){
        return usuario
      }

     
    } catch (error) {
      console.log(error);
    }
  }