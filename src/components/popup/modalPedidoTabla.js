import styles from '@/styles/ModalImagen.module.css'
import TablaUsuario from '../tablaPedidosUsuario';

export default function ModalPedido(props) {
    const { setOpenPopUp, data } = props
    return (<>
        <div>
            <TablaUsuario data={data}></TablaUsuario>
        </div>
        <div className={styles.centrar}>
            <button
                className={styles.boton}
                type=""
                onClick={() => {
                    setOpenPopUp(false);
                }}
            >
                Cerrar
            </button>
        </div>
    </>)
}