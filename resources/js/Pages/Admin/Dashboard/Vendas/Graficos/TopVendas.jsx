import React from "react";
import {Bar} from "react-chartjs-2";

export default function TopVendas({dados, cor}) {

    const nomes = dados.map((item) => {
        return item.nome
    })

    const venda = dados.map((item) => {
        return item.valor
    })

    const data = {
        labels: nomes,
        datasets: [
            {
                label: "Vendas",
                backgroundColor: cor ?? "#000",
                // borderColor: "rgb(255, 99, 132)",
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
             height={300}/>
    )
}
