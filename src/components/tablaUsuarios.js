import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from '@/styles/Tabla.module.css'
import ModalPopUp from "./popup/popup";
import EliminarPedido from "./popup/modalEliminarPedido";
import EliminarActualizar from "./popup/modalEliminarActualizar";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';


export default function TablaUsuarios({ data, setActualizado }) {
    const [openPopUp, setOpenPopUp] = useState(false)
    const [idUsuario, setIdUsuario] = useState("")
    const [actualizar, setActualizar] = useState(false)
    const eliminar = (id) => {
        setIdUsuario(id)
        setOpenPopUp(true)
    }
    useEffect(() => {
        if (actualizar == true) {
            setActualizado(true)
            setActualizar(false)
        }
    }, [actualizar])
    // para los permisos
    const [permisos, setPermisos] = useState(() => {
        if (typeof window !== 'undefined' && window.sessionStorage) {
            const all = sessionStorage.getItem('permisos');
            return JSON.parse(all)
        } else {
            return []
        }
    })
    return (
        <>
            <ModalPopUp
                openPopUp={openPopUp}
                setOpenPopUp={setOpenPopUp}
            >
                <EliminarActualizar id={idUsuario} coleccion="usuarios" ruta="configuracion" actualizar={actualizar} setActualizar={setActualizar}></EliminarActualizar>
            </ModalPopUp>
            <div className="scroller">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 480 }} aria-label="caption table">
                        <TableHead className={styles.colorOne}>
                            <TableRow>
                                <TableCell align="right">
                                    <div className={styles.celdaRow}>
                                        Nombre
                                    </div>
                                </TableCell>
                                <TableCell align="right">
                                    <div className={styles.celdaRow}>
                                        Correo
                                    </div>
                                </TableCell>
                                {permisos.includes("Eliminar Usuarios") &&
                                    <TableCell align="right">
                                    </TableCell>
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell align="right">
                                        <div className={styles.celdaRow}>
                                            {row.usuario}
                                        </div>
                                    </TableCell>
                                    <TableCell align="right">
                                        <div className={styles.celdaRow}>
                                            {row.email}
                                        </div>
                                    </TableCell>
                                    {permisos.includes("Eliminar Usuarios") &&
                                        <TableCell align="right">
                                            <button onClick={() => eliminar(row.id)} className="boton-sin"><DeleteIcon></DeleteIcon></button>
                                        </TableCell>
                                    }
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}