from abc import ABC, abstractmethod
from typing import List

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
