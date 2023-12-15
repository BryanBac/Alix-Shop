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
import BarChart from "@/components/chart/barChar";

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
  // para las graficas
  const [valores, setValores] = useState([])
  const [valores2, setValores2] = useState([])
  const [valores3, setValores3] = useState([])
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
  // para los permisos
  const [permisos, setPermisos] = useState(() => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const all = sessionStorage.getItem('permisos');
      return JSON.parse(all)
    } else {
      return []
    }
  })
  useEffect(() => {
    if (permisos.length > 0) {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        if (permisos.includes("Ver Finanzas")) {

        } else {
          router.replace("/inicio")
        }
      }
    }
  }, [permisos])
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
        if (typeof pedidosMes[i].anticipo == "string") {
          anti += Number(pedidosMes[i].anticipo)
        } else {
          anti += pedidosMes[i].anticipo
        }
      }
      setPrecioTotal(t)
      setCostoTotal(c)
      setAnticipos(anti)
      setGanancia(t - c)
      setGReal(anti - c)
    } else {
      setPrecioTotal(0)
      setCostoTotal(0)
      setAnticipos(0)
      setGanancia(0)
      setGReal(0)
    }
  }, [pedidosMes, fecha])

  useEffect(() => {
    if (aliexpress.length >= 0) {
      let enero = 0;
      let febrero = 0;
      let marzo = 0;
      let abri = 0;
      let mayo = 0;
      let junio = 0;
      let julio = 0;
      let agosto = 0;
      let sept = 0;
      let oct = 0;
      let nov = 0;
      let dic = 0;
      const listaFiltrada = aliexpress.filter((item) => {
        // Suponemos que el formato de fechaPedido es dd/mm/yyyy
        const [d, m, a] = item.fechaPedido.split('/');
        if (m == "1") {
          enero += 1;
        } else if (m == "2") {
          febrero += 1;
        } else if (m == "3") {
          marzo += 1;
        } else if (m == "4") {
          abri += 1;
        } else if (m == "5") {
          mayo += 1;
        } else if (m == "6") {
          junio += 1;
        } else if (m == "7") {
          julio += 1;
        } else if (m == "8") {
          agosto += 1;
        } else if (m == "9") {
          sept += 1;
        } else if (m == "10") {
          oct += 1;
        } else if (m == "11") {
          nov += 1;
        } else if (m == "12") {
          dic += 1;
        }
      });
      let va = [enero, febrero, marzo, abri, mayo, junio, julio, agosto, sept, oct, nov, dic]
      setValores(va)
    }
    if (stock.length >= 0) {
      let enero = 0;
      let febrero = 0;
      let marzo = 0;
      let abri = 0;
      let mayo = 0;
      let junio = 0;
      let julio = 0;
      let agosto = 0;
      let sept = 0;
      let oct = 0;
      let nov = 0;
      let dic = 0;
      const listaFiltrada = stock.filter((item) => {
        // Suponemos que el formato de fechaPedido es dd/mm/yyyy
        const [d, m, a] = item.fechaPedido.split('/');
        if (m == "1") {
          enero += 1;
        } else if (m == "2") {
          febrero += 1;
        } else if (m == "3") {
          marzo += 1;
        } else if (m == "4") {
          abri += 1;
        } else if (m == "5") {
          mayo += 1;
        } else if (m == "6") {
          junio += 1;
        } else if (m == "7") {
          julio += 1;
        } else if (m == "8") {
          agosto += 1;
        } else if (m == "9") {
          sept += 1;
        } else if (m == "10") {
          oct += 1;
        } else if (m == "11") {
          nov += 1;
        } else if (m == "12") {
          dic += 1;
        }
      });
      let va = [enero, febrero, marzo, abri, mayo, junio, julio, agosto, sept, oct, nov, dic]
      setValores2(va)
    }
    if (shein.length >= 0) {
      let enero = 0;
      let febrero = 0;
      let marzo = 0;
      let abri = 0;
      let mayo = 0;
      let junio = 0;
      let julio = 0;
      let agosto = 0;
      let sept = 0;
      let oct = 0;
      let nov = 0;
      let dic = 0;
      const listaFiltrada = shein.filter((item) => {
        // Suponemos que el formato de fechaPedido es dd/mm/yyyy
        const [d, m, a] = item.fechaPedido.split('/');
        if (m == "1") {
          enero += 1;
        } else if (m == "2") {
          febrero += 1;
        } else if (m == "3") {
          marzo += 1;
        } else if (m == "4") {
          abri += 1;
        } else if (m == "5") {
          mayo += 1;
        } else if (m == "6") {
          junio += 1;
        } else if (m == "7") {
          julio += 1;
        } else if (m == "8") {
          agosto += 1;
        } else if (m == "9") {
          sept += 1;
        } else if (m == "10") {
          oct += 1;
        } else if (m == "11") {
          nov += 1;
        } else if (m == "12") {
          dic += 1;
        }
      });
      let va = [enero, febrero, marzo, abri, mayo, junio, julio, agosto, sept, oct, nov, dic]
      setValores3(va)
    }
  }, [aliexpress, stock, shein])

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
          <div className={styles.grafica}><TablaFinanza data={pedidosMes}></TablaFinanza></div>
          <div>
            <BarChart
              valores={valores}
              etiquetas={["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]}
              nombre="AliExpress"
              valores2={valores2}
              nombre2="Stock"
              valores3={valores3}
              nombre3="Shein"></BarChart>
          </div>
          <div className={styles.grid3}>
            <div className={styles.valores}>Precios:  {precioTotal}</div>
            <div className={styles.valores}>Anticipos:  {anticipos}</div>
            <div className={styles.valores}>Costos:  {costoTotal}</div>
            <div className={styles.valores}>Ganancia Real:  {gReal}</div>
            <div className={styles.valores}>Ganancia Esperada:  {ganancia}</div>
          </div>
        </div>
      </div>
    </>
  )
}