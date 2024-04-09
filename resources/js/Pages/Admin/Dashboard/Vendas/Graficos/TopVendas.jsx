import React from "react";
import {Bar} from "react-chartjs-2";

export default function TopVendas({dados, cor}) {

    const nomes = dados.map((item) => item.nome)

    const venda = dados.map((item) => item.vendas)

    const data = {
        labels: nomes,
        datasets: [
            {
                label: "Vendas",
                backgroundColor: cor ?? "#000",
                data: venda,
            },

        ],
        height: 1000,
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
             height={100}/>
    )
}
