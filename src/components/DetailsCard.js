import {Card, CardBody} from "reactstrap";

function DetailsCard({ name, value}) {
    return (
        <Card id="card">
            <CardBody>
                <div>
                    <p id="name">{name}</p>
                    <p id="value">{value}</p>
                </div>
            </CardBody>
        </Card>
    )
}

export default DetailsCard