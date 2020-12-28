import React from 'react';
import { DataGrid, ColDef, ValueFormatterParams } from '@material-ui/data-grid';
import Link from '@material-ui/core/Link';
import GrantAccessButton from './GrantAccessButton';
import dataCatalogApiClient, { DataSetDTO } from '../../apiClient/DataCatalogApiClient';


const columns: ColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 100,
        renderCell: (params: ValueFormatterParams) => (
            <Link href={`/dataset/${params.value}`}>{params.value}</Link>
        ),
    },
    { // TODO - display connection name
        field: 'connection_metadata_id',
        headerName: 'Connection ID',
        width: 300,
        renderCell: (params: ValueFormatterParams) => (
            <Link href={`/connection/${params.value}`}>{params.value}</Link>
        ),
    },    
    { field: 'description', headerName: 'Description', width: 400 },
    {
        field: 'operations',
        headerName: 'Operations',
        sortable: false,
        width: 160,
        renderCell: (params: ValueFormatterParams) => (
            <GrantAccessButton dataSetId={params.getValue('id') as string} />
        ),  
    },
];

const Datasets = () => {
    const [dataSets, setDataSets] = React.useState<Array<DataSetDTO>>([]);

    React.useEffect(() => {
        dataCatalogApiClient.getDataSets()
            .then((response) => {
                setDataSets(response.items);
            })
    }, []);

    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid rows={dataSets} columns={columns} pageSize={15} rowHeight={24} headerHeight={30} />
        </div>
    )
}

export default Datasets;
