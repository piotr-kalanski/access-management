import uuid
from typing import List
from dam.data_source_adapters.core.types import DataSourceType
from dam.model import ConnectionMetadata
from dam.connections.dto import CreateConnectionRequest, ConnectionMetadataDTO, GetConnectionsResponse
from .repository import ConnectionsRepository, ConnectionsRepositoryDynamoDB


class ConnectionsMetadataService:
    def __init__(self, connection_repository: ConnectionsRepository):
        self._connection_repository = connection_repository

    def create_connection(self, ccr: CreateConnectionRequest) -> ConnectionMetadataDTO:
        c = ConnectionMetadata(
            id=str(uuid.uuid4()),
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

    @staticmethod
    def _map_connection_to_dto(c: ConnectionMetadata) -> ConnectionMetadataDTO:
        return ConnectionMetadataDTO(
                id=c.id,
                data_source_type=c.data_source_type.value,
                description=c.description,
                secret_reference_to_connect=c.secret_reference_to_connect,
            )


def create_service_from_env() -> ConnectionsMetadataService:
    return ConnectionsMetadataService(
        connection_repository=ConnectionsRepositoryDynamoDB()
    )
