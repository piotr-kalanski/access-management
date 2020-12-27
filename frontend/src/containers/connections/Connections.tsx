import React from 'react';
import { DataGrid, ColDef, ValueFormatterParams } from '@material-ui/data-grid';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import CreateConnectionButton from './CreateConnectionButton';
import connectionsApiClient from '../../apiClient/ConnectionsApiClient';
import { Connection } from './interfaces';

const columns: ColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 150,
        renderCell: (params: ValueFormatterParams) => (
            <Link href={`/connection/${params.value}`}>{params.value}</Link>
        ),
    },
    { field: 'description', headerName: 'Description', width: 400 },
    {
        field: 'data_source_type',
        headerName: 'Type',
        width: 200,
        renderCell: (params: ValueFormatterParams) => (
            <span>{params.value}</span>
        ),
    },
    { field: 'secret_reference_to_connect', headerName: 'Secret Reference', width: 200 },
];

const Connections = () => {
    const [connections, setConnections] = React.useState<Array<Connection>>([]);

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

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <CreateConnectionButton onConnectionAdded={handleConnectionAdded} />
            </Grid>
            <Grid item xs={12}>
                <div style={{ height: 500, width: '100%' }}>
                    <DataGrid rows={connections} columns={columns} pageSize={5} rowHeight={24} headerHeight={30} />
                </div>
            </Grid>
        </Grid>
    )
}

export default Connections;
