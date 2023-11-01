import {Bar} from "react-chartjs-2";
import React from "react";
import {convertMoneyFloat} from "@/Helpers/converterDataHorario";

export default function GraficoSemanas({dados, cor}) {
    const nomes = dados.map((item, index) => {
        return (index + 1) + '° sem.'
    })

    const venda = dados.map((item) => {
        return convertMoneyFloat(item)
    })

    const data = {
        labels: nomes,
        datasets: [
            {
                label: "Valor Total de Vendas (R$)",
                backgroundColor: cor ?? "#0f08",
                data: venda,
            },

        ],
        height: 500,
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
        <Bar options={options} data={data}
             height={200}/>
    )
}
