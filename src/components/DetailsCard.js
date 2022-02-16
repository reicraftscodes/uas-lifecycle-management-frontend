import {Card, CardBody} from "reactstrap";

function DetailsCard({ name, value, children: icon }) {
    return (
        <Card>
            <CardBody>
                {icon}
                <div>
                    <p>{name}</p>
                    <p>{value}</p>
                </div>
            </CardBody>
        </Card>
    )
}

export default DetailsCard