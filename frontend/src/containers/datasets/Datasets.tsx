import React from 'react';
import { DataGrid, ColDef, ValueFormatterParams } from '@material-ui/data-grid';
import Link from '@material-ui/core/Link';

const columns: ColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 100,
        renderCell: (params: ValueFormatterParams) => (
            <Link href={`/dataset/${params.value}`}>{params.value}</Link>
        ),
    },
    { field: 'description', headerName: 'Description', width: 400 },
    {
        field: 'connectionId',
        headerName: 'Connection',
        width: 300,
        renderCell: (params: ValueFormatterParams) => (
            <Link href={`/connection/${params.value}`}>{params.value}</Link>
        ),
    },
];

const rows = [
    { id: "1", description: 'Table1', connectionId: 'redshiftLive' },
    { id: "2", description: 'Table2', connectionId: 'redshiftLive' },
    { id: "3", description: 'Table3', connectionId: 'redshiftLive' },
];

const Datasets = () => {
    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} rowHeight={24} headerHeight={30} />
        </div>
    )
}

export default Datasets;
