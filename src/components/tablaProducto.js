import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from '@/styles/Tabla.module.css'

export default function TablaProductos({ data }) {
    return (
        <>
            <div className="scroller">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 480 }} aria-label="caption table">
                        <TableHead className={styles.colorOne}>
                            <TableRow>
                                <TableCell align="right">
                                    <div className={styles.celdaRow}>
                                        Producto
                                    </div>
                                </TableCell>
                                <TableCell align="right">
                                    <div className={styles.celdaRow}>
                                        Costo
                                    </div>
                                </TableCell>
                                <TableCell align="right">
                                    <div className={styles.celdaRow}>
                                        Precio
                                    </div>
                                </TableCell>
                                <TableCell align="right">
                                    <div className={styles.celdaRow}>
                                        Codigo Aliexpress
                                    </div>
                                </TableCell>
                                <TableCell align="right">
                                    <div className={styles.celdaRow}>
                                        Codigo Correo
                                    </div>
                                </TableCell>
                                <TableCell align="right">
                                    <div className={styles.celdaRow}>
                                        Codigo Rastreo
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell align="right">
                                        <div className={styles.celdaRow}>
                                            {row.producto}
                                        </div>
                                    </TableCell>
                                    <TableCell align="right">
                                        <div className={styles.celdaRow}>
                                            {row.costo}
                                        </div>
                                    </TableCell>
                                    <TableCell align="right">
                                        <div className={styles.celdaRow}>
                                            {row.precio}
                                        </div>
                                    </TableCell>
                                    <TableCell align="right">
                                        <div className={styles.celdaRow}>
                                            {row.codeAli}
                                        </div>
                                    </TableCell>
                                    <TableCell align="right">
                                        <div className={styles.celdaRow}>
                                            {row.codeMail}
                                        </div>
                                    </TableCell>
                                    <TableCell align="right">
                                        <div className={styles.celdaRow}>
                                            {row.codeRastreo}
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