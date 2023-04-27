import React from "react";
import {Pie} from "react-chartjs-2";

export default function VendasMensasPie({dados}) {

    const data = {
        labels: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
        datasets: [
            {
                label: "Vendas",
                data: [
                    dados[1]?.valor, dados[2]?.valor, dados[3]?.valor,
                    dados[4]?.valor, dados[5]?.valor, dados[6]?.valor,
                    dados[7]?.valor, dados[8]?.valor, dados[9]?.valor,
                    dados[10]?.valor, dados[11]?.valor, dados[12]?.valor
                ],
            },
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
        <Pie options={options} data={data}
             height={500} width={500}/>
    )
}
