import Bar from "@/components/bar";
import { useState, useEffect } from "react";
import Head from 'next/head'
import obtener from './api/firebase/get-data'
import styles from '@/styles/VerClientes.module.css'
import TablaClientes from "@/components/tablaClientes";
import CreateClientModal from "@/components/popup/modalCreateClient";
import ModalPopUp from "@/components/popup/popup";
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
  const [clientes, setClientes] = useState([])
  const [buscar, setBuscar] = useState([])
  const [agregado, setAgregado] = useState(false)
  const [actualizar, setActualizar] = useState(false)
  const [openPopUp, setOpenPopUp] = useState(false)
  // para los permisos
  const [permisos, setPermisos] = useState(() => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const all = sessionStorage.getItem('permisos');
      return JSON.parse(all)
    } else {
      return []
    }
  })
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
  useEffect(() => {
    if (permisos.length > 0) {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        if (permisos.includes("Ver Clientes")) {

        } else {
          router.replace("/inicio")
        }
      }
    }
  }, [permisos])
  const filtrarClientes = (valorBusqueda) => {
    return clientes.filter(cliente =>
      cliente.nombre.toLowerCase().includes(valorBusqueda.toLowerCase()) ||
      cliente.username.toLowerCase().includes(valorBusqueda.toLowerCase())
    );
  };

  const fetchData = async () => {
    try {
      const result = await obtener("clientes");
      setClientes(result);
      setBuscar(result)
    } catch (error) {
      // Handle the error if needed
      console.error("Error fetching data:", error);
    }
  };

  const Busqueda = (e) => {
    const valor = e.target.value;
    setBuscar(filtrarClientes(valor));

  }

  useEffect(() => {
    fetchData()
  }, [agregado])

  useEffect(() => {
    if (actualizar) {
      fetchData()
      setActualizar(false)
    }
  }, [actualizar])

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
            {permisos.includes("Crear Clientes") &&
              <div className={styles.buttonC}>
                <button className={styles.button} onClick={(e) => setOpenPopUp(true)}>Agregar Cliente</button>
              </div>
            }
          </div>
          <TablaClientes data={buscar} setActualizado={setActualizar}></TablaClientes>
        </div>
      </div>
    </>
  )
}