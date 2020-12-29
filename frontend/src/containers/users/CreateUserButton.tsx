import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import usersApiClient, { UserDTO } from '../../apiClient/UsersApiClient';

interface CreateUserButtonProps {
    onUserAdded: (u: UserDTO) => void
}

export default function CreateUserButton(props: CreateUserButtonProps) {
    const [open, setOpen] = React.useState(false);

    const [name, setName] = React.useState("");

    const [invalidName, setInvalidName] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if(!name.trim()) {
            setInvalidName(true);
        }
        else {
            setInvalidName(false);
        }
    }, [name]);

    const handleCreate = () => {
        let isValid = !invalidName;

        if(isValid) {
            usersApiClient.createUser({
                name
            })
                .then((response: UserDTO) => {
                    props.onUserAdded(response);
                    // TODO - alert context
                    //alertContext.showSuccessAlert(t('role was successfully added', { type: roleType }));

                    // clear form
                    setName('');

                    setOpen(false);
                })
                .catch((reason) => {
                    // TODO - alert context
                    //alertContext.showErrorAlert(reason.message);
                });
        }
    };

    return (
        <React.Fragment>
            <Button variant="contained" color="primary" size="small" onClick={handleClickOpen}>
                New user
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
                <DialogTitle id="form-dialog-title">New user</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl>
                                <TextField
                                    id="name"
                                    label="Name"
                                    variant="outlined"
                                    value={name}
                                    onChange={(event:any) => setName(event.target.value)}
                                    fullWidth
                                    error={invalidName}
                                    helperText={invalidName ? "Name can't be empty" : null}
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
