from functools import lru_cache
from dam.access.dto import GetUserAccessRightsResponse, GrantAccessRequest, UserAccessRightDTO
import dam.connections.repository as cr
from dam.data_source_adapters.core import data_source_adapter_factory as dsaf
from dam.data_source_adapters.core.types import AccessType
from dam.model import AccessPolicy
import dam.users.service as us
import dam.connections.repository as cr


class AccessManagementService:

    def __init__(
        self,
        connection_repository: cr.ConnectionsRepository,
        users_service: us.UsersService,
    ):
        self._connection_repository = connection_repository
        self._users_service = users_service

    def grant_access(self, gar: GrantAccessRequest):
        user = self._users_service.get_user(gar.user_id)
        # TODO - handle situation when user doesn't have account
        user_account_id = [
            a.id
            for a in user.accounts
            if a.connection_metadata_id == gar.connection_metadata_id
        ][0]
        c = self._connection_repository.read(gar.connection_metadata_id)
        data_source_adapter = dsaf.get_data_source_adapter(c)
        data_source_adapter.grant_access(
            user_account_id=user_account_id,
            dataset_id=gar.dataset_id,
            access_type=AccessType.from_str(gar.access_type),
        )

    def get_user_access_rights(self, user_id: str) -> GetUserAccessRightsResponse:
        user = self._users_service.get_user(user_id)
        user_account_ids = [a.id for a in user.accounts]

        rights = []

        for c in self._connection_repository.read_all():
            data_source_adapter = dsaf.get_data_source_adapter(c)
            rights.extend((
                self._map_to_user_access_right(p)
                for p in data_source_adapter.get_access_policies()
                if p.user_account_id in user_account_ids
            ))

        return GetUserAccessRightsResponse(rights=rights)

    def _map_to_user_access_right(self, ap: AccessPolicy) -> UserAccessRightDTO:
        return UserAccessRightDTO(
            connection_metadata_id=ap.connection_metadata_id,
            dataset_id=ap.dataset_id,
            has_read_access=ap.has_read_access,
            has_write_access=ap.has_write_access,
        )


@lru_cache
def create_service_from_env() -> AccessManagementService:
    return AccessManagementService(
        connection_repository=cr.create_repository_from_env(),
        users_service=us.create_service_from_env()
    )
