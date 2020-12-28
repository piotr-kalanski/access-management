import React from 'react';
import { DataGrid, ColDef, ValueFormatterParams } from '@material-ui/data-grid';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import CreateUserButton from './CreateUserButton';
import usersApiClient, { UserDTO } from '../../apiClient/UsersApiClient';
import DeleteUserButton from './DeleteUserButton';

const Users = () => {
    const [users, setUsers] = React.useState<Array<UserDTO>>([]);

    const columns: ColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 120,
            renderCell: (params: ValueFormatterParams) => (
                <Link href={`/user/${params.value}`}>{params.value}</Link>
            ),
        },
        { field: 'name', headerName: 'Name', width: 200 },
        {
            field: 'operations',
            headerName: 'Actions',
            sortable: false,
            width: 100,
            renderCell: (params: ValueFormatterParams) => (
                <DeleteUserButton
                    userId={params.getValue('id') as string}
                    userName={params.getValue('name') as string}
                    onUserDeleted={handleUserDeleted}
                />
            ),  
        },    
    ];

    React.useEffect(() => {
        usersApiClient.getUsers()
            .then((response:any) => {
                setUsers(response.items);
            })
    }, []);

    const handleUserAdded = React.useCallback(
        (u: UserDTO) => {
            setUsers([
                ...users,
                u
            ]);
        },
        [users],
    );

    const handleUserDeleted = React.useCallback(
        (userId: string) => {
            setUsers(users.filter(c => c.id !== userId));
        },
        [users],
    );

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <CreateUserButton onUserAdded={handleUserAdded} />
            </Grid>
            <Grid item xs={12}>
                <div style={{ height: 500, width: '100%' }} data-testid="users">
                    <DataGrid rows={users} columns={columns} pageSize={15} rowHeight={24} headerHeight={30} />
                </div>
            </Grid>
        </Grid>
    )
}

export default Users;
