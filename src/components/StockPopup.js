import React from 'react';
import { UncontrolledAlert } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function StockPopup() {
    return (
        <UncontrolledAlert color="danger">
            <a href="/stock-levels">4 Low Stock Levels!</a>
        </UncontrolledAlert>
    );
}

export default StockPopup;