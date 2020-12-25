import React from 'react';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface GrantAccessButtonProps {
    dataSetId: string,
}

const users = [
    {id: "1", name: "user1"},
    {id: "2", name: "user2"},
    {id: "3", name: "user3"},
    {id: "4", name: "user4"},
];

export default function GrantAccessButton(props: GrantAccessButtonProps) {
    const [open, setOpen] = React.useState(false);

    const [userId, setUserId] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [accessType, setAccessType] = React.useState("read");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUserChanged = (event: any, value: any) => {
        if(value) {
            setUserId(value.id);
            setUserName(value.name);
        }
    }

    const handleGrant = () => {
        console.log(`Grant ${accessType} access to dataSet=${props.dataSetId} to user=${userId}`);
        setOpen(false);
    };
    
    return (
        <div>
            <Button variant="contained" color="primary" size="small" onClick={handleClickOpen}>
                Grant
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
                <DialogTitle id="form-dialog-title">Grant</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Grant {accessType} access to {userName}
                    </DialogContentText>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl variant="outlined">
                                <InputLabel id="access-type-label">Access</InputLabel>
                                <Select
                                    id="access-type"
                                    labelId="access-type-label"
                                    value={accessType}
                                    onChange={(event: any) => setAccessType(event.target.value)}
                                >
                                    <MenuItem value="read">Read access</MenuItem>
                                    <MenuItem value="write">Write access</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                id="user"
                                options={users}
                                getOptionLabel={(option: any) => option.name}
                                style={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="User" variant="outlined" />}
                                onChange={handleUserChanged}
                            />                            
                        </Grid>                        
                    </Grid>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleGrant} color="primary">
                    Grant
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}