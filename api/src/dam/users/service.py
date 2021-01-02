import uuid
from functools import lru_cache

import dam.connections.repository as cr
import dam.users.users_account_assignment_repository as uaar
import dam.users.users_repository as ur
from dam.data_source_adapters.core import data_source_adapter_factory as dsaf
from dam.model import User, UserAccount, UserAccountAssignment
from dam.users.dto import (AssignUserAccountRequest, CreateUserRequest,
                           GetUserAccountsResponse, GetUsersResponse,
                           UserAccountBasicDTO, UserAccountDTO, UserDTO)
from dam.users.users_account_assignment_repository import \
    UserAccountAssignmentRepository


class UsersService:
    def __init__(
        self,
        user_repository: ur.UsersRepository,
        uaa_repository: UserAccountAssignmentRepository,
        connection_repository: cr.ConnectionsRepository
    ):
        self._user_repository = user_repository
        self._uaa_repository = uaa_repository
        self._connection_repository = connection_repository

    def create_user(
        self,
        cur: CreateUserRequest
    ) -> UserDTO:
        u = User(
            id=str(uuid.uuid4())[:8],
            name=cur.name,
        )
        self._user_repository.save(u)
        return self._map_user_to_dto(u, {})

    def get_users(self) -> GetUsersResponse:
        mapping = self._get_mapping_from_user_to_accounts()
        items = [
            self._map_user_to_dto(c, mapping)
            for c in self._user_repository.read_all()
        ]
        return GetUsersResponse(
            items=items
        )

    def get_user(self, user_id: str) -> UserDTO:
        mapping = self._get_mapping_from_user_to_accounts()
        u = self._user_repository.read(user_id)
        return self._map_user_to_dto(u, mapping)

    def delete_user(self, id: str):
        self._user_repository.delete(id)

    def get_user_accounts(self) -> GetUserAccountsResponse:
        items = []
        mapping = self._get_mapping_from_account_to_user()
        for c in self._connection_repository.read_all():
            data_source_adapter = dsaf.get_data_source_adapter(c)
            items.extend((
                self._map_to_user_account_dto(ua, mapping)
                for ua in data_source_adapter.get_user_accounts()
            ))

        return GetUserAccountsResponse(items=items)

    def assign_user_account(self, auar: AssignUserAccountRequest):
        self._uaa_repository.save(UserAccountAssignment(**auar.dict()))

    @staticmethod
    def _map_user_to_dto(u: User, mapping: dict) -> UserDTO:
        return UserDTO(
                id=u.id,
                name=u.name,
                accounts=mapping.get(u.id, [])
            )

    def _get_mapping_from_user_to_accounts(self) -> dict:
        mapping = {}
        for uaa in self._uaa_repository.read_all():
            u_id = uaa.user_id
            if u_id not in mapping:
                mapping[u_id] = []
            mapping[u_id].append(UserAccountBasicDTO(
                id=uaa.user_account_id,
                connection_metadata_id=uaa.connection_metadata_id,
            ))
        return mapping

    @staticmethod
    def _get_user_account_key(
        account_id: str,
        connection_metadata_id: str
    ) -> str:
        return connection_metadata_id + "#" + account_id

    def _get_mapping_from_account_to_user(self) -> dict:
        mapping = {}
        for uaa in self._uaa_repository.read_all():
            key = self._get_user_account_key(
                uaa.user_account_id,
                uaa.connection_metadata_id
            )
            mapping[key] = uaa.user_id
        return mapping

    @staticmethod
    def _map_to_user_account_dto(
        ua: UserAccount,
        mapping: dict
    ) -> UserAccountDTO:
        key = UsersService._get_user_account_key(
            ua.id,
            ua.connection_metadata.id
        )
        return UserAccountDTO(
            id=ua.id,
            connection_metadata_id=ua.connection_metadata.id,
            user_id=mapping.get(key)
        )


@lru_cache
def create_service_from_env() -> UsersService:
    return UsersService(
        user_repository=ur.create_repository_from_env(),
        uaa_repository=uaar.create_repository_from_env(),
        connection_repository=cr.create_repository_from_env()
    )
