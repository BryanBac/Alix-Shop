import Bar from "@/components/bar";
import { useState, useEffect } from "react";
import Head from 'next/head'
import obtener from './api/firebase/get-data'
import styles from '@/styles/VerPedidos.module.css'
import Tarjeta from "@/components/tarjeta";
import CreateClientModal from "@/components/popup/modalCreateClient";
import ModalPopUp from "@/components/popup/popup";
import { useRouter } from "next/router";
import { onAuthStateChanged } from 'firebase/auth';
import { authG } from "../../firebase";

const checkAuth = (callback) => {
  return onAuthStateChanged(authG, (user) => {
    callback(user);
  });
};


export default function VerPedidos() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedSources, setSelectedSources] = useState([]);
  const [aliexpress, setAliexpress] = useState([])
  const [shein, setShein] = useState([])
  const [stock, setStock] = useState([])
  const [buscar, setBuscar] = useState([])
  const [allData, setAllData] = useState([])
  const [agregado, setAgregado] = useState(false)
  const [openPopUp, setOpenPopUp] = useState(false)
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

  const filtrarPedidos = (valorBusqueda) => {
    return buscar.filter(pedido =>
      pedido.clienteNombre.toLowerCase().includes(valorBusqueda.toLowerCase())
    );
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

  const Busqueda = (e) => {
    const valor = e.target.value;
    if (valor != "") {
      setBuscar(filtrarPedidos(valor));
    } else {
      const a = [...aliexpress, ...shein, ...stock]
      const ar = a.sort((a, b) => b.contador - a.contador);
      setAllData(ar)
      if (selectedSources.length == 3) {
        const combinedArray = [...aliexpress, ...shein, ...stock]
        const reordenArray = combinedArray.sort((a, b) => b.contador - a.contador);
        setBuscar(reordenArray)
      }
      else if (selectedSources.length == 2) {
        if ((selectedSources[0] == "Shein" && selectedSources[1] == "AliExpress") || (selectedSources[0] == "AliExpress" && selectedSources[1] == "Shein")) {
          const combinedArray = [...aliexpress, ...shein]
          const reordenArray = combinedArray.sort((a, b) => b.contador - a.contador);
          setBuscar(reordenArray)
        } else if ((selectedSources[0] == "Shein" && selectedSources[1] == "Stock") || (selectedSources[0] == "Stock" && selectedSources[1] == "Shein")) {
          const combinedArray = [...stock, ...shein]
          const reordenArray = combinedArray.sort((a, b) => b.contador - a.contador);
          setBuscar(reordenArray)
        } else {
          const combinedArray = [...stock, ...aliexpress]
          const reordenArray = combinedArray.sort((a, b) => b.contador - a.contador);
          setBuscar(reordenArray)
        }
      } else if (selectedSources.length == 1) {
        if (selectedSources[0] == "AliExpress") {
          const reordenArray = aliexpress.sort((a, b) => b.contador - a.contador);
          setBuscar(reordenArray)
        } else if (selectedSources[0] == "Shein") {
          const reordenArray = shein.sort((a, b) => b.contador - a.contador);
          setBuscar(reordenArray)
        } else if (selectedSources[0] == "Stock") {
          const reordenArray = stock.sort((a, b) => b.contador - a.contador);
          setBuscar(reordenArray)
        } else {
          setBuscar([])
        }
      } else {
        setBuscar([])
      }
    }
  }

  useEffect(() => {
    fetchAliexpress()
    fetchShein()
    fetchStock();
  }, [agregado])

  useEffect(() => {
    const a = [...aliexpress, ...shein, ...stock]
    const ar = a.sort((a, b) => b.contador - a.contador);
    setAllData(ar)
    if (aliexpress.length > 0 && shein.length > 0 && stock.length > 0) { // si los 3 ya están
      const combinedArray = [...aliexpress, ...shein, ...stock]
      const reordenArray = combinedArray.sort((a, b) => b.contador - a.contador);
      setBuscar(reordenArray)
    } else if (aliexpress.length > 0 && shein.length <= 0 && stock.length <= 0) { // si ali express ya, pero los demás no
      const reordenArray = aliexpress.sort((a, b) => b.contador - a.contador);
      setBuscar(reordenArray)
    } else if (aliexpress.length <= 0 && shein.length > 0 && stock.length <= 0) {
      const reordenArray = shein.sort((a, b) => b.contador - a.contador);
      setBuscar(reordenArray)
    } else if (aliexpress.length <= 0 && shein.length <= 0 && stock.length > 0) {
      const reordenArray = stock.sort((a, b) => b.contador - a.contador);
      setBuscar(reordenArray)
    } else if (aliexpress.length > 0 && shein.length > 0 && stock.length <= 0) {
      const combinedArray = [...aliexpress, ...shein]
      const reordenArray = combinedArray.sort((a, b) => b.contador - a.contador);
      setBuscar(reordenArray)
    } else if (aliexpress.length > 0 && shein.length <= 0 && stock.length > 0) {
      const combinedArray = [...aliexpress, ...stock]
      const reordenArray = combinedArray.sort((a, b) => b.contador - a.contador);
      setBuscar(reordenArray)
    } else if (aliexpress.length <= 0 && shein.length > 0 && stock.length > 0) {
      const combinedArray = [...shein, ...stock]
      const reordenArray = combinedArray.sort((a, b) => b.contador - a.contador);
      setBuscar(reordenArray)
    } else {
      setBuscar([])
    }

  }, [aliexpress, shein, stock])

  useEffect(() => {
    const a = [...aliexpress, ...shein, ...stock]
    const ar = a.sort((a, b) => b.contador - a.contador);
    setAllData(ar)
    if (selectedSources.length == 3) {
      const combinedArray = [...aliexpress, ...shein, ...stock]
      const reordenArray = combinedArray.sort((a, b) => b.contador - a.contador);
      setBuscar(reordenArray)
    }
    else if (selectedSources.length == 2) {
      if ((selectedSources[0] == "Shein" && selectedSources[1] == "AliExpress") || (selectedSources[0] == "AliExpress" && selectedSources[1] == "Shein")) {
        const combinedArray = [...aliexpress, ...shein]
        const reordenArray = combinedArray.sort((a, b) => b.contador - a.contador);
        setBuscar(reordenArray)
      } else if ((selectedSources[0] == "Shein" && selectedSources[1] == "Stock") || (selectedSources[0] == "Stock" && selectedSources[1] == "Shein")) {
        const combinedArray = [...stock, ...shein]
        const reordenArray = combinedArray.sort((a, b) => b.contador - a.contador);
        setBuscar(reordenArray)
      } else {
        const combinedArray = [...stock, ...aliexpress]
        const reordenArray = combinedArray.sort((a, b) => b.contador - a.contador);
        setBuscar(reordenArray)
      }
    } else if (selectedSources.length == 1) {
      if (selectedSources[0] == "AliExpress") {
        const reordenArray = aliexpress.sort((a, b) => b.contador - a.contador);
        setBuscar(reordenArray)
      } else if (selectedSources[0] == "Shein") {
        const reordenArray = shein.sort((a, b) => b.contador - a.contador);
        setBuscar(reordenArray)
      } else if (selectedSources[0] == "Stock") {
        const reordenArray = stock.sort((a, b) => b.contador - a.contador);
        setBuscar(reordenArray)
      } else {
        setBuscar([])
      }
    } else {
      setBuscar([])
    }
  }, [selectedSources])

  return (
    <>
      <Head>
        <title>Alix Shop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logo.ico" />
      </Head>
      <Bar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}></Bar>
      <ModalPopUp
        openPopUp={openPopUp}
        setOpenPopUp={setOpenPopUp}
      >
        <CreateClientModal agregado={agregado} setAgregado={setAgregado} ></CreateClientModal>
      </ModalPopUp>
      <div className={styles.superContainer}>
        <div className={styles.container}>
          <div className={styles.barraClientes}>
            <div className={styles.inputC}>
              <div className={styles.square1}>Buscar</div>
              <div className={styles.square2}><textarea type="text" className={styles.inp} onChange={(e) => Busqueda(e)}></textarea></div>
            </div>
            <div className={styles.buttonC}>
              <button className={styles.button} onClick={(e) => router.push("crearPedido")}>Agregar Pedido</button>
            </div>
          </div>
          <div className={styles.checkboxContainer}>
            <label>
              <input
                type="checkbox"
                checked={selectedSources.includes('AliExpress')}
                onChange={() => {
                  setSelectedSources((prev) =>
                    prev.includes('AliExpress')
                      ? prev.filter((source) => source !== 'AliExpress')
                      : [...prev, 'AliExpress']
                  );
                }}
              />
              AliExpress
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedSources.includes('Shein')}
                onChange={() => {
                  setSelectedSources((prev) =>
                    prev.includes('Shein')
                      ? prev.filter((source) => source !== 'Shein')
                      : [...prev, 'Shein']
                  );
                }}
              />
              Shein
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedSources.includes('Stock')}
                onChange={() => {
                  setSelectedSources((prev) =>
                    prev.includes('Stock')
                      ? prev.filter((source) => source !== 'Stock')
                      : [...prev, 'Stock']
                  );
                }}
              />
              Stock
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedSources.length === 3}
                onChange={() => {
                  setSelectedSources((prev) =>
                    prev.length === 3 ? [] : ['AliExpress', 'Shein', 'Stock']
                  );
                }}
              />
              Todos
            </label>
          </div>
          <div className={styles.grillaTarjetas}>
            {buscar.map((item) => (
              <Tarjeta data={allData} origen={item.origen} key={item.id} numero={item.contador} nombre={item.clienteNombre} fecha={item.fechaPedido} idPedido={item.id}></Tarjeta>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}