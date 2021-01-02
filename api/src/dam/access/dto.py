from typing import List

from pydantic import BaseModel


class GrantAccessRequest(BaseModel):
    user_id: str
    connection_metadata_id: str
    dataset_id: str
    access_type: str


class UserAccessRightDTO(BaseModel):
    connection_metadata_id: str
    dataset_id: str
    has_read_access: bool
    has_write_access: bool


class GetUserAccessRightsResponse(BaseModel):
    rights: List[UserAccessRightDTO]
