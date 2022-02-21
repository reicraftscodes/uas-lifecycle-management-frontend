import {Card, CardBody} from "reactstrap";
import React from "react";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DetailsCard({ name, value, icon}) {
    return (
        <Card id="card">
            <CardBody>
                <div>
                    <p id="name">{name}</p>
                    <FontAwesomeIcon id="icon" icon={icon} />
                    <p id="value">{value}</p>
                </div>
            </CardBody>
        </Card>
    )
}

export default DetailsCard