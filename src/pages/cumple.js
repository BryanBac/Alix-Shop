import Bar from "@/components/bar";
import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "@/styles/Cumpleaños.module.css";
import modificarDocumento from "./api/firebase/update-data";
import enviar from "./api/firebase/post-data";
import obtenerPorId from "./api/firebase/get-data-one";
import TablaCumple from "@/components/tablaCumple";

function diasHasta22DeAbril() {
  const fechaActual = new Date();
  const fecha22Abril = new Date(fechaActual.getFullYear(), 3, 22);
  const diferenciaMs = fecha22Abril - fechaActual;
  const diasFaltantes = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));
  return diasFaltantes;
}

export default function Cumpleaños() {
  const [state, setState] = useState("select");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selected, setSelected] = useState(false)
  const [id, setId] = useState(0);
  const [seconds, setSeconds] = useState(10);
  const max = 2;
  const [enable, setEnable] = useState(false);
  const [elemento, setElemento] = useState("");
  const [elementosCarro, setElementosCarro] = useState([]);
  const [elementosCarro2, setElementosCarro2] = useState([]);
  const [exis, setExis] = useState(false);
  const [existe, setExiste] = useState({
    id: "",
    eleccion: "",
  });
  useEffect(() => {
    if (enable) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
        if (seconds >= 0) {
          setId(Math.floor(Math.random() * elementosCarro.length));
        } else {
          setEnable(false);
          setSelected(true)
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [seconds, enable]);
  const fetchData = async () => {
    try {
      const result = await obtenerPorId(
        "eleccionCumple",
        "ZMwjbF8fR2sOEOxk4eUj"
      );
      setExis(true);
      setExiste(result);
    } catch (error) {
      // Handle the error if needed
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(existe);
  }, [existe]);
  const eleccion = (text, eleccion) => {
    setState(text);
    modificarDocumento("ZMwjbF8fR2sOEOxk4eUj", "eleccionCumple", {
      eleccion: eleccion,
    });
  };
  return (
    <>
      <Head>
        <title>Alix Shop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logo.ico" />
      </Head>
      <Bar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}></Bar>
      {exis && (
        <div className={styles.container}>
          {state === "select" && existe.eleccion === "na" && (
            <div>
              <div className={styles.mensaje}>
                A ver Alix, dime que elejiras
              </div>
              <div className={styles.imagenC}>
                <img className={styles.imagen} src="balanzas.png"></img>
              </div>
              <div className={styles.evenly}>
                <div className={styles.election}>
                  <div className={styles.imagenC}>
                    <img className={styles.imagen} src="carrito.png"></img>
                  </div>
                  <div
                    onClick={() => eleccion("filling", "carrito")}
                    className={styles.electionButton}
                  >
                    Carrito de Shein
                  </div>
                </div>
                <div className={styles.election}>
                  <div className={styles.imagenC}>
                    <img className={styles.imagen} src="regalo.png"></img>
                  </div>
                  <div
                    onClick={() => {
                      eleccion("enigma", "enigma");
                    }}
                    className={styles.electionButton}
                  >
                    Regalo misterioso
                  </div>
                </div>
              </div>
            </div>
          )}
          {state === "filling" && existe.eleccion === "na" && (
            <div className={styles.election}>
              <div>Puedes meter cualquier cantidad, pero solo se enviarán 3 aleatorios</div>
              <div className={styles.inputC}>
                <button
                  onClick={() => {
                    console.log(elemento);
                    setElementosCarro([...elementosCarro, elemento]);
                    setElemento("");
                  }}
                  className={styles.square1}
                >
                  Agrega Producto
                </button>
                <div className={styles.square2}>
                  <textarea
                    type="text"
                    value={elemento}
                    className={styles.inp}
                    onChange={(e) => setElemento(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <TablaCumple data={elementosCarro} id={-1} selected={false} />
              <button
                onClick={() => {
                  enviar("listadoCumple", {
                    listado: elementosCarro,
                  });
                  setState("rulet");
                  setEnable(true);
                }}
                className={styles.square3}
              >
                enviar
              </button>
            </div>
          )}
          {state === "rulet" && existe.eleccion === "na" && (
            <div className={styles.election}>
              <TablaCumple data={elementosCarro} id={id} selected={false}/>
              <button
                onClick={() => {
                  console.log("lenght", elementosCarro2.length)
                  if(elementosCarro2.length<=max){
                    setElementosCarro2([...elementosCarro2, elementosCarro[id]]);
                    const copiaElementosCarro = [...elementosCarro]; // Crear una copia del array original
                    copiaElementosCarro.splice(id, 1); // Eliminar 1 elemento en la posición especificada
                    setElementosCarro(copiaElementosCarro);
                    setSeconds(10);
                    setEnable(true);
                  }else{
                    enviar("verdaderaLista", {elementosCarro2})
                    setState("ultimo")
                  }
                  setSelected(false)
                }}
                className={styles.square3}
              >
                {elementosCarro2.length<=max? "Reiniciar": "enviar listado"}
              </button>
              <div>Faltan {seconds>0? seconds: 0} segundos para que puedas reiniciarlo</div>
              <TablaCumple data={elementosCarro2} id={-1} selected={selected} />
            </div>
          )}
          
          {state === "ultimo" && existe.eleccion === "na" && (
            <div className={styles.election}>
              <div className={styles.mensaje}>
                Thank you
              </div>
              <div className={styles.imagenC}>
                <img className={styles.imagen} src="carrito.png"></img>
              </div>
            </div>
          )}
          {state === "enigma" && existe.eleccion === "na" && (
            <div className={styles.election}>
              <div className={styles.mensaje}>
                Tendrás que esperar {diasHasta22DeAbril()} días para saber que es
              </div>
              <div className={styles.imagenC}>
                <img className={styles.imagen} src="regalo.png"></img>
              </div>
            </div>
          )}
          {existe.eleccion === "enigma" && (
            <div className={styles.election}>
              <div className={styles.mensaje}>
                Tendrás que esperar {diasHasta22DeAbril()} días para saber que es
              </div>
              <div className={styles.imagenC}>
                {diasHasta22DeAbril()===0&&<img className={styles.imagen} src="botas.png"></img>}
                {diasHasta22DeAbril()!==0&&<img className={styles.imagen} src="regalo.png"></img>}
                
              </div>
            </div>
          )}
          {existe.eleccion === "carrito" && (
            <div className={styles.election}>
              <div className={styles.mensaje}>
                Thank you
              </div>
              <div className={styles.imagenC}>
                <img className={styles.imagen} src="carrito.png"></img>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
