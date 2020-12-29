import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import UsersAutoComplete from '../../components/forms/UsersAutoComplete';
import usersApiClient from '../../apiClient/UsersApiClient';

interface AssignUserButtonProps {
    connectionMetadataId: string,
    userAccountId: string,
    handleUserAssigned: (userId: string, connectionMetadataId: string, userAccountId: string) => void
}

export default function AssignUserButton(props: AssignUserButtonProps) {
    const [open, setOpen] = React.useState(false);

    const [userId, setUserId] = React.useState("");
    const [userName, setUserName] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUserChanged = (userId: string, userName: string) => {
        setUserId(userId);
        setUserName(userName);
    }

    const handleAssignUser = () => {
        // TODO - call api
        usersApiClient.assingUserAccount({
            user_id: userId,
            connection_metadata_id: props.connectionMetadataId,
            user_account_id: props.userAccountId,
        })
            .then((response:any) => {
                // TODO - alert context
                props.handleUserAssigned(userId, props.connectionMetadataId, props.userAccountId);
                setOpen(false);
            })
            .catch((reason: any) => {
                // TODO - alert context
                setOpen(false);
            });
    };
    
    return (
        <div>
            <Button variant="contained" color="primary" size="small" onClick={handleClickOpen}>
                Assign
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
                <DialogTitle id="form-dialog-title">Grant</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Assign account to {userName}
                    </DialogContentText>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <UsersAutoComplete
                                elementId="user-id"
                                handleUserChanged={handleUserChanged}
                            />
                        </Grid>                        
                    </Grid>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleAssignUser} color="primary">
                    Assign
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}