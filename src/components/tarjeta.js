import styles from '@/styles/Tarjeta.module.css'
import { useRouter } from 'next/router'

export default function Tarjeta({ numero, nombre,  fecha, origen, idPedido }) {
    const router = useRouter()
    const setear = () => {
        if (typeof window !== 'undefined' && window.sessionStorage) {
            sessionStorage.setItem("idPedido", idPedido)
            sessionStorage.setItem("origenPedido", origen)
            router.push("verPedido")
        }
    }

    return (
        <div className={styles.container} onClick={() => setear()}>
            <div className={styles.left}>
                {numero}
            </div>
            <div className={styles.right}>
                <div className={styles.hijo1}>
                    {fecha}
                </div>
                <div className={styles.hijo2}>
                    {nombre}
                </div>
                <div className={styles.hijo3}>
                    {origen}
                </div>
            </div>
        </div>
    )
}