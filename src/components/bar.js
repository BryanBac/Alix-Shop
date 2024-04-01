import { useEffect, useState } from "react";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import styles from '@/styles/Bar.module.css'
import DehazeIcon from '@mui/icons-material/Dehaze';
import DropdownRoute from "./dropdownRoute";

export default function Bar({ isDarkMode, setIsDarkMode }) {
    const [opciones, setOpciones] = useState(["Inicio", "Clientes", "Ver Pedidos", "Crear Pedidos", "Finanzas", "Usuarios y Permisos", "Cerrar Sesión"])
    const [modoC, setModoC] = useState("");
    // para los permisos
    const [permisos, setPermisos] = useState(() => {
        if (typeof window !== 'undefined' && window.sessionStorage) {
            const all = sessionStorage.getItem('permisos');
            return JSON.parse(all)
        } else {
            return []
        }
    })
    useEffect(()=>{
        if(permisos.length>0){
            let list = []
            list.push("Inicio")
            if(permisos.includes("Ver Clientes")){
                list.push("Clientes")
            }
            if(permisos.includes("Ver Pedido")){
                list.push("Ver Pedidos")
            }
            if(permisos.includes("Crear Pedido")){
                list.push("Crear Pedidos")
            }
            if(permisos.includes("Ver Finanzas")){
                list.push("Finanzas")
            }
            if(permisos.includes("Ver Usuarios")){
                list.push("Usuarios y Permisos")
            }
            if(permisos.includes("Cumpleaños")){
                list.push("Cumpleaños")
            }
            list.push("Cerrar Sesión")
            setOpciones(list)
        }
    },[permisos])
    useEffect(() => {
        document.documentElement.style.setProperty('--identicolor', 'rgb(194, 156, 200, 0.8)');
        if (typeof window !== 'undefined' && window.sessionStorage) {
            setModoC(sessionStorage.getItem("modo"))
            const root = document.documentElement;
            if (sessionStorage.getItem("modo") == "false") {
                setIsDarkMode(false)
                root.style.setProperty('--background-color', '#f4eeee');
                root.style.setProperty('--text-color', '#333');

            } else {
                setIsDarkMode(true)
                root.style.setProperty('--background-color', '#333');
                root.style.setProperty('--text-color', '#f4eeee');
            }
        }
    }, [])

    const cambiarColor = () => {
        if (typeof window !== 'undefined' && window.sessionStorage) {
            const root = document.documentElement;
            console.log(sessionStorage.getItem("modo"))
            if (modoC === "false") {
                root.style.setProperty('--background-color', '#333');
                root.style.setProperty('--text-color', '#f4eeee');
                sessionStorage.setItem("modo", "true")
                setModoC("true")
            } else {
                root.style.setProperty('--background-color', '#f4eeee');
                root.style.setProperty('--text-color', '#333');
                sessionStorage.setItem("modo", "false")
                setModoC("false")
            }
            setIsDarkMode(!isDarkMode)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.menu}>
                <DropdownRoute options={opciones} isDarkMode={isDarkMode}></DropdownRoute>
            </div>
            <div className={styles.barraColor}></div>
            <div className={styles.cambioModo}>
                {!isDarkMode && <button className="boton-sin" onClick={() => cambiarColor()}><DarkModeIcon></DarkModeIcon></button>}
                {isDarkMode && <button className="boton-sin" style={{ color: 'white' }} onClick={() => cambiarColor()}><WbSunnyIcon></WbSunnyIcon></button>}
            </div>
        </div>
    )
}