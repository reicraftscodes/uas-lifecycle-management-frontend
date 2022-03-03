import React, {useEffect} from 'react';
import {
    Card,
    Stack,
    Paper,
    ListItem,
    ListItemText,
    List,
    Divider,
    Box,
    CardHeader,
    Typography,
    CardContent
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {CardTitle, ListGroupItem} from "reactstrap";

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
        <div sx={{ bgcolor: 'grey'}}>
            <Stack direction="row" spacing={5} justifyContent="flex-start" sx={{ margin: 10, alignItems: 'center'}}>
                {userAircraftList.map(row => (
                    <Card sx={{ width: '40%', maxWidth: 360, minWidth: 380, bgcolor: 'background.paper', marginVertical: 5}}>
                        <CardContent>
                            <Typography sx={{ fontWeight: 'bold', marginTop: '10px', fontSize: '1.5rem'}}>Assigned Aircraft</Typography>
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

                            </List>
                        </CardContent>

                    </Card>


                ))}
            </Stack>
        </div>

    );


}

export default UserAircraft;

