import {Bar, Line} from "react-chartjs-2";
import React from "react";

export default function Faturamento({dados}) {
    const medias = () => {
        let medias = []
        for (let i = 1; i <= 12; i++) {
            medias.push(dados[i] ? dados.media : null)
        }
        return medias
    }

    const data = {
        labels: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
        datasets: [
            {
                label: "Vendas",
                backgroundColor: "#3bbd0d",
                borderColor: "rgb(156,255,99)",
                data: [dados[1], dados[2], dados[3], dados[4], dados[5], dados[6], dados[7], dados[8], dados[9], dados[10], dados[11], dados[12]],
            },
            {
                label: "Média",
                backgroundColor: "rgba(5,5,148,0.7)",
                borderColor: "rgba(0,0,255,0.5)",
                data: medias(),
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
        <Line options={options} data={data}/>
    )
}
