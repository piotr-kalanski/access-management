import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { FormHelperText, TextField } from '@material-ui/core';

export default function CreateConnectionButton() {
    const [open, setOpen] = React.useState(false);

    const [description, setDescription] = React.useState("");
    const [connectionType, setConnectionType] = React.useState("");

    const [invalidDescription, setInvalidDescription] = React.useState(false);
    const [invalidConnectionType, setInvalidConnectionType] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if(!description.trim()) {
            setInvalidDescription(true);
        }
        else {
            setInvalidDescription(false);
        }
    }, [description]);

    useEffect(() => {
        if(!connectionType) {
            setInvalidConnectionType(true);
        }
        else {
            setInvalidConnectionType(false);
        }
    }, [connectionType]);    

    const handleCreate = () => {
        let isValid = !invalidDescription && !invalidDescription;

        if(isValid) {
            console.log(`Create new connection ${description} ${connectionType}`);
            setOpen(false);
        }
    };    

    return (
        <React.Fragment>
            <Button variant="contained" color="primary" size="small" onClick={handleClickOpen}>
                New connection
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
                <DialogTitle id="form-dialog-title">New connection</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl>
                                <TextField
                                    id="description"
                                    label="Description"
                                    variant="outlined"
                                    value={description}
                                    onChange={(event:any) => setDescription(event.target.value)}
                                    fullWidth
                                    error={invalidDescription}
                                    helperText={invalidDescription ? "Description can't be empty" : null}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined">
                                <InputLabel id="connection-type-label">Type</InputLabel>
                                <Select
                                    id="connection-type"
                                    labelId="connection-type-label"
                                    value={connectionType}
                                    fullWidth
                                    onChange={(event: any) => setConnectionType(event.target.value)}
                                    error={invalidConnectionType}
                                >
                                    <MenuItem value="redshift">Redshift</MenuItem>
                                    <MenuItem value="lakeFormation">Lake Formation</MenuItem>
                                </Select>
                                <FormHelperText error>{invalidConnectionType ? "Please select connection" : null}</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleCreate} color="primary">
                    Create
                </Button>
                </DialogActions>
            </Dialog>


        </React.Fragment>
    )
};
