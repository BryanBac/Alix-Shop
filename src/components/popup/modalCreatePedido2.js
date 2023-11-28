import styles from '@/styles/ModalCC.module.css'

export default function CreatePedidoModal2(props) {
    const { setOpenPopUp } = props
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
                }}
            >
                Aceptar
            </button>
        </div>
    </>)
}