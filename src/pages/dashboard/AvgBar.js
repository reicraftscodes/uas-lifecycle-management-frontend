import React, {useEffect, useState} from 'react';
import Chanrt from 'react-apexcharts'

function AvgBar(props) {

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
        fetch(`http://localhost:8080/parts/failuretime`)
            .then(response => response.json())
            .then(data => {
                setFailureTimes(data.map(x => x.failureTime));
                setPartTypes(data.map(x => x.partType));                
                
            });
    }, [])

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
               type="bar" width={700} height={320}/>
    );
}

export default AvgBar;