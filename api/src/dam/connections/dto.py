from typing import List

from pydantic import BaseModel


class ConnectionMetadataBase(BaseModel):
    data_source_type: str
    description: str
    secret_reference_to_connect: str


class CreateConnectionRequest(ConnectionMetadataBase):
    ...


class ConnectionMetadataDTO(ConnectionMetadataBase):
    id: str


class GetConnectionsResponse(BaseModel):
    items: List[ConnectionMetadataDTO]
