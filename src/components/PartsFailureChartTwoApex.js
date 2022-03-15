import React, {useEffect, useState} from 'react';
import Chart from 'react-apexcharts'

function PartsFailureChartTwoApex({data}) {

    const [partTypes, setPartTypes] = useState([]);
    const [failureTimes, setFailureTimes] = useState([]);
    const [chartState, setChartState] = useState({
        options: {
            chart: {
                id: 'chart'
            },
            xaxis: {
                categories: [],
            }
        },
        series: [{
            name: '',
            data: []
        }]
    });

    useEffect(() => {
        setFailureTimes(data.map(partRepairs => partRepairs.repairsCount));
        setPartTypes(data.map(partRepairs => partRepairs.partName + " (#" + partRepairs.partNumber + ")"));
    }, [data])

    useEffect(() => {
        setChartState({
            options: {
                chart: {
                    id: 'chart'
                },
                xaxis: {
                    categories: partTypes,
                }
            },
            series: [{
                name: '',
                data: failureTimes
            }]
        })
    }, [failureTimes, partTypes])

    return (
        <div>
            <p>Number of repairs</p>

            <Chart options={chartState.options}
                   series={chartState.series}
                   type="bar" width="100%" height={420}/>
        </div>
    );
}

export default PartsFailureChartTwoApex;