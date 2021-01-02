import os
from abc import ABC, abstractmethod
from functools import lru_cache
from typing import List

from dam.data_source_adapters.core.types import DataSourceType
from dam.model import ConnectionMetadata


class ConnectionsRepository(ABC):

    @abstractmethod
    def save(self, connection_metadata: ConnectionMetadata):
        ...

    @abstractmethod
    def read_all(self) -> List[ConnectionMetadata]:
        ...

    @abstractmethod
    def delete(self, id: str):
        ...

    @abstractmethod
    def read(self, id) -> ConnectionMetadata:
        ...


class FakeConnectionsRepository(ConnectionsRepository):

    def __init__(self, connections=None):
        self.items = {}
        if connections:
            for c in connections:
                self.save(c)

    def save(self, connection_metadata: ConnectionMetadata):
        self.items[connection_metadata.id] = connection_metadata

    def read_all(self) -> List[ConnectionMetadata]:
        return list(self.items.values())

    def delete(self, id: str):
        del self.items[id]

    def read(self, id) -> ConnectionMetadata:
        return self.items[id]


class ConnectionsRepositoryDynamoDB(ConnectionsRepository):
    def save(self, connection_metadata: ConnectionMetadata):
        ...  # TODO

    def read_all(self) -> List[ConnectionMetadata]:
        ...  # TODO

    def delete(self, id: str):
        ...  # TODO

    def read(self, id) -> ConnectionMetadata:
        ...  # TODO


@lru_cache
def create_repository_from_env() -> ConnectionsRepository:
    if os.environ.get('IS_LOCAL') == 'true':
        connection_repository = FakeConnectionsRepository()
        connection_repository.save(ConnectionMetadata(
            id="fake1",
            data_source_type=DataSourceType.Fake,
            description="Fake Connection 1",
            secret_reference_to_connect="fake secret 1",
        ))
        connection_repository.save(ConnectionMetadata(
            id="fake2",
            data_source_type=DataSourceType.Fake,
            description="Fake Connection 2",
            secret_reference_to_connect="fake secret 2",
        ))
    else:
        connection_repository = ConnectionsRepositoryDynamoDB()

    return connection_repository
