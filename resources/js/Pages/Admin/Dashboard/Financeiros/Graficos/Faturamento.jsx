import {Bar, Line} from "react-chartjs-2";
import React from "react";

export default function Faturamento({dados, salarios}) {

    let entradasDia = []
    let saidasDia = []
    let dias = []
    for (let i = 1; i <= dados.ultimoDia; i++) {
        dias.push(i)
        entradasDia.push(dados?.movimentacao?.[i]?.entrada ?? 0)
        saidasDia.push(((dados?.movimentacao?.[i]?.saida ?? 0) + (salarios?.registros?.[i]?.total ?? 0)))
    }

    const data = {
        labels: dias,
        datasets: [
            {
                label: "Entradas",
                backgroundColor: "#3bbd0d",
                borderColor: "rgb(156,255,99)",
                data: entradasDia,
            },
            {
                label: "Saída",
                backgroundColor: "rgb(184,25,25)",
                borderColor: "rgb(231,17,17)",
                data: saidasDia,
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
                text: '',
            },
        },
    };

    return (
        <Line options={options} data={data} height="70"/>
    )
}
