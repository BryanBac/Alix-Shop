import styles from '@/styles/ModalCC.module.css'

export default function CreatePedidoModal2(props) {
    const { setOpenPopUp, mensaje, numeroPedido } = props
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
                }}
            >
                Aceptar
            </button>
        </div>
    </>)
}