import { useEffect, useState } from 'react';
import styles from '@/styles/Dropdown.module.css'
import DehazeIcon from '@mui/icons-material/Dehaze';
import { signOut } from 'firebase/auth';
import { authG } from '../../firebase';
import { useRouter } from 'next/router';

export default function DropdownRoute({ options, isDarkMode }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const router = useRouter();
    const handleLogout = async () => {
        try {
            await signOut(authG);
            router.replace('/');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    const handleSelect = (option) => {
        if(option=="Inicio"){
            router.push("inicio");
        }else if(option=="Clientes"){
            router.push("verClientes");
        }else if(option=="Ver Pedidos"){
            router.push("verPedidos");
        }else if(option=="Crear Pedidos"){
            router.push("crearPedido");
        }else if(option=="Finanzas"){
            router.push("finanza");
        }else if(option=="Configurción"){
            router.push("configuracion");
        }else if(option=="Cerrar Sesión"){
            handleLogout();
        }else{
            
        }
        setSelectedOption(option);
        
    };

    return (
        <div className={styles.dropdown}>
            <button className="boton-sin"><DehazeIcon style={{ color: isDarkMode ? 'white' : 'black' }}></DehazeIcon></button>
            <ul className={styles.dropdownList}>
                {options.map((option) => (
                    <li key={option} onClick={() => handleSelect(option)}>
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
};
