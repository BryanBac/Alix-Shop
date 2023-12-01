import styles from '@/styles/ModalCC.module.css'
import { useRouter } from 'next/router';
import eliminarDocumento from '@/pages/api/firebase/delete-data';

export default function EliminarPedido(props) {
    const { setOpenPopUp, id, coleccion } = props
    const router = useRouter()
    return (<>
        <div>
            <div className={styles.titulos}>¿Seguro que desea Eliminar?</div>
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
                    eliminarDocumento(coleccion, id).then(() => {
                        setOpenPopUp(false);
                        router.push("verPedidos")
                    })
                }}
            >
                Aceptar
            </button>
        </div>
    </>)
}