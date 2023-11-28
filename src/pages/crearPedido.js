import Bar from "@/components/bar";
import { useState, useEffect } from "react";
import Head from 'next/head'
import obtener from './api/firebase/get-data'
import styles from '@/styles/CrearPedido.module.css'
import enviar from "./api/firebase/post-data";
import Dropdown from "@/components/dropdown";
import DateCalendarValue from "@/components/datePicker";
import DropdownFiltered from "@/components/dropdownFiltered";
import TablaProductos from "@/components/tablaProducto";
import CreatePedidoModal from "@/components/popup/modalCreatePedido";
import CreatePedidoModal2 from "@/components/popup/modalCreatePedido2";
import ModalPopUp from "@/components/popup/popup";
import { useRouter } from "next/router";

function obtenerFechaHoy() {
    const fecha = new Date();

    // Obtiene día, mes y año
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // ¡Recuerda que los meses son indexados desde 0!
    const año = fecha.getFullYear();

    // Formatea la fecha como dd/mm/yyyy
    const fechaFormateada = `${dia}/${mes}/${año}`;

    return fechaFormateada;
}

export default function CrearPedido() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [openPopUp, setOpenPopUp] = useState(false)
    const [openPopUp2, setOpenPopUp2] = useState(false)
    const router = useRouter()
    const [buscar, setBuscar] = useState([])
    // origen
    const [aliShein, setAliShein] = useState("")
    // estado
    const [estado, setEstado] = useState("")
    // clientes
    const [clientes, setClientes] = useState([]) // aquí van todos los clientes
    const [clienteDrop, setClienteDrop] = useState("") // aquí va el id del cliente seleccionado
    const [clienteNombre, setClienteNombre] = useState("")
    // codigos
    const [codeAli, setCodeAli] = useState("")
    const [codeMail, setCodeMail] = useState("")
    const [codeRastreo, setCodeRastreo] = useState("")
    // fechas
    const [fechaHoy, setFechaHoy] = useState("")
    const [fechaFinal, setFechaFinal] = useState("")
    const [fechaAprox, setFechaAprox] = useState("")
    // numericos
    const [anticipo, setAnticipo] = useState()
    const [costoT, setCostoT] = useState(0)
    const [total, setTotal] = useState(0)
    // productos
    const [producto, setProducto] = useState("")
    const [costo, setCosto] = useState("")
    const [precio, setPrecio] = useState("")
    const [productos, setProductos] = useState([])
    // comienzan las funciones
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

    const Agregar = () => {
        let pr = {
            producto: producto,
            costo: costo,
            precio: precio
        }
        setCostoT(Number(costoT) + Number(costo))
        setTotal(Number(total) + Number(precio))
        setProductos([...productos, pr])
        setProducto("")
        setCosto("")
        setPrecio("")
    }
    const vaciar = () => {
        setAliShein("")
        setClienteDrop("")
        setClienteNombre("")
        setFechaAprox("")
        setCodeAli("")
        setCodeMail("")
        setCodeRastreo("")
        setAnticipo("")
        setEstado("")
        setFechaFinal("")
        setCostoT(0)
        setTotal(0)
        setProductos([])
    }
    const crearPedido = () => {
        let pedido = {
            origen: aliShein,
            clienteId: clienteDrop,
            clienteNombre: clienteNombre,
            fechaPedido: fechaHoy,
            fechaAprox: fechaAprox,
            codeAli: codeAli,
            codeMail: codeMail,
            codeRastreo: codeRastreo,
            anticipo: anticipo,
            estado: estado,
            fechaFinal: fechaFinal,
            costoTotal: costoT,
            precioTotal: total,
            productos: productos
        }
        enviar(aliShein, pedido)
        vaciar()
        setOpenPopUp(true)
    }
    const crearPedido2 = () => {
        let pedido = {
            origen: aliShein,
            clienteId: clienteDrop,
            clienteNombre: clienteNombre,
            fechaPedido: fechaHoy,
            fechaAprox: fechaAprox,
            codeAli: codeAli,
            codeMail: codeMail,
            codeRastreo: codeRastreo,
            anticipo: anticipo,
            estado: estado,
            fechaFinal: fechaFinal,
            costoTotal: costoT,
            precioTotal: total,
            productos: productos
        }
        enviar(aliShein, pedido)
        vaciar()
        setOpenPopUp2(true)
    }
   

    useEffect(() => {
        if (aliShein == "Aliexpress") {
            document.documentElement.style.setProperty('--identicolor', 'rgb(231, 44, 3, 0.8)');
        } else if (aliShein == "Shein") {
            document.documentElement.style.setProperty('--identicolor', '#000');
        } else {
            document.documentElement.style.setProperty('--identicolor', 'rgb(194, 156, 200, 0.8)');
        }
    }, [aliShein])

    useEffect(() => {
        setFechaHoy(obtenerFechaHoy())
        fetchData()
    }, [])

    useEffect(() => {
        if (estado == "Entregado") {
            setFechaFinal(obtenerFechaHoy())
        } else {
            setFechaFinal("")
        }
    }, [estado])
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
                <CreatePedidoModal></CreatePedidoModal>
            </ModalPopUp>
            <ModalPopUp
                openPopUp={openPopUp2}
                setOpenPopUp={setOpenPopUp2}
            >
                <CreatePedidoModal2></CreatePedidoModal2>
            </ModalPopUp>
            <div className={styles.flexConatiner}>
                <div className={styles.gridConBotones}>
                    <div className={styles.blockContainer}>
                        <div className={styles.gridContainer}>
                            <div className={styles.inputC}>
                                <div className={styles.square1}>Origen</div>
                                <Dropdown options={["Aliexpress", "Shein"]} onSelect={setAliShein}></Dropdown>
                            </div>
                            <div className={styles.inputC}>
                                <div className={styles.square1}><div>Cliente</div></div>
                                <div className={styles.square2}>
                                    <DropdownFiltered
                                        setClienteNombre={setClienteNombre}
                                        clienteNombre={clienteNombre}
                                        onSelect={setClienteDrop}
                                    />
                                </div>
                            </div>
                            <div className={styles.inputC}>
                                <div className={styles.square1}><div>Fecha Pedido</div></div>
                                <div className={styles.square2}>{fechaHoy}</div>
                            </div>
                            <div className={styles.inputC}>
                                <div className={styles.square1}><div>Aprox</div></div>
                                <DateCalendarValue setValue={setFechaAprox} name="Fecha Apoximada"></DateCalendarValue>
                            </div>
                            <div className={styles.inputC}>
                                <div className={styles.square1}><div>Codigo Aliexpress</div></div>
                                <div className={styles.square2}><textarea type="text" className={styles.inp} onChange={(e) => setCodeAli(e.target.value)} value={codeAli}></textarea></div>
                            </div>
                            <div className={styles.inputC}>
                                <div className={styles.square1}><div>Codigo de Correo</div></div>
                                <div className={styles.square2}><textarea type="text" className={styles.inp} onChange={(e) => setCodeMail(e.target.value)} value={codeMail}></textarea></div>
                            </div>
                            <div className={styles.inputC}>
                                <div className={styles.square1}><div>Codigo de Rastreo</div></div>
                                <div className={styles.square2}><textarea type="text" className={styles.inp} onChange={(e) => setCodeRastreo(e.target.value)} value={codeRastreo}></textarea></div>
                            </div>
                            <div className={styles.inputC}>
                                <div className={styles.square1}><div>Anticipo</div></div>
                                <div className={styles.square2}><input type="text" className={styles.inp} onChange={(e) => setAnticipo(e.target.value)} value={anticipo}></input></div>
                            </div>
                            <div className={styles.inputC}>
                                <div className={styles.square1}>Estado</div>
                                <Dropdown options={["Pedido", "Recibido", "Enviado", "Entregado"]} onSelect={setEstado}></Dropdown>
                            </div>
                            <div className={styles.inputC}>
                                <div className={styles.square1}><div>Fecha Final</div></div>
                                <div className={styles.square2}>{fechaFinal}</div>
                            </div>
                            <div className={styles.inputC}>
                                <div className={styles.square1}><div>Costo Total</div></div>
                                <div className={styles.square2}>{costoT}</div>
                            </div>
                            <div className={styles.inputC}>
                                <div className={styles.square1}><div>Precio Total</div></div>
                                <div className={styles.square2}>{total}</div>
                            </div>
                        </div>
                        <div className={styles.productoContainer}>
                            <div className={styles.barraProducto}>
                                <div className={styles.inputC}>
                                    <div className={styles.square3}><div>Producto</div></div>
                                    <div className={styles.square2}><textarea type="text" className={styles.inp} onChange={(e) => setProducto(e.target.value)} value={producto}></textarea></div>
                                </div>
                                <div className={styles.inputC}>
                                    <div className={styles.square3}><div>Costo</div></div>
                                    <div className={styles.square2}><input type="number" className={styles.inp} onChange={(e) => setCosto(e.target.value)} value={costo}></input></div>
                                </div>
                                <div className={styles.inputC}>
                                    <div className={styles.square3}><div>Precio</div></div>
                                    <div className={styles.square2}><input type="number" className={styles.inp} onChange={(e) => setPrecio(e.target.value)} value={precio}></input></div>
                                </div>
                                <div className={styles.buttonC}>
                                    <button className={styles.button} onClick={() => Agregar()}>Agregar Producto</button>
                                </div>
                            </div>
                            <div>
                                <TablaProductos data={productos}></TablaProductos>
                            </div>
                        </div>
                    </div>
                    <div className={styles.botones}>
                        <div className={styles.buttonC2}>
                            <button className={styles.button2} onClick={() => router.push("verPedidos")}>Cancelar</button>
                        </div>
                        <div className={styles.buttonC2}>
                            <button className={styles.button3} onClick={() => {
                                crearPedido()
                            }}>Crear</button>
                        </div>
                        <div className={styles.buttonC2}>
                            <button className={styles.button4} onClick={() => {
                                crearPedido2()
                            }}>Crear y Crear Otro</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}