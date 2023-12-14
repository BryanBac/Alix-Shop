import Bar from "@/components/bar";
import { useState, useEffect } from "react";
import Head from 'next/head'
import obtener from './api/firebase/get-data'
import styles from '@/styles/CrearPedido.module.css'
import enviar from "./api/firebase/post-data";
import Dropdown from "@/components/dropdown";
import DateCalendarValue from "@/components/datePicker";
import DropdownFiltered from "@/components/dropdownFiltered";
import DropdownFilteredUsername from "@/components/dropdownFilteredUsername";
import TablaProductos from "@/components/tablaProducto";
import CreatePedidoModal from "@/components/popup/modalCreatePedido";
import CreatePedidoModal2 from "@/components/popup/modalCreatePedido2";
import enviarId from "./api/firebase/post-data-id";
import ModalPopUp from "@/components/popup/popup";
import { useRouter } from "next/router";
import ErrorModal from "@/components/popup/modarError";
import modificarDocumento from "./api/firebase/update-data";
import { onAuthStateChanged } from 'firebase/auth';
import { authG } from "../../firebase";

const checkAuth = (callback) => {
    return onAuthStateChanged(authG, (user) => {
        callback(user);
    });
};

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
    const [openPopUp3, setOpenPopUp3] = useState(false)
    const [agregarCliente, setAgregarCliente] = useState(false)
    const [buscar, setBuscar] = useState([])
    const [contador, setContador] = useState([])
    const [valorContador, setValorContador] = useState(0)
    const router = useRouter()
    // origen
    const [aliShein, setAliShein] = useState("")
    // estado
    const [estado, setEstado] = useState("")
    // clientes
    const [clientes, setClientes] = useState([]) // aquí van todos los clientes
    const [clienteDrop, setClienteDrop] = useState("") // aquí va el id del cliente seleccionado
    const [clienteNombre, setClienteNombre] = useState("") // aquí va el nombre del cliente
    const [clienteTelefono, setClienteTelefono] = useState("")
    const [clienteUsername, setClienteUsername] = useState("")
    const [clienteDirección, setClienteDirección] = useState("")
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
    // aquí para agregar clientes
    const [agregarNombre, setAgregarNombre] = useState("")
    const [agregarUsername, setAgregarUsername] = useState("")
    const [agregarContacto, setAgregarContacto] = useState("")
    const [agregarCodigoId, setAgregarCodigoId] = useState("")
    // ultimos agregados
    const [recibe, setRecibe] = useState("")
    const [envio, setEnvio] = useState("")
    // comienzan las funciones
    useEffect(() => {
        const unsubscribe = checkAuth((user) => {
            if (!user) {
                // Redirect to the login page if the user is not logged in
                router.replace('/');
            }
        });

        return () => unsubscribe();
    }, []);
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
                if (permisos.includes("Crear Pedido")) {

                } else {
                    router.replace("/inicio")
                }
            }
        }
    }, [permisos])
    const filtrarPedidos = (valorBusqueda) => {
        return clientes.filter(cliente =>
            cliente.nombre.toLowerCase().includes(valorBusqueda.toLowerCase()) ||
            cliente.username.toLowerCase().includes(valorBusqueda.toLowerCase())
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
    const fetchContador = async () => {
        try {
            const result = await obtener("contadorPedido");
            setContador(result)
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
            precio: precio,
            codeAli: codeAli,
            codeMail: codeMail,
            codeRastreo: codeRastreo
        }
        setCostoT(Number(costoT) + Number(costo))
        setTotal(Number(total) + Number(precio))
        setProductos([...productos, pr])
        setCodeAli("")
        setCodeMail("")
        setCodeRastreo("")
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
        setRecibe("")
        setClienteUsername("")
        setEnvio()
        setCostoT(0)
        setTotal(0)
        setProductos([])
    }
    const crearPedido = () => {
        if (aliShein != "Aliexpress" && aliShein != "Shein" && aliShein != "Stock") {
            setOpenPopUp3(true)
        } else {
            let anti = 0;
            if (typeof anticipo == "undefined") {
                anti = 0;
            } else {
                anti = Number(anticipo)
            }
            let pedido = {
                contador: contador[0].contador + 1,
                origen: aliShein,
                clienteId: clienteDrop,
                clienteNombre: clienteNombre,
                fechaPedido: fechaHoy,
                fechaAprox: fechaAprox,
                codeAli: codeAli,
                codeMail: codeMail,
                codeRastreo: codeRastreo,
                anticipo: anti,
                estado: estado,
                fechaFinal: fechaFinal,
                costoTotal: costoT,
                precioTotal: total,
                productos: productos,
                recibe: recibe,
                envio: envio,
                telefono: clienteTelefono,
                direccion: clienteDirección,
                imagen: "",
                username: clienteUsername
            }
            contador[0].contador = contador[0].contador + 1;
            modificarDocumento(contador[0].id, "contadorPedido", contador[0])
            enviar(aliShein, pedido)
            vaciar()
            setOpenPopUp(true)
        }

    }
    const crearPedido2 = () => {
        if (aliShein != "Aliexpress" && aliShein != "Shein" && aliShein != "Stock") {
            setOpenPopUp3(true)
        } else {
            let anti = 0;
            if (typeof anticipo == "undefined") {
                anti = 0;
            } else {
                anti = Number(anticipo)
            }
            let pedido = {
                contador: contador[0].contador + 1,
                origen: aliShein,
                clienteId: clienteDrop,
                clienteNombre: clienteNombre,
                fechaPedido: fechaHoy,
                fechaAprox: fechaAprox,
                codeAli: codeAli,
                codeMail: codeMail,
                codeRastreo: codeRastreo,
                anticipo: anti,
                estado: estado,
                fechaFinal: fechaFinal,
                costoTotal: costoT,
                precioTotal: total,
                productos: productos,
                recibe: recibe,
                envio: envio,
                telefono: clienteTelefono,
                direccion: clienteDirección,
                imagen: "",
                username: clienteUsername
            }
            contador[0].contador = contador[0].contador + 1;
            modificarDocumento(contador[0].id, "contadorPedido", contador[0])
            enviar(aliShein, pedido)
            vaciar()
            setOpenPopUp2(true)
        }
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
        fetchContador()
    }, [])
    useEffect(() => {
        if (contador.length > 0) {
            setValorContador(contador[0].contador + 1)
        }
    }, [contador])

    useEffect(() => {
        if (estado == "Entregado") {
            setFechaFinal(obtenerFechaHoy())
        } else {
            setFechaFinal("")
        }
    }, [estado])

    useEffect(() => {
        if (productos.length > 0) {
            let prT = 0
            let costT = 0
            for (let i = 0; i < productos.length; i++) {
                prT += Number(productos[i].precio)
                costT += Number(productos[i].costo)
            }
            setTotal(prT)
            setCostoT(costT)
        }
    }, [productos])
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
                <CreatePedidoModal mensaje="Creado Exitosamente" numeroPedido={valorContador}></CreatePedidoModal>
            </ModalPopUp>
            <ModalPopUp
                openPopUp={openPopUp2}
                setOpenPopUp={setOpenPopUp2}
            >
                <CreatePedidoModal2 mensaje="Creado Exitosamente" numeroPedido={valorContador}></CreatePedidoModal2>
            </ModalPopUp>
            <ModalPopUp
                openPopUp={openPopUp3}
                setOpenPopUp={setOpenPopUp3}
            >
                <ErrorModal error="Elije AliExpress/Shein"></ErrorModal>
            </ModalPopUp>
            <div className={styles.flexConatiner}>
                <div className={styles.gridConBotones}>
                    <div className={styles.blockContainer}>
                        <div className={styles.gridContainer}>
                            <div className={styles.inputC}>
                                <div className={styles.square1}>Origen</div>
                                <Dropdown options={["Aliexpress", "Shein", "Stock"]} onSelect={setAliShein}></Dropdown>
                            </div>
                            <div className={styles.inputC3}>
                                <div className={styles.square1}><div>Cliente</div></div>
                                <div className={styles.square2}>
                                    <DropdownFiltered
                                        setUsername={setClienteUsername}
                                        username={clienteUsername}
                                        setClienteNombre={setClienteNombre}
                                        clienteNombre={clienteNombre}
                                        setClienteTelefono={setClienteTelefono}
                                        setClienteDirección={setClienteDirección}
                                        onSelect={setClienteDrop}
                                    />
                                </div>
                                <div><button onClick={() => setAgregarCliente(!agregarCliente)}>+</button></div>
                            </div>
                            <div className={styles.inputC3}>
                                <div className={styles.square1}><div>Username</div></div>
                                <div className={styles.square2}>
                                    <DropdownFilteredUsername
                                        setUsername={setClienteUsername}
                                        username={clienteUsername}
                                        setClienteNombre={setClienteNombre}
                                        clienteNombre={clienteNombre}
                                        setClienteTelefono={setClienteTelefono}
                                        setClienteDirección={setClienteDirección}
                                        onSelect={setClienteDrop}
                                    />
                                </div>
                                <div><button onClick={() => setAgregarCliente(!agregarCliente)}>+</button></div>
                            </div>
                            <div className={styles.inputC}>
                                <div className={styles.square1}><div>Telefono</div></div>
                                <div className={styles.square2}>{clienteTelefono}</div>
                            </div>
                            <div className={styles.inputC}>
                                <div className={styles.square1}><div>Dirección</div></div>
                                <div className={styles.square2}>{clienteDirección}</div>
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
                                <div className={styles.square1}>Estado</div>
                                <Dropdown options={["Pedido", "Recibido", "Enviado", "Entregado"]} onSelect={setEstado}></Dropdown>
                            </div>
                            <div className={styles.inputC}>
                                <div className={styles.square1}><div>Anticipo</div></div>
                                <div className={styles.square2}><input type="text" className={styles.inp} onChange={(e) => setAnticipo(e.target.value)} value={anticipo}></input></div>
                            </div>
                            <div className={styles.inputC}>
                                <div className={styles.square1}><div>¿Quien Recibe?</div></div>
                                <div className={styles.square2}><textarea type="text" className={styles.inp} onChange={(e) => setRecibe(e.target.value)} value={recibe}></textarea></div>
                            </div>
                            <div className={styles.inputC}>
                                <div className={styles.square1}><div>Envio</div></div>
                                <div className={styles.square2}><textarea type="text" className={styles.inp} onChange={(e) => setEnvio(e.target.value)} value={envio}></textarea></div>
                            </div>
                        </div>
                        <div className={styles.productoContainer}>
                            <div className={styles.barraProducto}>
                                <div className={styles.inputC2}>
                                    <div className={styles.square3}><div>Producto</div></div>
                                    <div className={styles.square2}><textarea type="text" className={styles.inp} onChange={(e) => setProducto(e.target.value)} value={producto}></textarea></div>
                                </div>
                                <div className={styles.inputC2}>
                                    <div className={styles.square3}><div>Costo</div></div>
                                    <div className={styles.square2}><input type="number" className={styles.inp} onChange={(e) => setCosto(e.target.value)} value={costo}></input></div>
                                </div>
                                <div className={styles.inputC2}>
                                    <div className={styles.square3}><div>Precio</div></div>
                                    <div className={styles.square2}><input type="number" className={styles.inp} onChange={(e) => setPrecio(e.target.value)} value={precio}></input></div>
                                </div>
                                <div className={styles.inputC2}>
                                    <div className={styles.square3}><div>Codigo Aliexpress</div></div>
                                    <div className={styles.square2}><textarea type="text" className={styles.inp} onChange={(e) => setCodeAli(e.target.value)} value={codeAli}></textarea></div>
                                </div>
                                <div className={styles.inputC2}>
                                    <div className={styles.square3}><div>Codigo de Correo</div></div>
                                    <div className={styles.square2}><textarea type="text" className={styles.inp} onChange={(e) => setCodeMail(e.target.value)} value={codeMail}></textarea></div>
                                </div>
                                <div className={styles.inputC2}>
                                    <div className={styles.square3}><div>Codigo de Rastreo</div></div>
                                    <div className={styles.square2}><textarea type="text" className={styles.inp} onChange={(e) => setCodeRastreo(e.target.value)} value={codeRastreo}></textarea></div>
                                </div>
                            </div>
                            <div className={styles.flexConatiner}>
                                <div className={styles.buttonC}>
                                    <button className={styles.button} onClick={() => Agregar()}>Agregar Producto</button>
                                </div>
                            </div>
                            <div>
                                <TablaProductos data={productos} setData={setProductos}></TablaProductos>
                            </div>
                        </div>
                    </div>
                    <div className={styles.botones}>
                        <div className={styles.inputC}>
                            <div className={styles.square1}><div className={styles.flex}>Costo Total</div></div>
                            <div className={styles.square2}>{costoT}</div>
                        </div>
                        <div className={styles.inputC}>
                            <div className={styles.square1}><div className={styles.flex}>Precio Total</div></div>
                            <div className={styles.square2}>{total}</div>
                        </div>
                        <div className={styles.ingresarCliente}>
                            <div className={styles.ingresarClienteBlock}>
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
                        {agregarCliente &&
                            <div className={styles.ingresarCliente}>
                                <div className={styles.ingresarClienteBlock}>
                                    <div>
                                        <div className={styles.titulos}>Nombre</div>
                                        <input
                                            className={styles.input}
                                            type="text"
                                            onChange={(e) => setAgregarNombre(e.target.value)}
                                            value={agregarNombre}
                                        ></input>
                                    </div>
                                    <div>
                                        <div className={styles.titulos}>Username</div>
                                        <input
                                            className={styles.input}
                                            type="text"
                                            onChange={(e) => setAgregarUsername(e.target.value)}
                                            value={agregarUsername}
                                        ></input>
                                    </div>
                                    <div>
                                        <div className={styles.titulos}>Dirección</div>
                                        <input
                                            className={styles.input}
                                            type="text"
                                            onChange={(e) => setAgregarCodigoId(e.target.value)}
                                            value={agregarCodigoId}
                                        ></input>
                                    </div>
                                    <div>
                                        <div className={styles.titulos}>Numero de telefono</div>
                                        <input
                                            className={styles.input}
                                            type="text"
                                            onChange={(e) => setAgregarContacto(e.target.value)}
                                            value={agregarContacto}
                                        ></input>
                                    </div>
                                    <div className={styles.buttonC2}>
                                        <button className={styles.button4} onClick={() => {
                                            enviarId("clientes", {
                                                nombre: agregarNombre,
                                                username: agregarUsername,
                                                direccion: agregarCodigoId,
                                                cant_pedidos: 0,
                                                telefono: agregarContacto
                                            }).then(data => {
                                                setClienteDrop(data);
                                            })
                                            let x = agregarNombre + "---" + agregarUsername
                                            setClienteNombre(x)
                                            setAgregarCliente("")
                                            setAgregarCodigoId("")
                                            setAgregarContacto("")
                                            setAgregarUsername("")
                                        }}>Crear Cliente</button>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}