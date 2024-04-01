import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "@/styles/Tabla.module.css";

export default function TablaCumple({ data, id, selected }) {
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
                  {selected === false && (
                    <TableCell align="right">
                      <div
                        className={
                          index === id ? styles.celdaRowCumple : styles.celdaRow
                        }
                      >
                        {row}
                      </div>
                    </TableCell>
                  )}
                  {selected && (
                    <div
                      className={
                        index === id ? styles.celdaRowCumple2 : styles.celdaRow
                      }
                    >
                      {row}
                    </div>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
