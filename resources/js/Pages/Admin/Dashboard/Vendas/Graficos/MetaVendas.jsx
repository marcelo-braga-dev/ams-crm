import { Bar } from "react-chartjs-2";
import React from "react";

export default function MetaVendas({ dados, dadosComp }) {

    const nomes = dados.vendas.map((item) => {
        return item.nome
    })
    const meta = dados.vendas.map((item) => {
        return item.meta
    })
    const venda = dados.vendas.map((item) => {
        return item.vendas
    })


    const metaComp = dadosComp?.vendas.map((item) => {
        return item.meta
    })
    const vendaComp = dadosComp?.vendas.map((item) => {
        return item.vendas
    })

    let colunas = [
        {
            label: "Meta",
            backgroundColor: "#11258d",
            data: meta,
        }, {
            label: "Vendas",
            backgroundColor: "rgba(211,84,16,0.89)",
            data: venda,
        }
    ]

    if (dadosComp) colunas.push(
        {
            label: "Meta Compa.",
            backgroundColor: "#245745",
            data: metaComp,
        }, {
            label: "Vendas Compa.",
            backgroundColor: "#841595",
            data: vendaComp,
        }
    )

    // colunas.push()

    const data = {
        labels: nomes,
        datasets: colunas
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
