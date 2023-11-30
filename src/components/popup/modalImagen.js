import styles from '@/styles/ModalImagen.module.css'

export default function ModalImagen(props) {
    const { setOpenPopUp, preview } = props
    return (<>
        <div>
            <img
                src={preview}
                className={styles.imagen}
            ></img>
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