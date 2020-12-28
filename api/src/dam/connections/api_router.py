from fastapi import APIRouter, Depends

import dam.connections.doc as doc
from dam.connections.dto import (ConnectionMetadataDTO,
                                 CreateConnectionRequest,
                                 GetConnectionsResponse)
from dam.connections.service import (ConnectionsMetadataService,
                                     create_service_from_env)

router = APIRouter()

TAGS = ["Connections"]


def connections_service() -> ConnectionsMetadataService:
    return create_service_from_env()


@router.post(
    "/connections",
    tags=TAGS,
    description="Create new connection",
    response_model=ConnectionMetadataDTO,
)
async def create_connection(
    ccr: CreateConnectionRequest,
    service: ConnectionsMetadataService = Depends(connections_service)
):
    return service.create_connection(ccr)


@router.get(
    "/connections",
    tags=TAGS,
    description="Get all connections",
    response_model=GetConnectionsResponse,
)
async def get_connections(
    service: ConnectionsMetadataService = Depends(connections_service)
):
    return service.get_connections()


@router.delete(
    "/connections/{connection_id}",
    tags=TAGS,
    description="Delete connection",
)
async def delete_connection(
    connection_id: str = doc.CONNECTION_ID_PARAM_DOC,
    service: ConnectionsMetadataService = Depends(connections_service)
):
    return service.delete_connection(connection_id)
