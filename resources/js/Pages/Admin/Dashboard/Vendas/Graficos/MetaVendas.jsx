import { Bar } from "react-chartjs-2";
import React from "react";

export default function MetaVendas({ dados, dadosComp, metasUsuarios , vendasUsuarios }) {

    const nomes = vendasUsuarios.map((item) => {
        return item.nome
    })

    const venda = vendasUsuarios.map((item) => {
        return item.vendas
    })

    const meta = vendasUsuarios.map((item) => {
        return metasUsuarios?.[item.id]
    })

    const metaComp = dadosComp?.vendas.map((item) => {
        return item.meta
    })
    const vendaComp = dadosComp?.vendas.map((item) => {
        return item.vendas
    })

    let colunas = [
        {
            label: "Vendas",
            backgroundColor: "rgba(65,211,16,0.89)",
            data: venda,
        } ,{
            label: "Meta",
            backgroundColor: "#11258d",
            data: meta,
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
