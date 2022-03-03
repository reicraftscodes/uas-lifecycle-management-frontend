import React, {useEffect} from 'react';
import {Card, Stack, Paper, ListItem, ListItemText, List} from '@mui/material';
import { styled } from '@mui/material/styles';
import {ListGroupItem} from "reactstrap";

const UserAircraft = () => {

    const [userAircraftList, setUserAircraftList] = React.useState([]);

    useEffect(() => {
        getUserAircraft();
    });

    const getUserAircraft = () => {
        const aircraftData = [
            {
                tailNumber: "G-001",
                location: "St Athen",
                platformStatus: "Operational",
                platformType: "Platform A",
                userAircraftFlyingHours: 55,
                totalAircraftFlyingHours: 250
            },
            {
                tailNumber: "G-002",
                location: "St Athen",
                platformStatus: "Operational",
                platformType: "Platform B",
                userAircraftFlyingHours: 34,
                totalAircraftFlyingHours: 175
            }
        ]
        setUserAircraftList(aircraftData);
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <Stack>
                {userAircraftList.map(row => (
                    <List>
                        <ListItem>
                            <ListItemText>Tail number:</ListItemText>
                            <ListItemText>{row.tailNumber}</ListItemText>
                        </ListItem>

                        <ListItem>
                            <ListItemText>Location:</ListItemText>
                            <ListItemText>{row.location}</ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>Platform:</ListItemText>
                            <ListItemText>{row.platformType}</ListItemText>
                        </ListItem>

                    </List>

                ))}
        </Stack>
    );


}

export default UserAircraft;

