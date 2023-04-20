import {Bar, Line} from "react-chartjs-2";
import React from "react";

export default function Prazos({dados}) {
    const medias = () => {
        let medias = []
        for (let i = 1; i <= 12; i++) {
            medias.push(dados?.meses[i] ? dados?.media : null)
        }
        return medias
    }

    const data = {
        labels: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
        datasets: [
            {
                label: "Prazos (dias)",
                backgroundColor: "#bd770d",
                borderColor: "rgb(234,145,11)",
                data: [dados?.meses[1], dados?.meses[2], dados?.meses[3], dados?.meses[4], dados?.meses[5], dados?.meses[6], dados?.meses[7], dados?.meses[8], dados?.meses[9], dados?.meses[10], dados?.meses[11], dados?.meses[12]],
            },
            {
                label: "Média",
                backgroundColor: "rgb(234,255,99)",
                borderColor: "rgb(194,217,51)",
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
