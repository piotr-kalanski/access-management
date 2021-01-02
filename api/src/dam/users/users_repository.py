import os
from abc import ABC, abstractmethod
from functools import lru_cache
from typing import List

from dam.model import User


class UsersRepository(ABC):

    @abstractmethod
    def save(self, user: User):
        ...

    @abstractmethod
    def read_all(self) -> List[User]:
        ...

    @abstractmethod
    def delete(self, id: str):
        ...

    @abstractmethod
    def read(self, id: str) -> User:
        ...


class FakeUsersRepository(UsersRepository):

    def __init__(self, Users=None):
        self.items = {}
        if Users:
            for c in Users:
                self.save(c)

    def save(self, user: User):
        self.items[user.id] = user

    def read_all(self) -> List[User]:
        return list(self.items.values())

    def delete(self, id: str):
        del self.items[id]

    def read(self, id: str) -> User:
        return self.items[id]

class UsersRepositoryDynamoDB(UsersRepository):
    def save(self, user: User):
        ...  # TODO

    def read_all(self) -> List[User]:
        ...  # TODO

    def delete(self, id: str):
        ...  # TODO

    def read(self, id: str) -> User:
        ...  # TODO


@lru_cache
def create_repository_from_env() -> UsersRepository:
    if os.environ.get('IS_LOCAL') == 'true':
        users_repository = FakeUsersRepository()
        users_repository.save(User(
            id="u1",
            name="Fake user1"
        ))
        users_repository.save(User(
            id="u2",
            name="Fake user2"
        ))
    else:
        users_repository = UsersRepositoryDynamoDB()

    return users_repository
