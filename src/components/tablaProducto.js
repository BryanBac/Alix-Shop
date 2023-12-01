import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from '@/styles/Tabla.module.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";

export default function TablaProductos({ data, setData }) {
    const handleInputChange = (e, rowIndex, key) => {
        const updatedData = data.map((product, index) => {
            if (index === rowIndex) {
                return { ...product, [key]: e.target.value };
            }
            return product;
        });
        setData(updatedData);
    };
    const eliminarFila = (index) => {
        const updatedData = [...data];
        updatedData.splice(index, 1);
        setData(updatedData);
    };
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
                                <TableCell align="right">
                                    <div className={styles.celdaRow}>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, rowIndex) => (
                                <TableRow key={row.id}>
                                    <TableCell align="right">
                                        <textarea value={row.producto} className={styles.celdaRow} onChange={(e)=>{
                                           handleInputChange(e, rowIndex, 'producto')
                                        }}></textarea>
                                    </TableCell>
                                    <TableCell align="right">
                                        <textarea value={row.costo} className={styles.celdaRow} onChange={(e)=>{
                                            handleInputChange(e, rowIndex, 'costo')
                                        }}>
                                        </textarea>
                                    </TableCell>
                                    <TableCell align="right">
                                        <textarea value={row.precio} className={styles.celdaRow} onChange={(e)=>{
                                            handleInputChange(e, rowIndex, 'precio')
                                        }}>
                                        </textarea>
                                    </TableCell>
                                    <TableCell align="right">
                                        <textarea value={row.codeAli} className={styles.celdaRow} onChange={(e)=>{
                                            handleInputChange(e, rowIndex, 'codeAli')
                                        }}>
                                        </textarea>
                                    </TableCell>
                                    <TableCell align="right">
                                        <textarea value={row.codeMail} className={styles.celdaRow} onChange={(e)=>{
                                            handleInputChange(e, rowIndex, 'codeMail')
                                        }}>
                                        </textarea>
                                    </TableCell>
                                    <TableCell align="right">
                                        <textarea value={row.codeRastreo} className={styles.celdaRow} onChange={(e)=>{
                                            handleInputChange(e, rowIndex, 'codeRastreo')
                                        }}>
                                        </textarea>
                                    </TableCell>
                                    <TableCell align="right">
                                        <button onClick={()=>eliminarFila(rowIndex)} className="boton-sin"><DeleteIcon></DeleteIcon></button>
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