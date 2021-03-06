import config from '../config/config';
import { Connection } from '../containers/connections/interfaces';

export interface ConnectionDTO {
    id: string
    data_source_type: string
    description: string
    secret_reference_to_connect: string
}

interface GetConnectionsResponse {
    items: Array<ConnectionDTO>
}

interface CreateConnectionRequest {
    data_source_type: string
    description: string
    secret_reference_to_connect: string
}

class ConnectionsApiClient {

    baseURL: string

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    async getConnections(): Promise<GetConnectionsResponse> {
        let apiUrl = `${this.baseURL}/connections`;
        
        const response = await fetch(
            apiUrl,
            {
                method: 'GET',
            }
        );
        return await response.json();
    }

    async createConnection(ccr: CreateConnectionRequest): Promise<Connection> {
        const response = await fetch(
            `${this.baseURL}/connections`,
            {
                method: 'POST',
                body: JSON.stringify(ccr),
            }
        );
        return await response.json();
    }

    async deleteConnection(connectionId: string): Promise<any> {
        const response = await fetch(
            `${this.baseURL}/connections/${connectionId}`,
            {
                method: 'DELETE'
            }
        );
        return await response.json();
    }
};

const instance = new ConnectionsApiClient(config.api.BASE_URL);

export default instance;
