import React from 'react'
import {Bar} from 'react-chartjs-2'
import ChartLegend from "./ChartLegend";
import ChartCard from "./ChartCard";

export default function PartsFailureChart({data}) {

    const barLegends = [
        { title: 'Parts', color: 'bg-teal-600' },
    ]

    const barOptions = {
        data: {
            labels: data.map((partRepairs) => {
                return (
                    partRepairs.partType + " (#" + partRepairs.partNumber + ")"
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
        <div>
            <ChartCard title="Most Common Failing Parts">
                <Bar {...barOptions} />
                <ChartLegend legends={barLegends} />
            </ChartCard>
        </div>
    )
}
