from functools import lru_cache
import uuid

from dam.connections.dto import (ConnectionMetadataDTO,
                                 CreateConnectionRequest,
                                 GetConnectionsResponse)
from dam.data_source_adapters.core.types import DataSourceType
from dam.model import ConnectionMetadata

from .repository import (ConnectionsRepository, create_repository_from_env)


class ConnectionsMetadataService:
    def __init__(self, connection_repository: ConnectionsRepository):
        self._connection_repository = connection_repository

    def create_connection(
        self,
        ccr: CreateConnectionRequest
    ) -> ConnectionMetadataDTO:
        c = ConnectionMetadata(
            id=str(uuid.uuid4())[:8],
            data_source_type=DataSourceType.from_str(ccr.data_source_type),
            description=ccr.description,
            secret_reference_to_connect=ccr.secret_reference_to_connect,
        )
        self._connection_repository.save(c)
        return self._map_connection_to_dto(c)

    def get_connections(self) -> GetConnectionsResponse:
        items = [
            self._map_connection_to_dto(c)
            for c in self._connection_repository.read_all()
        ]
        return GetConnectionsResponse(
            items=items
        )

    def delete_connection(self, id: str):
        self._connection_repository.delete(id)

    @staticmethod
    def _map_connection_to_dto(c: ConnectionMetadata) -> ConnectionMetadataDTO:
        return ConnectionMetadataDTO(
                id=c.id,
                data_source_type=c.data_source_type.value,
                description=c.description,
                secret_reference_to_connect=c.secret_reference_to_connect,
            )


@lru_cache
def create_service_from_env() -> ConnectionsMetadataService:
    return ConnectionsMetadataService(
        connection_repository=create_repository_from_env()
    )
