
import React from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { User } from '../../containers/users/interfaces';
import usersApiClient from '../../apiClient/UsersApiClient';

interface UsersAutoCompleteProps {
    elementId: string,
    handleUserChanged: (userId: string, userName: string) => void,
}

export default function UsersAutoComplete(props: UsersAutoCompleteProps) {
    const [users, setUsers] = React.useState<Array<User>>([]);

    React.useEffect(() => {
        usersApiClient.getUsers()
            .then(response => setUsers(response.items));
    }, []);

    const handleUserChanged = (event: any, value: any) => {
        if(value) {
            props.handleUserChanged(value.id, value.name);
        }
    }

    return (
        <Autocomplete
            id={props.elementId}
            options={users}
            getOptionLabel={(option: any) => option.name}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="User" variant="outlined" />}
            onChange={handleUserChanged}
        />
    );
}
