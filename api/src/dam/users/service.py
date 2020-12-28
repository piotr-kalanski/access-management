import uuid
from functools import lru_cache

import dam.connections.repository as cr
from dam.data_source_adapters.core import data_source_adapter_factory as dsaf
from dam.model import User, UserAccount
from dam.users.dto import (CreateUserRequest, GetUserAccountsResponse,
                           GetUsersResponse, UserAccountDTO, UserDTO)

from .repository import UsersRepository, create_repository_from_env


class UsersService:
    def __init__(
        self,
        user_repository: UsersRepository,
        connection_repository: cr.ConnectionsRepository
    ):
        self._user_repository = user_repository
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
        return self._map_user_to_dto(u)

    def get_users(self) -> GetUsersResponse:
        items = [
            self._map_user_to_dto(c)
            for c in self._user_repository.read_all()
        ]
        return GetUsersResponse(
            items=items
        )

    def delete_user(self, id: str):
        self._user_repository.delete(id)

    def get_user_accounts(self) -> GetUserAccountsResponse:
        items = []

        for c in self._connection_repository.read_all():
            data_source_adapter = dsaf.get_data_source_adapter(c)
            items.extend((
                self._map_to_user_account_dto(ua)
                for ua in data_source_adapter.get_user_accounts()
            ))

        return GetUserAccountsResponse(items=items)

    @staticmethod
    def _map_user_to_dto(u: User) -> UserDTO:
        return UserDTO(
                id=u.id,
                name=u.name,
            )

    @staticmethod
    def _map_to_user_account_dto(ua: UserAccount) -> UserAccountDTO:
        return UserAccountDTO(
            name=ua.name,
            connection_metadata_id=ua.connection_metadata.id,
        )


@lru_cache
def create_service_from_env() -> UsersService:
    return UsersService(
        user_repository=create_repository_from_env(),
        connection_repository=cr.create_repository_from_env()
    )
