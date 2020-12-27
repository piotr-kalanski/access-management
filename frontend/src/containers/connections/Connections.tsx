import React from 'react';
import { DataGrid, ColDef, ValueFormatterParams } from '@material-ui/data-grid';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import CreateConnectionButton from './CreateConnectionButton';
import connectionsApiClient from '../../apiClient/ConnectionsApiClient';
import { Connection } from './interfaces';
import DeleteConnectionButton from './DeleteConnectionButton';

const Connections = () => {
    const [connections, setConnections] = React.useState<Array<Connection>>([]);

    const columns: ColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 120,
            renderCell: (params: ValueFormatterParams) => (
                <Link href={`/connection/${params.value}`}>{params.value}</Link>
            ),
        },
        { field: 'description', headerName: 'Description', width: 300 },
        {
            field: 'data_source_type',
            headerName: 'Type',
            width: 200,
            renderCell: (params: ValueFormatterParams) => (
                <span>{params.value}</span>
            ),
        },
        { field: 'secret_reference_to_connect', headerName: 'Secret ref', width: 200 },
        {
            field: 'operations',
            headerName: 'Actions',
            sortable: false,
            width: 100,
            renderCell: (params: ValueFormatterParams) => (
                <DeleteConnectionButton
                    connectionId={params.getValue('id') as string}
                    onConnectionDeleted={handleConnectionDeleted}
                />
            ),  
        },    
    ];

    React.useEffect(() => {
        connectionsApiClient.getConnections()
            .then((response:any) => {
                setConnections(response.items);
            })
    }, []);

    const handleConnectionAdded = React.useCallback(
        (c: Connection) => {
            setConnections([
                ...connections,
                c
            ]);
        },
        [connections],
    );

    const handleConnectionDeleted = React.useCallback(
        (connectionId: string) => {
            setConnections(connections.filter(c => c.id !== connectionId));
        },
        [connections],
    );

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <CreateConnectionButton onConnectionAdded={handleConnectionAdded} />
            </Grid>
            <Grid item xs={12}>
                <div style={{ height: 500, width: '100%' }} data-testid="connections">
                    <DataGrid rows={connections} columns={columns} pageSize={5} rowHeight={24} headerHeight={30} />
                </div>
            </Grid>
        </Grid>
    )
}

export default Connections;
