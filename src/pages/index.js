import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Login.module.css'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import BarEmpty from '@/components/barEmpty'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { authG } from '../../firebase'
import autenticar from './api/auth/auth'

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [contra, setContra] = useState("");
  const [paso, setPaso] = useState(false);
  const [paraVer, setParaVer] = useState("1")
  const logearse = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authG, provider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        // Additional conditions
        if (await autenticar(user.email)) {
          setParaVer("2")
          sessionStorage.setItem("acceso", true);
          sessionStorage.setItem("usuario", usuario);
          sessionStorage.setItem("pagina", "noLogin")
          sessionStorage.setItem("modo", "false");
          console.log("Si")
          router.push("inicio")
        } else {
          setParaVer("3")
          authG.signOut().then(() => {
            console.log("User denied access");
          }).catch((error) => {
            console.error("Error signing out:", error);
          });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData ? error.customData.email : null;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }
  useEffect(() => {
    if (paso === true) {
      sessionStorage.setItem("acceso", true);
      sessionStorage.setItem("usuario", usuario);
      sessionStorage.setItem("pagina", "noLogin")
      sessionStorage.setItem("modo", "false");
      console.log("Si")
      router.push("inicio")
    }
  }, [paso])
  return (
    <>
      <Head>
        <title>Alix Shop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logo.ico" />
      </Head>
      <BarEmpty isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}></BarEmpty>
      <div className={styles.superContainer}>
        <div className={styles.container}>
          <div className={styles.login}>
            <div className={styles.imagenC}>
              <img className={styles.logo} src="Logo.png" alt="Imagen No Encontrada"></img>
            </div>
          </div>
        </div>
        <div className={styles.buttonC}>
          <button className={styles.button} onClick={() => logearse()}>Iniciar Sesión</button>
        </div>
      </div>
    </>
  )
}
