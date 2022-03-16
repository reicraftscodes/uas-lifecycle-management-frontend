import React from 'react'
import {Bar} from 'react-chartjs-2'
import ChartLegend from "../../components/ChartLegend";

export default function AvgFailureTimesBarChart({data}) {

    const barLegends = [
        { title: 'Average Failure Times', color: 'bg-teal-600' },
    ]

    const barOptions = {
        data: {
            labels: data.map(x => x.partType),
            datasets: [
                {
                    label: 'Failure Time Hours',
                    backgroundColor: '#0694a2',
                    borderWidth: 1,
                    data: data.map(x => x.failureTime),
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
                <ChartLegend legends={barLegends} />
                <Bar {...barOptions} />
            </div>
        </div>
    )
}
