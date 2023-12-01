import styles from '@/styles/ModalCC.module.css'
import { useRouter } from 'next/router';

export default function MensajeModal(props) {
    const { setOpenPopUp, mensaje } = props
    const router = useRouter()
    return (<>
        <div>
            <div className={styles.titulos}>{mensaje}</div>
            
        </div>
        <div className={styles.centrar}>
            <button
                className={styles.boton}
                type=""
                onClick={() => {
                    setOpenPopUp(false);
                }}
            >
                Aceptar
            </button>
        </div>
    </>)
}