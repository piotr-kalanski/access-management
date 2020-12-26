import uuid
from typing import List
from dam.connections.model import ConnectionMetadata, CreateConnectionRequest
from .repository import ConnectionsRepository


class ConnectionsMetadataService:
    def __init__(self, connection_repository: ConnectionsRepository):
        self._connection_repository = connection_repository

    def create_connection(self, ccr: CreateConnectionRequest):
        self._connection_repository.save(ConnectionMetadata(
            id=str(uuid.uuid4()),
            data_source_type=ccr.data_source_type,
            description=ccr.description,
            secret_reference_to_connect=ccr.secret_reference_to_connect,
        ))

    def get_connections(self) -> List[ConnectionMetadata]:
        return self._connection_repository.read_all()
