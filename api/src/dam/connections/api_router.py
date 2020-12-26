from functools import lru_cache

from fastapi import APIRouter, Depends

from dam.connections.dto import CreateConnectionRequest
from dam.connections.service import (ConnectionsMetadataService,
                                     create_service_from_env)

router = APIRouter()

TAGS = ["connections"]


@lru_cache
def connections_service() -> ConnectionsMetadataService:
    return create_service_from_env()


@router.post("/connections", tags=TAGS)
async def create_connection(
    ccr: CreateConnectionRequest,
    service: ConnectionsMetadataService = Depends(connections_service)
):
    return service.create_connection(ccr)


@router.get("/connections", tags=TAGS)
async def get_connections(
    service: ConnectionsMetadataService = Depends(connections_service)
):
    return service.get_connections()
