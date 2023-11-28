import Bar from "@/components/bar";
import { useState, useEffect } from "react";
import Head from 'next/head'
import styles from '@/styles/Inicio.module.css'

export default function Inicio(){
    const [isDarkMode, setIsDarkMode] = useState(false);
    return (
        <>
          <Head>
            <title>Alix Shop</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/Logo.ico" />
          </Head>
          <Bar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}></Bar>
          <div>
           
          </div>
        </>
      )
}