import React, {useEffect, useState} from 'react';
import Chart from 'react-apexcharts'
import PartsService from "../../services/PartsService";

function AvgFailureTimesBarChart(props) {

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
    // fetch failure times API
    useEffect(() => {
        PartsService.getFailingTime()
            .then(response => response.json())
            .then(data => {
                setFailureTimes(data.map(x => x.failureTime));
                setPartTypes(data.map(x => x.partType));

            });
    }, [])
    // render charts
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
        <Chart options={chartState.options}
               series={chartState.series}
               type="bar" width={1100} height={420}/>
    );
}

export default AvgFailureTimesBarChart;