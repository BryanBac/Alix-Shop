import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
  } from "chart.js";
import { useEffect, useState } from "react";
import styles from '@/styles/gauss.module.css'
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const options = {
    fill: true,
    responsive: true,
    scales: {
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

export default function BarChart(props){
    const {valores, etiquetas, nombre, valores2, nombre2, valores3, nombre3} = props;
    const data = {
        datasets: [
            {
              label: nombre,
              data: valores,
              tension: 0.3,
              borderColor: "rgb(75, 192, 192)",
              pointRadius: 6,
              backgroundColor: "rgb(231, 44, 3, 0.8)",
            },
            {
              label: nombre2,
              data: valores2,
              tension: 0.3,
              borderColor: "rgb(75, 192, 192)",
              pointRadius: 6,
              backgroundColor: "#000",
            },
            {
              label: nombre3,
              data: valores3,
              tension: 0.3,
              borderColor: "rgb(75, 192, 192)",
              pointRadius: 6,
              backgroundColor: "rgb(194, 156, 200, 0.8)",
            },
          ],
          labels: etiquetas,
    }

    useEffect(()=>{
    },[])
    return <div  className={styles.grafica}>
      <Bar data={data} options={options}/>
    </div>

}