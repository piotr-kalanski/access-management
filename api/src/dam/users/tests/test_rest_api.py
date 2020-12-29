from typing import List

import pytest
from fastapi.testclient import TestClient

from dam.app import app
from dam.connections.repository import FakeConnectionsRepository
from dam.data_source_adapters.core.types import DataSourceType
from dam.model import ConnectionMetadata
from dam.users.api_router import users_service
from dam.users.dto import CreateUserRequest, GetUserAccountsResponse, UserDTO
from dam.users.service import UsersService
from dam.users.users_account_assignment_repository import \
    FakeUserAccountAssignmentRepository
from dam.users.users_repository import FakeUsersRepository


def _create_users(
    test_api_client: TestClient,
    curs: List[CreateUserRequest]
):
    ids = []
    for cur in curs:
        response = test_api_client.post("/users", json=cur.dict())
        ids.append(response.json()["id"])
    return ids


def _get_users(
    test_api_client: TestClient
) -> List[UserDTO]:
    response = test_api_client.get("/users")
    assert response.status_code == 200, "Successfully get users"
    response_json = response.json()
    users = response_json["items"]
    return [UserDTO(**c) for c in users]


@pytest.fixture
def test_api_client() -> TestClient:
    client = TestClient(app)
    user_repository = FakeUsersRepository()

    def fake_users_service():
        return UsersService(
            user_repository=user_repository,
            uaa_repository=FakeUserAccountAssignmentRepository(),
            connection_repository=FakeConnectionsRepository([
                ConnectionMetadata(
                    id="f1",
                    data_source_type=DataSourceType.Fake,
                    description="fake1",
                    secret_reference_to_connect=""
                )
            ])
        )

    app.dependency_overrides[users_service] = fake_users_service
    return client


def test_create_user(test_api_client: TestClient):
    # given
    cur = CreateUserRequest(
        name="user1"
    )
    # when
    response = test_api_client.post("/users", json=cur.dict())

    # then
    assert response.status_code == 200, "User created successfully"

    users = _get_users(test_api_client)
    assert len(users) == 1, "There should be one user"

    u = users[0]
    assert u.name == cur.name


def test_delete_user(test_api_client: TestClient):
    # given
    identifiers = _create_users(test_api_client, [
        CreateUserRequest(
            name="user1"
        ),
        CreateUserRequest(
            name="user2"
        )
    ])
    # when
    response = test_api_client.delete("/users/" + identifiers[0])

    # then
    assert response.status_code == 200, "User deleted successfully"

    users = _get_users(test_api_client)
    assert len(users) == 1, "There should be one user"
    c = users[0]
    assert c.id == identifiers[1]


def test_get_user_accounts(test_api_client: TestClient):
    # when
    response = test_api_client.get("/users_accounts")

    # then
    assert response.status_code == 200, "User accounts returned successfully"

    get_user_accounts_response = GetUserAccountsResponse(**response.json())
    user_accounts = get_user_accounts_response.items

    assert len(user_accounts) == 10  # fake data source has static 10 datasets
