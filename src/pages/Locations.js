import {List, ListItem, ListItemButton, ListItemText,Box,Typography,Paper,Divider} from "@mui/material";


const Locations = () => {




    return(
        <div>
            <Paper elevation={3} sx={{width:"50%",m:"auto", mt: "2%", mb: "2%"}}>
                <Typography align="center"  sx={{fontWeight: "bold", fontSize: '2rem', pt:2}}>Locations</Typography>
                <Divider sx={{mt: 1, mb: 2}}/>
            
                <Box sx={{width:"90%", m:"auto",pt:0}}>
                    <List sx={{pt:0}}>
                        <ListItem disablePadding sx={{borderRadius: 1, mb:0.1, bgcolor:"#004789", '& .MuiListItemButton-root:hover':{bgcolor: "#0060ba"}}}>
                            <ListItemButton component="a" href="/locations/Ankara">
                                <ListItemText>
                                    <Typography color="white" align="center" sx={{fontWeight: "bold", fontSize: '1rem'}}>Ankara</Typography>
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{borderRadius: 1, mb:0.1, bgcolor:"#004789", '& .MuiListItemButton-root:hover':{bgcolor: "#0060ba"}}}>
                            <ListItemButton component="a" href="/locations/Cardiff">
                                <ListItemText>
                                    <Typography color="white" align="center" sx={{fontWeight: "bold", fontSize: '1rem'}}>Cardiff</Typography>
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{borderRadius: 1, mb:0.1, bgcolor:"#004789", '& .MuiListItemButton-root:hover':{bgcolor: "#0060ba"}}}>
                            <ListItemButton component="a" href="/locations/Dublin">
                                <ListItemText>
                                    <Typography color="white" align="center" sx={{fontWeight: "bold", fontSize: '1rem'}}>Dublin</Typography>
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{borderRadius: 1, mb:0.1, bgcolor:"#004789", '& .MuiListItemButton-root:hover':{bgcolor: "#0060ba"}}}>
                            <ListItemButton component="a" href="/locations/Edinburgh">
                                <ListItemText>
                                    <Typography color="white" align="center" sx={{fontWeight: "bold", fontSize: '1rem'}}>Edinburgh</Typography>
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{borderRadius: 1, mb:0.1, bgcolor:"#004789", '& .MuiListItemButton-root:hover':{bgcolor: "#0060ba"}}}>
                            <ListItemButton component="a" href="/locations/London">
                                <ListItemText>
                                    <Typography color="white" align="center" sx={{fontWeight: "bold", fontSize: '1rem'}}>London</Typography>
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{borderRadius: 1, mb:0.1, bgcolor:"#004789", '& .MuiListItemButton-root:hover':{bgcolor: "#0060ba"}}}>
                            <ListItemButton component="a" href="/locations/Nevada">
                                <ListItemText>
                                    <Typography color="white" align="center" sx={{fontWeight: "bold", fontSize: '1rem'}}>Nevada</Typography>
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{borderRadius: 1, mb:0.1, bgcolor:"#004789", '& .MuiListItemButton-root:hover':{bgcolor: "#0060ba"}}}>
                            <ListItemButton component="a" href="/locations/St Athen">
                                <ListItemText>
                                    <Typography color="white" align="center" sx={{fontWeight: "bold", fontSize: '1rem'}}>St Athen</Typography>
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
                <br/>
            </Paper>
            
        </div>

    );
}

export default Locations
