import {Bar, Line, Doughnut} from "react-chartjs-2";
import React from "react";

export default function TempoOnlineDiasUsuarios({dados}) {
    const dias = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 1]

    const horas = dados.map(item => {
        return {
            label: item[0].nome,
            data: dias.map(d => {
                const r = item.filter(function (w) {
                    return w.dia == d
                })
                return r[0]?.horas
            }),
        }
    })

    const data = {
        labels: dias,
        datasets: horas
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
        }
    };

    return (
        <div className="row scroll-auto">
            <div className="col">
                <Line options={options} data={data}/>
            </div>
        </div>

    )
}
