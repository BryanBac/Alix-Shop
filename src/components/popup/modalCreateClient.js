import styles from '@/styles/ModalCC.module.css'
import { useState } from 'react';
import enviar from '@/pages/api/firebase/post-data';

export default function CreateClientModal(props) {
    const {  openPopUp, setOpenPopUp, agregado, setAgregado } = props
    const [nombre, setNombre] = useState("")
    const [username, setUserName] = useState("")
    const [identificador, setIdentificador] = useState("")
    const [contacto, setContacto] = useState("")
    const [cant_pedidos, setCantPedidos] = useState(0)
    return (<>
        <div>
            <div className={styles.titulos}>Nombre</div>
            <input
                className={styles.input}
                type="text"
                onChange={(e) => setNombre(e.target.value)}
                value={nombre}
            ></input>
        </div>
        <div>
            <div className={styles.titulos}>Username</div>
            <input
                className={styles.input}
                type="text"
                onChange={(e) => setUserName(e.target.value)}
                value={username}
            ></input>
        </div>
        <div>
            <div className={styles.titulos}>Dirección</div>
            <input
                className={styles.input}
                type="text"
                onChange={(e) => setIdentificador(e.target.value)}
                value={identificador}
            ></input>
        </div>
        <div>
            <div className={styles.titulos}>Número de Telefono</div>
            <input
                className={styles.input}
                type="text"
                onChange={(e) => setContacto(e.target.value)}
                value={contacto}
            ></input>
        </div>
        <div className={styles.centrar}>
            <button
                className={styles.boton}
                type=""
                onClick={() => {
                    setOpenPopUp(false);
                }}
            >
                Cancelar
            </button>
            <button
                className={styles.boton2}
                type=""
                onClick={() => {
                    enviar("clientes", {
                        nombre: nombre,
                        username: username,
                        direccion: identificador,
                        cant_pedidos: 0,
                        telefono: contacto
                    })
                    setAgregado(!agregado)
                    setOpenPopUp(false);
                }}
            >
                Aceptar
            </button>
        </div>
    </>)
}