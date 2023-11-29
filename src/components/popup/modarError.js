import styles from '@/styles/ModalCC.module.css'

export default function ErrorModal(props) {
    const { setOpenPopUp, error } = props
    return (<>
        <div>
            <div className={styles.titulosError}>{error}</div>
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