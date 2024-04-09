import {Bar} from "react-chartjs-2";
import React from "react";

export default function MetaVendas({dados}) {

    const nomes = dados.vendas.map((item) => {
        return item.nome
    })
    const meta = dados.vendas.map((item) => {
        return item.meta
    })
    const venda = dados.vendas.map((item) => {
        return item.vendas
    })

    const data = {
        labels: nomes,
        datasets: [
            {
                label: "Meta",
                backgroundColor: "#11258d",
                data: meta,
            }, {
                label: "Venda",
                backgroundColor: "rgba(211,84,16,0.89)",
                data: venda,
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
        <Bar options={options} data={data}
             height={80}/>
    )
}
