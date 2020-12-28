import uuid
from functools import lru_cache

from dam.model import User
from dam.users.dto import CreateUserRequest, GetUsersResponse, UserDTO

from .repository import UsersRepository, create_repository_from_env


class UsersService:
    def __init__(self, user_repository: UsersRepository):
        self._user_repository = user_repository

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

    @staticmethod
    def _map_user_to_dto(u: User) -> UserDTO:
        return UserDTO(
                id=u.id,
                name=u.name,
            )


@lru_cache
def create_service_from_env() -> UsersService:
    return UsersService(
        user_repository=create_repository_from_env()
    )
