from dam.connections.repository import FakeConnectionsRepository
from dam.data_source_adapters.core.types import DataSourceType
from dam.model import ConnectionMetadata, User
from dam.users.dto import CreateUserRequest
from dam.users.repository import FakeUsersRepository
from dam.users.service import UsersService


def test_create_user():
    # given
    repository = FakeUsersRepository()
    service = UsersService(
        user_repository=repository,
        connection_repository=FakeConnectionsRepository(),
    )

    # when
    service.create_user(CreateUserRequest(
        name="user1"
    ))

    # then
    users = service.get_users().items
    assert len(users) == 1
    u = users[0]
    assert u.name == "user1"


def test_remove_user():
    # given
    repository = FakeUsersRepository([
        User(
            id="1",
            name="u1"
        ),
        User(
            id="2",
            name="u2"
        ),
    ])
    service = UsersService(
        user_repository=repository,
        connection_repository=FakeConnectionsRepository(),
    )

    # when
    service.delete_user("1")

    # then
    users = service.get_users().items
    assert len(users) == 1
    u = users[0]
    assert u.id == "2"


def test_get_user_accounts_fake_data_source():
    # given
    connection_repository = FakeConnectionsRepository([
        ConnectionMetadata(
            id="f1",
            data_source_type=DataSourceType.Fake,
            description="fake1",
            secret_reference_to_connect=""
        ),
        ConnectionMetadata(
            id="f2",
            data_source_type=DataSourceType.Fake,
            description="fake2",
            secret_reference_to_connect=""
        ),
    ])
    service = UsersService(
        user_repository=FakeUsersRepository(),
        connection_repository=connection_repository
    )

    # when
    get_user_accounts_response = service.get_user_accounts()
    user_accounts = get_user_accounts_response.items

    # then
    # fake data source has static 10 accounts
    assert len(user_accounts) == 2*10
