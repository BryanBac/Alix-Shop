import Bar from "@/components/bar";
import { useState, useEffect } from "react";
import Head from 'next/head'
import obtener from './api/firebase/get-data'
import DateCalendarValue from "@/components/datePicker";
import TablaFinanza from "@/components/tablaFinanza";
import styles from '@/styles/Finanza.module.css'
import { onAuthStateChanged } from 'firebase/auth';
import { authG } from "../../firebase";
import { useRouter } from "next/router";

const checkAuth = (callback) => {
    return onAuthStateChanged(authG, (user) => {
      callback(user);
    });
};


export default function VerClientes() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [aliexpress, setAliexpress] = useState([])
  const [shein, setShein] = useState([])
  const [stock, setStock] = useState([])
  // creo que para datos
  const [precioTotal, setPrecioTotal] = useState(0)
  const [costoTotal, setCostoTotal] = useState(0)
  const [anticipos, setAnticipos] = useState(0)
  const [ganancia, setGanancia] = useState(0)
  const [gReal, setGReal] = useState(0)
  // fechas
  const [mes, setMes] = useState("")
  const [año, setAño] = useState("")
  const [fecha, setFecha] = useState("")
  // las listas
  const [allData, setAllData] = useState([])
  const [pedidosMes, setPedidosMes] = useState([])
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = checkAuth((user) => {
      if (!user) {
        // Redirect to the login page if the user is not logged in
        router.replace('/');
      }
    });

    return () => unsubscribe();
  }, []);
  const obtenerListaFiltrada = (listaCompleta, mes, año) => {
    const listaFiltrada = listaCompleta.filter((item) => {
      // Suponemos que el formato de fechaPedido es dd/mm/yyyy
      const [d, m, a] = item.fechaPedido.split('/');
      if (mes == m && año == a) {
        return item;
      }
    });

    return listaFiltrada;
  };

  const fetchAliexpress = async () => {
    try {
      const result = await obtener("Aliexpress");
      setAliexpress(result);
    } catch (error) {
      // Handle the error if needed
      console.error("Error fetching data:", error);
    }
  };
  const fetchShein = async () => {
    try {
      const result = await obtener("Shein");
      setShein(result);
    } catch (error) {
      // Handle the error if needed
      console.error("Error fetching data:", error);
    }
  };
  const fetchStock = async () => {
    try {
      const result = await obtener("Stock");
      setStock(result);
    } catch (error) {
      // Handle the error if needed
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const [d, m, a] = fecha.split('/');
    setMes(m)
    setAño(a)
  }, [fecha])

  useEffect(() => {
    fetchAliexpress()
    fetchShein()
    fetchStock();
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    setMes(currentMonth.toString())
    setAño(currentYear.toString())
  }, [])

  useEffect(() => {
    if (aliexpress.length > 0 && shein.length > 0 && stock.length > 0) { // si los 3 ya están
      const combinedArray = [...aliexpress, ...shein, ...stock]
      const reordenArray = combinedArray.sort((a, b) => b.contador - a.contador);
      setAllData(reordenArray)
    } else if (aliexpress.length > 0 && shein.length <= 0 && stock.length <= 0) { // si ali express ya, pero los demás no
      const reordenArray = aliexpress.sort((a, b) => b.contador - a.contador);
      setAllData(reordenArray)
    } else if (aliexpress.length <= 0 && shein.length > 0 && stock.length <= 0) {
      const reordenArray = shein.sort((a, b) => b.contador - a.contador);
      setAllData(reordenArray)
    } else if (aliexpress.length <= 0 && shein.length <= 0 && stock.length > 0) {
      const reordenArray = stock.sort((a, b) => b.contador - a.contador);
      setAllData(reordenArray)
    } else if (aliexpress.length > 0 && shein.length > 0 && stock.length <= 0) {
      const combinedArray = [...aliexpress, ...shein]
      const reordenArray = combinedArray.sort((a, b) => b.contador - a.contador);
      setAllData(reordenArray)
    } else if (aliexpress.length > 0 && shein.length <= 0 && stock.length > 0) {
      const combinedArray = [...aliexpress, ...stock]
      const reordenArray = combinedArray.sort((a, b) => b.contador - a.contador);
      setAllData(reordenArray)
    } else if (aliexpress.length <= 0 && shein.length > 0 && stock.length > 0) {
      const combinedArray = [...shein, ...stock]
      const reordenArray = combinedArray.sort((a, b) => b.contador - a.contador);
      setAllData(reordenArray)
    } else {
      setAllData([])
    }
  }, [aliexpress, shein, stock])

  useEffect(() => {
    if (allData.length > 0) {
      console.log("Mes: ", typeof mes, mes, "Año: ", typeof año, año)
      console.log("Info", allData)
      setPedidosMes(obtenerListaFiltrada(allData, mes, año))
    }
  }, [allData, mes, año])

  useEffect(() => {
    if (pedidosMes.length > 0) {
      let t = 0;
      let c = 0;
      let anti = 0
      for (let i = 0; i < pedidosMes.length; i++) {
        t += pedidosMes[i].precioTotal;
        c += pedidosMes[i].costoTotal;
        if(typeof pedidosMes[i].anticipo == "string"){
          anti += Number(pedidosMes[i].anticipo)
        }else{
          anti += pedidosMes[i].anticipo
        }
      }
      setPrecioTotal(t)
      setCostoTotal(c)
      setAnticipos(anti)
      setGanancia(t - c)
      setGReal(anti-c)
    }else{
      setPrecioTotal(0)
      setCostoTotal(0)
      setAnticipos(0)
      setGanancia(0)
      setGReal(0)
    }
  }, [pedidosMes, fecha])

  return (
    <>
      <Head>
        <title>Alix Shop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logo.ico" />
      </Head>
      <Bar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}></Bar>
      <div className={styles.superContainer}>
        <div className={styles.container}>
          <DateCalendarValue setValue={setFecha} name="Mes y Año"></DateCalendarValue>
          <TablaFinanza data={pedidosMes}></TablaFinanza>
          <div className={styles.grid3}>
            <div className={styles.valores}>Precios:  {precioTotal}</div>
            <div className={styles.valores}>Costos:  {costoTotal}</div>
            <div className={styles.valores}>Anticipos:  {anticipos}</div>
            <div className={styles.valores}>Ganancia Esperada:  {ganancia}</div>
            <div className={styles.valores}>Ganancia Real:  {gReal}</div>
          </div>
        </div>
      </div>
    </>
  )
}