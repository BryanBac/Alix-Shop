import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "@/styles/Tabla.module.css";

export default function TablaFinanza({ data }) {
  // esta es la que me sirve para ver lo de todos los pedidos del mes
  const calcularColor = (diferencia) => {
    return diferencia > 0 ? "ganancia" : diferencia < 0 ? "perdida" : "neutro";
  };
  return (
    <>
      <div className="scroller">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 480 }} aria-label="caption table">
            <TableHead className={styles.colorOne}>
              <TableRow>
                <TableCell align="right">
                  <div className={styles.celdaRow}>Fecha</div>
                </TableCell>
                <TableCell align="right">
                  <div className={styles.celdaRow}>Cliente</div>
                </TableCell>
                <TableCell align="right">
                  <div className={styles.celdaRow}>Costo Total</div>
                </TableCell>
                <TableCell align="right">
                  <div className={styles.celdaRow}>Precio Total</div>
                </TableCell>
                <TableCell align="right">
                  <div className={styles.celdaRow}>Anticipo</div>
                </TableCell>
                <TableCell align="right">
                  <div className={styles.celdaRow}>Restante/Debe</div>
                </TableCell>
                <TableCell align="right">
                  <div className={styles.celdaRow}>
                    Ganacia/Perdida Esperada
                  </div>
                </TableCell>
                <TableCell align="right">
                  <div className={styles.celdaRow}>Ganacia/Perdida Real</div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="right">
                    <div className={styles.celdaRow}>{row.fechaPedido}</div>
                  </TableCell>
                  <TableCell align="right">
                    <div className={styles.celdaRow}>{row.clienteNombre}</div>
                  </TableCell>
                  <TableCell align="right">
                    <div className={styles.celdaRow}>{row.costoTotal}</div>
                  </TableCell>
                  <TableCell align="right">
                    <div className={styles.celdaRow}>{row.precioTotal}</div>
                  </TableCell>
                  <TableCell align="right">
                    <div className={styles.celdaRow}>{row.anticipo}</div>
                  </TableCell>
                  <TableCell align="right">
                    <div className={styles.celdaRow}>
                      {row.precioTotal - row.anticipo}
                    </div>
                  </TableCell>
                  <TableCell align="right">
                    <div
                      className={`${styles.celdaRow} ${
                        styles[calcularColor(row.precioTotal - row.costoTotal)]
                      }`}
                    >
                      {row.precioTotal - row.costoTotal}
                    </div>
                  </TableCell>
                  <TableCell align="right">
                    <div
                      className={`${styles.celdaRow} ${
                        styles[calcularColor(row.anticipo - row.costoTotal)]
                      }`}
                    >
                      {row.anticipo - row.costoTotal}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
