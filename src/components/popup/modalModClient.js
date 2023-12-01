import styles from '@/styles/ModalCC.module.css'
import modificarDocumento from '@/pages/api/firebase/update-data';

export default function ModclientModal(props) {
    const { setOpenPopUp, agregado, setAgregado, id, nombre, setNombre, username, setUserName, direccion, setDireccion, telefono, setTelefono } = props
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
                onChange={(e) => setDireccion(e.target.value)}
                value={direccion}
            ></input>
        </div>
        <div>
            <div className={styles.titulos}>Número de Telefono</div>
            <input
                className={styles.input}
                type="text"
                onChange={(e) => setTelefono(e.target.value)}
                value={telefono}
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
                    modificarDocumento(id, "clientes", {
                        nombre: nombre,
                        username: username,
                        direccion: direccion,
                        cant_pedidos: 0,
                        telefono: telefono
                    }).then(() => {
                        setAgregado(!agregado)
                        setOpenPopUp(false);
                    })
                }}
            >
                Aceptar
            </button>
        </div>
    </>)
}