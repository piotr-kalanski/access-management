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

class FakeConnectionsRepository(ConnectionsRepository):

    def __init__(self):
        self.items = {}

    def save(self, connection_metadata: ConnectionMetadata):
        self.items[connection_metadata.id] = connection_metadata

    def read_all(self) -> List[ConnectionMetadata]:
        return list(self.items.values())

class ConnectionsRepositoryDynamoDB(ConnectionsRepository):
    def save(self, connection_metadata: ConnectionMetadata):
        ...  # TODO

    def read_all(self) -> List[ConnectionMetadata]:
        ...  # TODO
