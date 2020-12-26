from pydantic import BaseModel
from dam.data_source_adapters.core.types import DataSourceType


class ConnectionMetadata(BaseModel):
    id: str
    data_source_type: DataSourceType
    description: str
    secret_reference_to_connect: str
