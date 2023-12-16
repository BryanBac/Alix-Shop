import styles from '@/styles/ModalCC.module.css'
import { useRouter } from 'next/router';

export default function CreatePedidoModal(props) {
    const { setOpenPopUp, mensaje, numeroPedido } = props
    const router = useRouter()
    return (<>
        <div>
            <div className={styles.titulos}>Pedido #{numeroPedido}</div>
            <div className={styles.titulos}>{mensaje}</div>
            
        </div>
        <div className={styles.centrar}>
            <button
                className={styles.boton}
                type=""
                onClick={() => {
                    setOpenPopUp(false);
                    router.push("inicio")
                }}
            >
                Aceptar
            </button>
        </div>
    </>)
}