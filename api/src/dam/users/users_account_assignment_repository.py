import os
from abc import ABC, abstractmethod
from functools import lru_cache
from typing import List

from dam.model import UserAccountAssignment


class UserAccountAssignmentRepository(ABC):

    @abstractmethod
    def save(self, uaa: UserAccountAssignment):
        ...

    @abstractmethod
    def read_all(self) -> List[UserAccountAssignment]:
        ...


class FakeUserAccountAssignmentRepository(UserAccountAssignmentRepository):

    def __init__(self, assignments=None):
        self.items = {}
        if assignments:
            for a in assignments:
                self.save(a)

    def save(self, uaa: UserAccountAssignment):
        key = uaa.connection_metadata_id + "#" + uaa.user_account_id
        self.items[key] = uaa

    def read_all(self) -> List[UserAccountAssignment]:
        return list(self.items.values())


class UserAccountAssignmentRepositoryDynamoDB(UserAccountAssignmentRepository):
    def save(self, uaa: UserAccountAssignment):
        ...  # TODO

    def read_all(self) -> List[UserAccountAssignment]:
        ...  # TODO


@lru_cache
def create_repository_from_env() -> UserAccountAssignmentRepository:
    if os.environ.get('IS_LOCAL') == 'true':
        repository = FakeUserAccountAssignmentRepository()
    else:
        repository = UserAccountAssignmentRepositoryDynamoDB()

    return repository
