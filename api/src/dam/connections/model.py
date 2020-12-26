from pydantic import BaseModel

from dam.data_source_adapters.core.types import DataSourceType


class ConnectionMetadataBase(BaseModel):
    data_source_type: DataSourceType
    description: str
    secret_reference_to_connect: str


class CreateConnectionRequest(ConnectionMetadataBase):
    ...


class ConnectionMetadata(ConnectionMetadataBase):
    id: str
