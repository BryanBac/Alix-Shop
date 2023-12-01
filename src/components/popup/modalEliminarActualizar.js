import styles from '@/styles/ModalCC.module.css'
import { useRouter } from 'next/router';
import eliminarDocumento from '@/pages/api/firebase/delete-data';

export default function EliminarActualizar(props) {
    const { setOpenPopUp, id, coleccion, ruta, actualizar, setActualizar } = props
    console.log(id)
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
                        setActualizar(true)
                        setOpenPopUp(false);
                    })
                }}
            >
                Aceptar
            </button>
        </div>
    </>)
}