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
import { Connection } from './interfaces';
import connectionsApiClient from '../../apiClient/ConnectionsApiClient';

interface CreateConnectionButtonProps {
    onConnectionAdded: (c: Connection) => void
}

export default function CreateConnectionButton(props: CreateConnectionButtonProps) {
    const [open, setOpen] = React.useState(false);

    const [description, setDescription] = React.useState("");
    const [connectionType, setConnectionType] = React.useState("");
    const [secretReferenceToConnect, setSecretReferenceToConnect] = React.useState("");

    const [invalidDescription, setInvalidDescription] = React.useState(false);
    const [invalidConnectionType, setInvalidConnectionType] = React.useState(false);
    const [invalidSecretReferenceToConnect, setInvalidSecretReferenceToConnect] = React.useState(false);

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

    useEffect(() => {
        if(!secretReferenceToConnect.trim()) {
            setInvalidSecretReferenceToConnect(true);
        }
        else {
            setInvalidSecretReferenceToConnect(false);
        }
    }, [secretReferenceToConnect]);    

    const handleCreate = () => {
        let isValid = !invalidDescription && !invalidConnectionType && !invalidSecretReferenceToConnect;

        if(isValid) {
            connectionsApiClient.createConnection({
                description,
                data_source_type: connectionType,
                secret_reference_to_connect: secretReferenceToConnect
            })
                .then((response: Connection) => {
                    props.onConnectionAdded(response);
                    // TODO - alert context
                    //alertContext.showSuccessAlert(t('role was successfully added', { type: roleType }));

                    // clear form
                    setDescription('');
                    setConnectionType('');
                    setSecretReferenceToConnect('');

                    setOpen(false);
                })
                .catch((reason) => {
                    // TODO - alert context
                    //alertContext.showErrorAlert(reason.message);
                });
        }
    };

    // TODO - get data source types from API

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
                                    <MenuItem value="awsLakeFormation">Lake Formation</MenuItem>
                                </Select>
                                <FormHelperText error>{invalidConnectionType ? "Please select connection" : null}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <TextField
                                    id="secret-reference-to-connect"
                                    label="Secret reference"
                                    variant="outlined"
                                    value={secretReferenceToConnect}
                                    onChange={(event:any) => setSecretReferenceToConnect(event.target.value)}
                                    fullWidth
                                    error={invalidSecretReferenceToConnect}
                                    helperText={invalidSecretReferenceToConnect ? "Secret reference can't be empty" : null}
                                />
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
