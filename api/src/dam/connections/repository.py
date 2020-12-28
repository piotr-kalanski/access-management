from abc import ABC, abstractmethod
from functools import lru_cache
import os
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


class ConnectionsRepositoryDynamoDB(ConnectionsRepository):
    def save(self, connection_metadata: ConnectionMetadata):
        ...  # TODO

    def read_all(self) -> List[ConnectionMetadata]:
        ...  # TODO

    def delete(self, id: str):
        ...  # TODO


@lru_cache
def create_repository_from_env() -> ConnectionsRepository:
    if os.environ.get('IS_LOCAL') == 'true':
        connection_repository = FakeConnectionsRepository()
        connection_repository.save(ConnectionMetadata(
            id="fake1",
            data_source_type=DataSourceType.Fake,
            description="Fake Connection",
            secret_reference_to_connect="",
        ))
    else:
        connection_repository = ConnectionsRepositoryDynamoDB()
    
    return connection_repository
