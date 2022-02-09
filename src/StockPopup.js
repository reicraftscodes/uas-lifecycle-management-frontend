import React from 'react';
import { UncontrolledAlert } from 'reactstrap';

function StockPopup() {
    return (
        <UncontrolledAlert color="danger">
            <a href="/stock-levels">Low Stock Levels!</a>
        </UncontrolledAlert>
    );
}

export default StockPopup;