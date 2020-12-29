import React from 'react';
import { DataGrid, ColDef, ValueFormatterParams } from '@material-ui/data-grid';
import Link from '@material-ui/core/Link';
import usersApiClient, { UserAccountDTO } from '../../apiClient/UsersApiClient';
import AssignUserButton from './AssignUserButton';

const UsersAccounts = () => {
    const [usersAccounts, setUsersAccounts] = React.useState<Array<UserAccountDTO>>([]);

    const onUserAssigned = ((userId: string, connectionMetadataId: string, userAccountId: string) => {
        const uaIndex = usersAccounts.findIndex(ua => ua.id === userAccountId && ua.connection_metadata_id === connectionMetadataId);
        const newUserAccounts = [...usersAccounts];
        newUserAccounts[uaIndex] = {...usersAccounts[uaIndex]};
        newUserAccounts[uaIndex].user_id = userId;
        setUsersAccounts(newUserAccounts);
    });

    const columns: ColDef[] = [
        { field: 'id', headerName: 'Id', width: 100},
        { // TODO - display connection name
            field: 'connection_metadata_id',
            headerName: 'Connection ID',
            width: 300,
            renderCell: (params: ValueFormatterParams) => (
                <Link href={`/connection/${params.value}`}>{params.value}</Link>
            ),
        },
        { // TODO - display user name
            field: 'user_id',
            headerName: 'User ID',
            width: 300,
            renderCell: (params: ValueFormatterParams) => (
                params.value ? (<Link href={`/user/${params.value}`}>{params.value}</Link>) : <span/>
            ),
        },
        {
            field: 'operations',
            headerName: 'Operations',
            sortable: false,
            width: 160,
            renderCell: (params: ValueFormatterParams) => (
                <AssignUserButton
                    connectionMetadataId={params.getValue('connection_metadata_id') as string}
                    userAccountId={params.getValue('id') as string}
                    handleUserAssigned={ onUserAssigned }
                />
            ),  
        },    
    ];

    React.useEffect(() => {
        usersApiClient.getUsersAccounts()
            .then((response) => {
                setUsersAccounts(response.items);
            })
    }, []);

    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid rows={usersAccounts} columns={columns} pageSize={15} rowHeight={24} headerHeight={30} />
        </div>
    )
}

export default UsersAccounts;
