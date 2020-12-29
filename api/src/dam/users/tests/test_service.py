from dam.connections.repository import FakeConnectionsRepository
from dam.data_source_adapters.core.types import DataSourceType
from dam.model import ConnectionMetadata, User
from dam.users.dto import AssignUserAccountRequest, CreateUserRequest
from dam.users.service import UsersService
from dam.users.users_account_assignment_repository import \
    FakeUserAccountAssignmentRepository
from dam.users.users_repository import FakeUsersRepository


def test_create_user():
    # given
    repository = FakeUsersRepository()
    service = UsersService(
        user_repository=repository,
        uaa_repository=FakeUserAccountAssignmentRepository(),
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
        uaa_repository=FakeUserAccountAssignmentRepository(),
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
        uaa_repository=FakeUserAccountAssignmentRepository(),
        connection_repository=connection_repository
    )

    # when
    get_user_accounts_response = service.get_user_accounts()
    user_accounts = get_user_accounts_response.items

    # then
    # fake data source has static 10 accounts
    assert len(user_accounts) == 2*10


def test_assign_user_account():
    # given
    service = UsersService(
        user_repository=FakeUsersRepository([
            User(
                id="u1",
                name="user1"
            ),
            User(
                id="u2",
                name="user2"
            ),
            User(
                id="u3",
                name="user3"
            )
        ]),
        uaa_repository=FakeUserAccountAssignmentRepository(),
        connection_repository=FakeConnectionsRepository([
            ConnectionMetadata(
                id="c1",
                data_source_type=DataSourceType.Fake,
                description="",
                secret_reference_to_connect="",
            )
        ]),
    )

    # when
    service.assign_user_account(AssignUserAccountRequest(
        user_id="u1",
        user_account_id="c1_1",
        connection_metadata_id="c1"
    ))
    service.assign_user_account(AssignUserAccountRequest(
        user_id="u2",
        user_account_id="c1_2",
        connection_metadata_id="c1"
    ))
    service.assign_user_account(AssignUserAccountRequest(
        user_id="u2",
        user_account_id="c1_3",
        connection_metadata_id="c1"
    ))

    # then
    users = service.get_users().items
    users_accounts = service.get_user_accounts().items

    u1 = [u for u in users if u.id == "u1"][0]
    u2 = [u for u in users if u.id == "u2"][0]
    u3 = [u for u in users if u.id == "u3"][0]
    ua1 = [a for a in users_accounts if a.id == "c1_1"][0]
    ua2 = [a for a in users_accounts if a.id == "c1_2"][0]
    ua3 = [a for a in users_accounts if a.id == "c1_3"][0]
    ua4 = [a for a in users_accounts if a.id == "c1_4"][0]

    assert ua1.user_id == "u1", "account1 is assigned to u1"
    assert ua2.user_id == "u2", "account2 is assigned to u2"
    assert ua3.user_id == "u2", "account3 is assigned to u2"
    assert ua4.user_id is None, "Account4 is not assigned to any users"
    assert len(u1.accounts) == 1, "User1 has one account assigned"
    assert len(u2.accounts) == 2, "User2 has two accounts assigned"
    assert len(u3.accounts) == 0, "User3 has zero accounts assigned"
    assert u1.accounts[0].id == ua1.id, "User1 has account1 assigned"
