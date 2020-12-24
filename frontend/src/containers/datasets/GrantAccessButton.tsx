import React from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
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
    const [accessType, setAccessType] = React.useState("read");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleGrant = () => {
        console.log(`Grant ${accessType} access to dataSet=${props.dataSetId} to user=${userId}`);
        setOpen(false);
    };
    
    return (
        <div>
            <Button variant="contained" color="primary" size="small" onClick={handleClickOpen}>
                Grant
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Grant access</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                       dataset {props.dataSetId}
                    </DialogContentText>
                    
                    <FormControl>
                        <InputLabel id="access-type-label">Access</InputLabel>
                        <Select
                            id="access-type"
                            labelId="access-type-label"
                            value={accessType}
                            onChange={(event: any) => setAccessType(event.target.value)}
                        >
                            <MenuItem value="read">Read</MenuItem>
                            <MenuItem value="write">Write</MenuItem>
                        </Select>
                    </FormControl>

                    <br />
                    <br />

                    <Autocomplete
                        id="user"
                        options={users}
                        getOptionLabel={(option: any) => option.name}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="User" variant="outlined" />}
                        onChange={(event: any, value: any) => { if(value) setUserId(value.id) }}
                    />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="secondary">
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