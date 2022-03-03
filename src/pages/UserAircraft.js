import React, {useEffect} from 'react';
import {
    Card,
    Stack,
    ListItem,
    ListItemText,
    List,
    Divider,
    Typography,
    CardContent
} from '@mui/material';


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


    return (
        <div id="userAircraft">
            <Stack direction="row" spacing={5} justifyContent="flex-start" sx={{ margin: 10, alignItems: 'center'}}>
                {userAircraftList.map((row, index) => (
                    <Card sx={{ width: '40%', maxWidth: 360, minWidth: 380, bgcolor: 'background.paper', marginVertical: 5}}>
                        <CardContent>
                            <Typography sx={{ fontWeight: 'bold', marginTop: '10px', fontSize: '1.5rem'}}>Assigned Aircraft {index+1}</Typography>
                            <List sx={{ maxWidth: 360, bgcolor: 'background.paper'}}>
                                <ListItem>
                                    <ListItemText sx={{ width: '50%', minWidth: '150px'}}>Tail number:</ListItemText>
                                    <ListItemText sx={{ width: '50%', minWidth: '150px'}}>{row.tailNumber}</ListItemText>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText sx={{ width: '50%', minWidth: '150px'}}>Location:</ListItemText>
                                    <ListItemText sx={{ width: '50%', minWidth: '150px'}}>{row.location}</ListItemText>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText sx={{ width: '50%', minWidth: '150px'}}>Platform:</ListItemText>
                                    <ListItemText sx={{ width: '50%', minWidth: '150px'}}>{row.platformType}</ListItemText>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText sx={{ width: '50%', minWidth: '150px'}}>Platform status:</ListItemText>
                                    <ListItemText sx={{ width: '50%', minWidth: '150px'}}>{row.platformStatus}</ListItemText>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText sx={{ width: '50%', minWidth: '150px'}}>Total flight time:</ListItemText>
                                    <ListItemText sx={{ width: '50%', minWidth: '150px'}}>{row.totalAircraftFlyingHours}h</ListItemText>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText sx={{ width: '50%', minWidth: '150px'}}>Your flight time:</ListItemText>
                                    <ListItemText sx={{ width: '50%', minWidth: '150px'}}>{row.userAircraftFlyingHours}h</ListItemText>
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </div>

    );


}

export default UserAircraft;

