import styles from '@/styles/Dropdown.module.css'
import obtener from '@/pages/api/firebase/get-data';
import { useState, useEffect } from "react";

export default function DropdownFiltered({ onSelect, setClienteNombre, clienteNombre,setClienteTelefono, setClienteDirección,username, setUsername }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [clientes, setClientes] = useState([])
    const [buscar, setBuscar] = useState([])
    const [nombre, setNombre] = useState("")
    const filtrarPedidos = (valorBusqueda) => {
        return clientes.filter(cliente =>
            cliente.nombre.toLowerCase().includes(valorBusqueda.toLowerCase()) ||
            cliente.username.toLowerCase().includes(valorBusqueda.toLowerCase()) 
        );
    };

    useEffect(()=>{
        setNombre(clienteNombre)
    },[clienteNombre])

    const fetchData = async () => {
        try {
            const result = await obtener("clientes");
            setClientes(result)
        } catch (error) {
            // Handle the error if needed
            console.error("Error fetching data:", error);
        }
    };

    const Busqueda = (e) => {
        const valor = e.target.value;
        setNombre(valor)
        setBuscar(filtrarPedidos(valor));

    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleSelect = (option) => {
        setSelectedOption(option);
        setNombre(option.nombre)
        setClienteNombre(option.nombre)
        setUsername(option.username)
        setClienteTelefono(option.telefono)
        setClienteDirección(option.direccion)
        onSelect(option.id);
    };

    useEffect(() => {
        setSelectedOption(null); // Limpiar la selección cuando cambia la lista filtrada
    }, [buscar]);

    return (
        <div className={styles.dropdown}>
            <textarea type="text" className={styles.inp} onChange={(e) => Busqueda(e)} value={nombre}></textarea>
            <ul className={styles.dropdownList}>
                {buscar.map((option) => (
                    <li key={option.id} onClick={() => handleSelect(option)}>
                        {option.nombre}
                    </li>
                ))}
            </ul>
        </div>
    );
};

