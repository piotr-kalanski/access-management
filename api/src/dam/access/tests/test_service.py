from dam.access.dto import GrantAccessRequest, UserAccessRightDTO
from dam.access.service import AccessManagementService
from dam.connections.repository import FakeConnectionsRepository
from dam.data_source_adapters.core.types import DataSourceType
from dam.model import ConnectionMetadata, User
from dam.users.dto import AssignUserAccountRequest
from dam.users.service import UsersService
from dam.users.users_account_assignment_repository import FakeUserAccountAssignmentRepository
from dam.users.users_repository import FakeUsersRepository


def test_grant_access():
    # given
    connection_repository=FakeConnectionsRepository([
        ConnectionMetadata(
            id="c1",
            data_source_type=DataSourceType.Fake,
            description="",
            secret_reference_to_connect="",
        )
    ])
    users_service=UsersService(
        user_repository=FakeUsersRepository([
            User(
                id="u1",
                name="user1"
            ),
        ]),
        uaa_repository=FakeUserAccountAssignmentRepository(),
        connection_repository=connection_repository
    )
    service = AccessManagementService(
        connection_repository=connection_repository,
        users_service=users_service,
    )
    users_service.assign_user_account(AssignUserAccountRequest(
        user_id="u1",
        user_account_id="c1_1",
        connection_metadata_id="c1"
    ))
    gar = GrantAccessRequest(
        user_id="u1",
        connection_metadata_id="c1",
        dataset_id="c1_1",
        access_type="read"
    )

    # when
    service.grant_access(gar)

    # then
    rights = service.get_user_access_rights(user_id="u1").rights

    assert len(rights) == 1
    r = rights[0]

    assert r == UserAccessRightDTO(
        connection_metadata_id="c1",
        dataset_id="c1_1",
        has_read_access=True,
        has_write_access=False,
    )

# TODO - add more unit tests