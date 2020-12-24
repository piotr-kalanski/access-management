import React from 'react';
import { DataGrid, ColDef, ValueFormatterParams } from '@material-ui/data-grid';
import Link from '@material-ui/core/Link';

const columns: ColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 200,
        renderCell: (params: ValueFormatterParams) => (
            <Link href={`/connection/${params.value}`}>{params.value}</Link>
        ),
    },
    { field: 'description', headerName: 'Description', width: 400 },
    {
        field: 'dataSourceType',
        headerName: 'Type',
        width: 200,
        renderCell: (params: ValueFormatterParams) => (
            <span>{params.value}</span>
        ),
    },
];

const rows = [
    { id: "redshiftLive", description: 'Redshift Live', dataSourceType: "redshift" },
    { id: "lakeFormationEU", description: 'Lake Formation EU region', dataSourceType: "lakeFormation" },
    { id: "lakeFormationUS", description: 'Lake Formation USA region', dataSourceType: "lakeFormation" },
];

const Connections = () => {
    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} rowHeight={24} headerHeight={30} />
        </div>
    )
}

export default Connections;
