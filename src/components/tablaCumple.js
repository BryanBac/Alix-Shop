import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "@/styles/Tabla.module.css";

export default function TablaCumple({ data, id }) {
  return (
    <>
      <div className="scroller">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 480 }} aria-label="caption table">
            <TableHead className={styles.colorOne}>
              <TableRow>
                <TableCell align="right">
                  <div className={styles.celdaRow}>Producto</div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="right">
                    <div className={index===id?styles.celdaRowCumple: styles.celdaRow}>{row}</div>
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
