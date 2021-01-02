from pydantic import BaseModel

from dam.data_source_adapters.core.types import DataSourceType


class ConnectionMetadata(BaseModel):
    id: str
    data_source_type: DataSourceType
    description: str
    secret_reference_to_connect: str


class DataSet(BaseModel):
    id: str
    description: str
    connection_metadata: ConnectionMetadata


class User(BaseModel):
    id: str
    name: str


class UserAccount(BaseModel):
    id: str
    connection_metadata: ConnectionMetadata


class UserAccountAssignment(BaseModel):
    user_id: str
    user_account_id: str
    connection_metadata_id: str


class AccessPolicy(BaseModel):
    connection_metadata_id: str
    user_account_id: str
    dataset_id: str
    has_read_access: bool
    has_write_access: bool
