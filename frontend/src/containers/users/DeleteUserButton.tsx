import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import usersApiClient from '../../apiClient/UsersApiClient';
import { DialogContentText } from '@material-ui/core';

interface DeleteUserButtonProps {
    userName: string,
    userId: string,
    onUserDeleted: (userId: string) => void
}

export default function DeleteUserButton(props: DeleteUserButtonProps) {
    const [open, setOpen] = React.useState(false);

    const handleDeleteClicked = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        usersApiClient.deleteUser(props.userId)
            .then((response:any) => {
                props.onUserDeleted(props.userId);
                // TODO - alert context

                setOpen(false);
            })
            .catch((reason: any) => {
                // TODO - alert context
                setOpen(false);
            });
    };

    return (
        <React.Fragment>
            <IconButton aria-label="delete" onClick={handleDeleteClicked}>
                <DeleteIcon color="error" />
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Delete user</DialogTitle>
                <DialogContent>
                    <DialogContentText>Do you want to delete user {props.userName}?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
};
