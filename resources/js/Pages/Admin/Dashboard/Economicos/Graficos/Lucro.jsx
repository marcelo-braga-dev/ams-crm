import {Bar, Line, } from "react-chartjs-2";
import React from "react";

export default function Lucro({dados}) {
    const vendas = () => {
        let medias = []
        for (let i = 1; i <= 12; i++) {
            medias.push(dados[i] ? dados[i].custo : null)
        }
        return medias
    }

    const lucros = () => {
        let medias = []
        for (let i = 1; i <= 12; i++) {
            medias.push(dados[i] ? dados[i].lucro : null)
        }
        return medias
    }

    const data = {
        labels: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
        datasets: [
            {
                label: "Lucro",
                backgroundColor: "rgb(59,189,13)",
                data: lucros(),
            }
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
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
        <Bar options={options} data={data}/>
    )
}
