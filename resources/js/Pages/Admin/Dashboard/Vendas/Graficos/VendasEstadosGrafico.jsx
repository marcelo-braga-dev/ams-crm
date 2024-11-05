import React from "react";
import { Pie, Bar } from "react-chartjs-2";

export default function VendasEstadosGrafico({ dados }) {

    const qtdVendas = dados.map(item => item.qtd)
    const estados = dados.map(item => item.estado ?? '?')

    const data = {
        labels: estados,
        datasets: [
            {
                label: "Qtd. Vendas",
                data: qtdVendas,
                backgroundColor: "#258475",
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
            height={80} />
    )
}
