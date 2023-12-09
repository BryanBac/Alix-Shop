import Bar from "@/components/bar";
import { useState, useEffect } from "react";
import Head from 'next/head'
import styles from '@/styles/CrearPedido.module.css'
import obtenerPorId from "./api/firebase/get-data-one";
import Dropdown from "@/components/dropdown";
import DateCalendarValue from "@/components/datePicker";
import TablaProductos from "@/components/tablaProducto";
import CreatePedidoModal from "@/components/popup/modalCreatePedido";
import CreatePedidoModal2 from "@/components/popup/modalCreatePedido2";
import enviarId from "./api/firebase/post-data-id";
import ModalPopUp from "@/components/popup/popup";
import { useRouter } from "next/router";
import ErrorModal from "@/components/popup/modarError";
import ModalImagen from "@/components/popup/modalImagen";
import ModalPedido from "@/components/popup/modalPedidoTabla";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import TablaUsuario from "@/components/tablaPedidosUsuario";
import modificarDocumento from "./api/firebase/update-data";
import EliminarPedido from "@/components/popup/modalEliminarPedido";
import TablaPedidosUsuario from "@/components/tablaPedidosUsuario";
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

export default function VerPedido() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [openPopUp, setOpenPopUp] = useState(false)
    const [openPopUp2, setOpenPopUp2] = useState(false)
    const [openPopUp3, setOpenPopUp3] = useState(false)
    const [openPopUp4, setOpenPopUp4] = useState(false)
    const [openPopUp5, setOpenPopUp5] = useState(false)
    const [agregarCliente, setAgregarCliente] = useState(false)
    const [contador, setContador] = useState(0)
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
    // origen
    const [aliShein, setAliShein] = useState("")
    // estado
    const [estado, setEstado] = useState("")
    // clientes
    const [clientes, setClientes] = useState([]) // aquí van todos los clientes
    const [clienteDrop, setClienteDrop] = useState("") // aquí va el id del cliente seleccionado
    const [clienteNombre, setClienteNombre] = useState("") // aquí va el nombre del cliente
    const [clienteTelefono, setClienteTelefono] = useState("")
    const [clienteDirección, setClienteDirección] = useState("")
    const [clienteObt, setClienteObt] = useState()
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
    // para setear los valores
    const [pedidoObtenido, setPedidoObtenido] = useState()
    const [idPedido, setIdPedido] = useState("")
    const [origenPedido, setOrigenPedido] = useState("")
    // ultimos agregados
    const [recibe, setRecibe] = useState("")
    const [envio, setEnvio] = useState("") // para agregar imagen
    const [preview, setPreview] = useState("/../public/camara.png");
    const [prompt, setPrompt] = useState("Añadir Imagen");
    const [file, setFile] = useState(null);
    const [tamañoImagen, setTamañoImagen] = useState(250)
    const [abrirImagen, setAbrirImagen] = useState(false)
    //
    const [allData, setAllData] = useState([]);
    const [dataFiltrada, setDataFiltrada] = useState(() => {
        if (typeof window !== 'undefined' && window.sessionStorage) {
            const all = sessionStorage.getItem('allData');
            return JSON.parse(all)
        } else {
            return []
        }
    })

    function handleChange(e) {
        setFile(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
        setPrompt("");
    }
    // comienzan las funciones

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
        setCostoT(0)
        setTotal(0)
        setProductos([])
    }

    const modificarPedido = () => {
        if (aliShein != "Aliexpress" && aliShein != "Shein" && aliShein != "Stock") {
            setOpenPopUp3(true)
        } else {
            let c = {
                nombre: clienteObt.nombre,
                username: clienteObt.username,
                direccion: clienteDirección,
                cant_pedidos: clienteObt.cant_pedidos,
                telefono: clienteTelefono
            }
            modificarDocumento(clienteDrop, "clientes", c)
            if (file != null) {
                const refImagen = ref(storage, `/${file.name + v4()}`);
                uploadBytes(refImagen, file).then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((url) => {
                        let pedido = {
                            origen: aliShein,
                            clienteId: clienteDrop,
                            clienteNombre: clienteNombre,
                            fechaPedido: fechaHoy,
                            fechaAprox: fechaAprox,
                            codeAli: codeAli,
                            codeMail: codeMail,
                            codeRastreo: codeRastreo,
                            anticipo: Number(anticipo),
                            estado: estado,
                            fechaFinal: fechaFinal,
                            costoTotal: costoT,
                            precioTotal: total,
                            productos: productos,
                            recibe: recibe,
                            envio: envio,
                            imagen: url,
                            telefono: clienteTelefono,
                            direccion: clienteDirección,
                            contador: contador,
                        }
                        modificarDocumento(idPedido, aliShein, pedido)
                        vaciar()
                        setOpenPopUp(true)
                    });
                });
            } else {
                let pedido = {
                    origen: aliShein,
                    clienteId: clienteDrop,
                    clienteNombre: clienteNombre,
                    fechaPedido: fechaHoy,
                    fechaAprox: fechaAprox,
                    codeAli: codeAli,
                    codeMail: codeMail,
                    codeRastreo: codeRastreo,
                    anticipo: Number(anticipo),
                    estado: estado,
                    fechaFinal: fechaFinal,
                    costoTotal: costoT,
                    precioTotal: total,
                    productos: productos,
                    recibe: recibe,
                    envio: envio,
                    imagen: "",
                    telefono: clienteTelefono,
                    direccion: clienteDirección,
                    contador: contador,
                }
                modificarDocumento(idPedido, aliShein, pedido)
                vaciar()
                setOpenPopUp(true)
            }

        }

    }
    const modificarPedido2 = () => {
        if (aliShein != "Aliexpress" && aliShein != "Shein" && aliShein != "Stock") {
            setOpenPopUp3(true)
        } else {
            let c = {
                nombre: clienteObt.nombre,
                username: clienteObt.username,
                direccion: clienteDirección,
                cant_pedidos: clienteObt.cant_pedidos,
                telefono: clienteTelefono
            }
            modificarDocumento(clienteDrop, "clientes", c)
            if (file != null) {
                const refImagen = ref(storage, `/${file.name + v4()}`);
                uploadBytes(refImagen, file).then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((url) => {
                        let pedido = {
                            origen: aliShein,
                            clienteId: clienteDrop,
                            clienteNombre: clienteNombre,
                            fechaPedido: fechaHoy,
                            fechaAprox: fechaAprox,
                            codeAli: codeAli,
                            codeMail: codeMail,
                            codeRastreo: codeRastreo,
                            anticipo: Number(anticipo),
                            estado: estado,
                            fechaFinal: fechaFinal,
                            costoTotal: costoT,
                            precioTotal: total,
                            productos: productos,
                            recibe: recibe,
                            envio: envio,
                            imagen: url,
                            telefono: clienteTelefono,
                            direccion: clienteDirección,
                            contador: contador,
                        }
                        modificarDocumento(idPedido, aliShein, pedido)
                        vaciar()
                        setOpenPopUp2(true)
                    });
                });
            } else {
                let pedido = {
                    origen: aliShein,
                    clienteId: clienteDrop,
                    clienteNombre: clienteNombre,
                    fechaPedido: fechaHoy,
                    fechaAprox: fechaAprox,
                    codeAli: codeAli,
                    codeMail: codeMail,
                    codeRastreo: codeRastreo,
                    anticipo: Number(anticipo),
                    estado: estado,
                    fechaFinal: fechaFinal,
                    costoTotal: costoT,
                    precioTotal: total,
                    productos: productos,
                    recibe: recibe,
                    envio: envio,
                    imagen: "",
                    telefono: clienteTelefono,
                    direccion: clienteDirección,
                    contador: contador,
                }
                modificarDocumento(idPedido, aliShein, pedido)
                vaciar()
                setOpenPopUp2(true)
            }

        }
    }

    useEffect(() => {
        if (allData.length > 0 && clienteNombre != "") {
            const documentosFiltrados = allData.filter(documento =>
                documento.clienteNombre === clienteNombre
            );
            setDataFiltrada(documentosFiltrados)
        }
    }, [allData, clienteNombre])

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
        if (typeof window !== 'undefined' && window.sessionStorage) {
            setIdPedido(sessionStorage.getItem("idPedido"))
            setOrigenPedido(sessionStorage.getItem("origenPedido"))
        }
    }, [])

    useEffect(() => {
        if (idPedido != "" && origenPedido != "") {
            obtenerPorId(origenPedido, idPedido).then((item) => setPedidoObtenido(item))
        }
    }, [idPedido, origenPedido])

    useEffect(() => {
        console.log("ClienteID", clienteDrop)
        if (clienteDrop != "") {
            obtenerPorId("clientes", clienteDrop).then((item) => setClienteObt(item))
        }
    }, [clienteDrop])


    useEffect(() => {
        if (typeof pedidoObtenido != "undefined") {
            setAliShein(pedidoObtenido.origen)
            setClienteDrop(pedidoObtenido.clienteId)
            setClienteNombre(pedidoObtenido.clienteNombre)
            setFechaHoy(pedidoObtenido.fechaPedido)
            setFechaAprox(pedidoObtenido.fechaAprox)
            setEstado(pedidoObtenido.estado)
            if (pedidoObtenido.imagen != "") {
                setPreview(pedidoObtenido.imagen)
            }
            setFechaFinal(pedidoObtenido.fechaFinal)
            setAnticipo(pedidoObtenido.anticipo)
            setProductos(pedidoObtenido.productos)
            setCostoT(pedidoObtenido.costoTotal)
            setTotal(pedidoObtenido.precioTotal)
            setEnvio(pedidoObtenido.envio)
            setRecibe(pedidoObtenido.recibe)
            setContador(pedidoObtenido.contador)
            setClienteTelefono(pedidoObtenido.telefono)
            setClienteDirección(pedidoObtenido.direccion)

        } else {
        }
    }, [pedidoObtenido])

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
                <CreatePedidoModal mensaje="Actualizado Exitosamente" numeroPedido={contador}></CreatePedidoModal>
            </ModalPopUp>
            <ModalPopUp
                openPopUp={openPopUp2}
                setOpenPopUp={setOpenPopUp2}
            >
                <CreatePedidoModal2 mensaje="Actualizado Exitosamente" numeroPedido={contador}></CreatePedidoModal2>
            </ModalPopUp>
            <ModalPopUp
                openPopUp={openPopUp3}
                setOpenPopUp={setOpenPopUp3}
            >
                <ErrorModal error="Elije AliExpress/Shein"></ErrorModal>
            </ModalPopUp>
            <ModalPopUp
                openPopUp={openPopUp4}
                setOpenPopUp={setOpenPopUp4}
            >
                <ModalPedido data={dataFiltrada}></ModalPedido>
            </ModalPopUp>
            <ModalPopUp
                openPopUp={openPopUp5}
                setOpenPopUp={setOpenPopUp5}
            >
                <EliminarPedido id={idPedido} coleccion={aliShein} ruta="verPedidos"></EliminarPedido>
            </ModalPopUp>
            <ModalPopUp
                openPopUp={abrirImagen}
                setOpenPopUp={setAbrirImagen}
            >
                <ModalImagen preview={preview}></ModalImagen>
            </ModalPopUp>
            <div className={styles.flexConatiner}>
                <div className={styles.gridConBotones}>
                    <div className={styles.blockContainer}>
                        <div className={styles.gridContainer}>
                            <div className={styles.inputC}>
                                <div className={styles.square1}>Origen</div>
                                <div className={styles.square2}>{aliShein}</div>
                            </div>
                            <div className={styles.inputC}>
                                <div className={styles.square1}><div>Cliente</div></div>
                                <div className={styles.square2}>
                                    {clienteNombre}
                                </div>
                            </div>
                            <div className={styles.inputC}>
                                <div className={styles.square1}><div>Telefono</div></div>
                                <div className={styles.square2}><textarea type="text" className={styles.inp} onChange={(e) => setClienteTelefono(e.target.value)} value={clienteTelefono}></textarea></div>
                            </div>
                            <div className={styles.inputC}>
                                <div className={styles.square1}><div>Dirección</div></div>
                                <div className={styles.square2}><textarea type="text" className={styles.inp} onChange={(e) => setClienteDirección(e.target.value)} value={clienteDirección}></textarea></div>
                            </div>
                            <div className={styles.inputC}>
                                <div className={styles.square1}><div>Fecha Pedido</div></div>
                                <div className={styles.square2}>{fechaHoy}</div>
                            </div>
                            <div className={styles.inputC}>
                                <div className={styles.square1}><div>Aprox</div></div>
                                <DateCalendarValue setValue={setFechaAprox} name={fechaAprox}></DateCalendarValue>
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
                        <div className={styles.selectorContainer}>
                            <div className={styles.buttonC}>
                                <button className={styles.button} onClick={() => {
                                    setOpenPopUp4(true)
                                }}>Ver Pedidos Realizados</button>
                            </div>
                            <label htmlFor="fileInput" className={styles.button5}>
                                Agregar Guía
                            </label>
                            <input
                                accept="image/png, image/jpeg"
                                type="file"
                                id="fileInput"
                                onChange={handleChange}
                                style={{ display: 'none' }} // Oculta el input real
                            />
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
                        <div className={styles.imagenContainer}>
                            <button className="boton-sin" onClick={() => setAbrirImagen(true)}>
                                <img
                                    src={preview}
                                    className={styles.imagen}
                                ></img>
                            </button>
                        </div>
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
                                        modificarPedido();
                                    }}>Guardar</button>
                                </div>
                                <div className={styles.buttonC2}>
                                    <button className={styles.button4} onClick={() => {
                                        setOpenPopUp5(true);
                                    }}>Eliminar</button>
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
                                        <div className={styles.titulos}>Contacto</div>
                                        <input
                                            className={styles.input}
                                            type="text"
                                            onChange={(e) => setAgregarContacto(e.target.value)}
                                            value={agregarContacto}
                                        ></input>
                                    </div>
                                    <div>
                                        <div className={styles.titulos}>Codigo Id</div>
                                        <input
                                            className={styles.input}
                                            type="text"
                                            onChange={(e) => setAgregarCodigoId(e.target.value)}
                                            value={agregarCodigoId}
                                        ></input>
                                    </div>
                                    <div className={styles.buttonC2}>
                                        <button className={styles.button4} onClick={() => {
                                            enviarId("clientes", {
                                                nombre: agregarNombre,
                                                username: agregarUsername,
                                                identificador: agregarCodigoId,
                                                cant_pedidos: 0,
                                                contacto: agregarContacto
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