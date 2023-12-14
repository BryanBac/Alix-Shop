import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import ModclientModal from "./popup/modalModClient";
import ModalPopUp from "./popup/popup";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from '@/styles/Tabla.module.css'
import { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EliminarActualizar from "./popup/modalEliminarActualizar";

export default function TablaClientes({ data, setActualizado }) {
    const [nombre, setNombre] = useState("")
    const [username, setUserName] = useState("")
    const [direccion, setDireccion] = useState("")
    const [telefono, setTelefono] = useState("")
    const [openPopUp, setOpenPopUp] = useState(false)
    const [openPopUp2, setOpenPopUp2] = useState(false)
    const [actualizar, setActualizar] = useState(false)
    // para los permisos
    const [permisos, setPermisos] = useState(() => {
        if (typeof window !== 'undefined' && window.sessionStorage) {
            const all = sessionStorage.getItem('permisos');
            return JSON.parse(all)
        } else {
            return []
        }
    })
    const [id, setId] = useState("")
    const editar = (n, u, d, t, i) => {
        setNombre(n)
        setUserName(u)
        setDireccion(d)
        setTelefono(t)
        setId(i)
        setOpenPopUp(true)
    }
    const eliminar = (id) => {
        setId(id)
        setOpenPopUp2(true)
    }
    useEffect(() => {
        if (actualizar == true) {
            setActualizado(true)
            setActualizar(false)
        }
    }, [actualizar])
    return (
        <>
            <ModalPopUp
                openPopUp={openPopUp}
                setOpenPopUp={setOpenPopUp}
            >
                <ModclientModal
                    nombre={nombre} setNombre={setNombre}
                    username={username} setUserName={setUserName}
                    direccion={direccion} setDireccion={setDireccion}
                    telefono={telefono} setTelefono={setTelefono}
                    id={id}
                    agregado={actualizar} setAgregado={setActualizar}
                >
                </ModclientModal>
            </ModalPopUp>
            <ModalPopUp
                openPopUp={openPopUp2}
                setOpenPopUp={setOpenPopUp2}
            >
                <EliminarActualizar id={id} coleccion="clientes" ruta="verClientes" actualizar={actualizar} setActualizar={setActualizar}></EliminarActualizar>
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
                                        Username
                                    </div>
                                </TableCell>

                                <TableCell align="right">
                                    <div className={styles.celdaRow}>
                                        Dirección
                                    </div>
                                </TableCell>
                                <TableCell align="right">
                                    <div className={styles.celdaRow}>
                                        Teléfono
                                    </div>
                                </TableCell>
                                {permisos.includes("Editar Clientes") &&
                                    <TableCell align="right">
                                        <div className={styles.celdaRow}>
                                            Editar
                                        </div>
                                    </TableCell>
                                }
                                {permisos.includes("Eliminar Clientes") &&
                                    <TableCell align="right">
                                        <div className={styles.celdaRow}>
                                            Eliminar
                                        </div>
                                    </TableCell>
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell align="right">
                                        <div className={styles.celdaRow}>
                                            {row.nombre}
                                        </div>
                                    </TableCell>
                                    <TableCell align="right">
                                        <div className={styles.celdaRow}>
                                            {row.username}
                                        </div>
                                    </TableCell>
                                    <TableCell align="right">
                                        <div className={styles.celdaRow}>
                                            {row.direccion}
                                        </div>
                                    </TableCell>
                                    <TableCell align="right">
                                        <div className={styles.celdaRow}>
                                            {row.telefono}
                                        </div>
                                    </TableCell>
                                    {permisos.includes("Editar Clientes") &&
                                        <TableCell align="right">
                                            <button onClick={() => editar(row.nombre, row.username, row.direccion, row.telefono, row.id)} className="boton-sin"><EditIcon></EditIcon></button>
                                        </TableCell>
                                    }
                                    {permisos.includes("Eliminar Clientes") &&
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