import React, {useEffect, useState} from 'react';


function AvgFailingPartsBarCharts(props) {
    const [avgFailParts , setAvgFailParts] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:8080/parts/failuretime`)
            .then(response => response.text())
            .then(data => setAvgFailParts(data));
    }, [])

    return (

        <div>{avgFailParts}</div>
    );
}

export default AvgFailingPartsBarCharts
