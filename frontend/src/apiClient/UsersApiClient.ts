import config from '../config/config';

interface UserAccountBasicDTO {
    id: string
    connection_metadata_id: string
}

export interface UserDTO {
    id: string
    name: string
    accounts: Array<UserAccountBasicDTO>
}

interface GetUsersResponse {
    items: Array<UserDTO>
}

interface CreateUserRequest {
    name: string
}

export interface UserAccountDTO {
    id: string
    connection_metadata_id: string
    user_id?: string
}

interface GetUserAccountsResponse {
    items: Array<UserAccountDTO>    
}

interface AssignUserAccountRequest {
    user_id: string
    user_account_id: string
    connection_metadata_id: string
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

    async getUsersAccounts(): Promise<GetUserAccountsResponse> {
        let apiUrl = `${this.baseURL}/users_accounts`;
        
        const response = await fetch(
            apiUrl,
            {
                method: 'GET',
            }
        );
        return await response.json();
    }

    async assingUserAccount(auar: AssignUserAccountRequest): Promise<any> {
        const response = await fetch(
            `${this.baseURL}/users/assign`,
            {
                method: 'POST',
                body: JSON.stringify(auar),
            }
        );
        return await response.json();
    }    
};

const instance = new UsersApiClient(config.api.BASE_URL);

export default instance;
