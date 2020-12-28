import config from '../config/config';

export interface UserDTO {
    id: string
    name: string
}

interface GetUsersResponse {
    items: Array<UserDTO>
}

interface CreateUserRequest {
    name: string
}

class UsersApiClient {

    baseURL: string

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    async getUsers(): Promise<GetUsersResponse> {
        let apiUrl = `${this.baseURL}/users`;
        
        const response = await fetch(
            apiUrl,
            {
                method: 'GET',
            }
        );
        return await response.json();
    }

    async createUser(ccr: CreateUserRequest): Promise<UserDTO> {
        const response = await fetch(
            `${this.baseURL}/users`,
            {
                method: 'POST',
                body: JSON.stringify(ccr),
            }
        );
        return await response.json();
    }

    async deleteUser(userId: string): Promise<any> {
        const response = await fetch(
            `${this.baseURL}/users/${userId}`,
            {
                method: 'DELETE'
            }
        );
        return await response.json();
    }
};

const instance = new UsersApiClient(config.api.BASE_URL);

export default instance;
