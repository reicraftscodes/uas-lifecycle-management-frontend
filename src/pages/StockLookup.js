import '../StockLookup.css'
import React from "react";
import {Link} from "react-router-dom";


const ALL_PARTS_URL = 'http://localhost:8080/parts/search-parts'
export default class StockLookup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {parts: []};
        this.onSubmit = this.onSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    onSubmit(event) {
        event.preventDefault();
        const payload = {
            "keyword": this.state.keyword
        };
        fetch(ALL_PARTS_URL, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(data => this.setState({parts: data}));
    }

    componentDidMount() {

        const dronePart = {name: 'Propeller', partId: 1, supplier: 'DronePartInc', location: 'Cardiff'}
        const dronePart2 = {name: 'Propeller', partId: 2, supplier: 'DronePartInc', location: 'Cardiff'}
        const dronePart3 = {name: 'Propeller', partId: 3, supplier: 'DronePartInc', location: 'Cardiff'}
        const dronePart4 = {name: 'Propeller', partId: 4, supplier: 'DronePartInc', location: 'Location2'}
        const dronePart5 = {name: 'Propeller', partId: 5, supplier: 'DronePartInc', location: 'Location2'}
        const dronePart6 = {name: 'Propeller', partId: 6, supplier: 'DronePartInc', location: 'Location4'}

        const dronePart7 = {name: 'Gimbal', partId: 7, supplier: 'DronePartInc', location: 'Cardiff'}
        const dronePart8 = {name: 'Gimbal', partId: 8, supplier: 'DronePartInc', location: 'Location2'}
        const dronePart9 = {name: 'Gimbal', partId: 9, supplier: 'DronePartInc', location: 'Location4'}

        const dronePart10 = {name: 'Tail', partId: 10, supplier: 'DronePartInc', location: 'Cardiff'}
        const dronePart11 = {name: 'Tail', partId: 11, supplier: 'DronePartInc', location: 'Location2'}
        const dronePart12 = {name: 'Tail', partId: 12, supplier: 'DronePartInc', location: 'Location4'}

        const dronePart13 = {name: 'Payload Electro Optical', partId: 13, supplier: 'DronePartInc', location: 'Cardiff'}
        const dronePart14 = {
            name: 'Payload Electro Optical',
            partId: 14,
            supplier: 'DronePartInc',
            location: 'Location2'
        }

        const dronePart15 = {name: 'Motor', partId: 15, supplier: 'DronePartInc', location: 'Cardiff'}
        const dronePart16 = {name: 'Motor', partId: 16, supplier: 'DronePartInc', location: 'Location3'}

        const dronePart17 = {name: 'Fuselage', partId: 17, supplier: 'DronePartInc', location: 'Cardiff'}
        const dronePart18 = {name: 'Fuselage', partId: 18, supplier: 'DronePartInc', location: 'Location3'}
        const dronePart19 = {name: 'Fuselage', partId: 19, supplier: 'DronePartInc', location: 'Location1'}
        const dronePart20 = {name: 'Fuselage', partId: 20, supplier: 'DronePartInc', location: 'Location2'}
        const dronePart21 = {name: 'Fuselage', partId: 21, supplier: 'DronePartInc', location: 'Location2'}
        const dronePart22 = {name: 'Fuselage', partId: 22, supplier: 'DronePartInc', location: 'Location3'}
        const dronePart23 = {name: 'Fuselage', partId: 23, supplier: 'DronePartInc', location: 'Location1'}
        const dronePart24 = {name: 'Fuselage', partId: 24, supplier: 'DronePartInc', location: 'Location2'}


        const droneParts = [dronePart, dronePart2, dronePart3, dronePart4, dronePart5, dronePart6,
            dronePart7, dronePart8, dronePart9, dronePart10, dronePart11, dronePart12, dronePart13, dronePart14, dronePart15,
            dronePart16, dronePart17, dronePart18, dronePart19, dronePart20, dronePart21, dronePart22, dronePart23, dronePart24]

        this.setState({"parts": droneParts})


    }

    render() {
        const {parts} = this.state;

        const partList = parts.map(part => {
            return <Link to={`/app/parts/${part.partId}`}>
                <div id="part-div">
                    <tr key={part.partId}>
                        <td style={{whiteSpace: 'nowrap'}} class="part-list-key-text">{part.name}</td>
                        <td class="part-list-key-text">{part.supplier}</td>
                        <td class="part-list-key-text">{part.location}</td>
                    </tr>
                </div>
            </Link>
        });


        return (
            <>
                <h1>Stock Lookup</h1>
                <br/>
                <h3 id="search-title">Search</h3>
                <p id="search-paragraph">Enter a location, name, rating or victory score to search the table</p>

                <form onSubmit={this.onSubmit}>
                    <label>
                        Keyword:
                        <input
                            name="keyword"
                            type="text"
                            value={this.state.keyword}
                            onChange={this.handleInputChange}/>
                    </label>
                    <br/>
                    <input type="submit" value="Search"/>
                </form>

                <table className="mt-4">
                    <thead>
                    <tr id="player-list-row">
                        <th className="player-list-data-text">Name</th>
                        <th className="player-list-data-text">Supplier</th>
                        <th className="player-list-data-text">Location</th>
                    </tr>
                    </thead>
                    <tbody>
                    {partList}
                    </tbody>
                </table>
            </>
        )
    }
}