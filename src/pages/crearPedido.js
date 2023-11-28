import Bar from "@/components/bar";
import { useState, useEffect } from "react";
import Head from 'next/head'
import obtener from './api/firebase/get-data'
import styles from '@/styles/CrearPedido.module.css'
import enviar from "./api/firebase/post-data";
import Dropdown from "@/components/dropdown";
import DateCalendarValue from "@/components/datePicker";

export default function CrearPedido() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [aliShein, setAliShein] = useState("")
    const [clientes, setClientes] = useState([])
    const [buscar, setBuscar] = useState([])
    const [fechaAprox, setFechaAprox] = useState("")
    const filtrarPedidos = (valorBusqueda) => {
        return clientes.filter(cliente =>
            cliente.nombre.toLowerCase().includes(valorBusqueda.toLowerCase()) ||
            cliente.username.toLowerCase().includes(valorBusqueda.toLowerCase()) ||
            cliente.identificador.toLowerCase().includes(valorBusqueda.toLowerCase())
        );
    };

    const fetchData = async () => {
        try {
            const result = await obtener("clientes");
            setClientes(result)
        } catch (error) {
            // Handle the error if needed
            console.error("Error fetching data:", error);
        }
    };

    const Busqueda = (e) => {
        const valor = e.target.value;
        setBuscar(filtrarPedidos(valor));

    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        console.log(clientes)
    }, [clientes])
    return (
        <>
            <Head>
                <title>Alix Shop</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Bar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}></Bar>
            <div className={styles.flexConatiner}>
                <div className={styles.gridContainer}>
                    <div className={styles.inputC}>
                        <div className={styles.square1}>Origen</div>
                        <Dropdown options={["Alixpress", "Shein"]} onSelect={setAliShein}></Dropdown>
                    </div>
                    <div className={styles.inputC}>
                        <div className={styles.square1}>Buscar</div>
                        <div className={styles.square2}><textarea type="text" className={styles.inp} onChange={(e) => Busqueda(e)}></textarea></div>
                    </div>
                    <div></div>
                    <div className={styles.inputC}>
                        <div className={styles.square1}>Aprox</div>
                        <DateCalendarValue setValue={setFechaAprox} name="Fecha Apoximada"></DateCalendarValue>
                    </div>
                </div>
            </div>
        </>
    )
}