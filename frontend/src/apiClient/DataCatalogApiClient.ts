import config from '../config/config';

export interface DataSetDTO {
    id: string
    description: string
    connection_metadata_id: string
}

interface GetDataSetsResponse {
    items: Array<DataSetDTO>
}

class DataCatalogApiClient {

    baseURL: string

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    async getDataSets(): Promise<GetDataSetsResponse> {
        let apiUrl = `${this.baseURL}/datasets`;
        
        const response = await fetch(
            apiUrl,
            {
                method: 'GET',
            }
        );
        return await response.json();
    }
};

const instance = new DataCatalogApiClient(config.api.BASE_URL);

export default instance;
