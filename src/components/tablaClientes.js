import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from '@/styles/Tabla.module.css'

export default function TablaClientes({ data }) {
    return (
        <>
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
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}