import obtener from "../firebase/get-data";

const autenticar= async (email) =>{
    let usuarios = await obtener("usuarios")
    for (let i = 0; i<usuarios.length; i++){
        if(usuarios[i].email===email){
            sessionStorage.setItem("permisos", JSON.stringify(usuarios[i].permisos))
            return true;
        }
    }
    return false;
}

export default autenticar;