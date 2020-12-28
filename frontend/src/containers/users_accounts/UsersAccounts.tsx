import React from 'react';
import { DataGrid, ColDef, ValueFormatterParams } from '@material-ui/data-grid';
import Link from '@material-ui/core/Link';
import usersApiClient, { UserAccountDTO } from '../../apiClient/UsersApiClient';


const columns: ColDef[] = [
    { field: 'id', headerName: 'Id', width: 100},
    { // TODO - display connection name
        field: 'connection_metadata_id',
        headerName: 'Connection ID',
        width: 300,
        renderCell: (params: ValueFormatterParams) => (
            <Link href={`/connection/${params.value}`}>{params.value}</Link>
        ),
    }
    // TODO - information about assigned user
];

const UsersAccounts = () => {
    const [usersAccounts, setUsersAccounts] = React.useState<Array<UserAccountDTO>>([]);

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
