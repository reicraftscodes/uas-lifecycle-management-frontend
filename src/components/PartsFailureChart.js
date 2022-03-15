import React from 'react'
import {Bar} from 'react-chartjs-2'
import ChartLegend from "./ChartLegend";

export default function PartsFailureChart({data}) {

    console.log(data)

    const barLegends = [
        { title: 'Parts', color: 'bg-teal-600' },
    ]

    const barOptions = {
        data: {
            labels: data.map((partRepairs) => {
                return (
                    partRepairs.partName + " (#" + partRepairs.partNumber + ")"
                );
            }),
            datasets: [
                {
                    label: 'Number of repairs',
                    backgroundColor: '#0694a2',
                    borderWidth: 1,
                    data: data.map((partRepairs) => {
                        return (
                            partRepairs.repairsCount
                        );
                    }),
                },
            ],
        },
        options: {
            responsive: true,
        },
        legend: {
            display: false,
        },
    }

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%"}}>
            <div style={{width: "90%"}}>
                <Bar {...barOptions} />
                <ChartLegend legends={barLegends} />
            </div>
        </div>
    )
}
