import styles from '@/styles/ModalCC.module.css'
import { useRouter } from 'next/router';

export default function CreatePedidoModal(props) {
    const { setOpenPopUp } = props
    const router = useRouter()
    return (<>
        <div>
            <div className={styles.titulos}>¡Pedido agregado con éxito!</div>
        </div>
        <div className={styles.centrar}>
            <button
                className={styles.boton}
                type=""
                onClick={() => {
                    setOpenPopUp(false);
                    router.push("verPedidos")
                }}
            >
                Aceptar
            </button>
        </div>
    </>)
}