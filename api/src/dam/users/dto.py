from typing import List, Optional

from pydantic import BaseModel


class UserBase(BaseModel):
    name: str


class CreateUserRequest(UserBase):
    ...


class UserAccountBasicDTO(BaseModel):
    id: str
    connection_metadata_id: str


class UserDTO(UserBase):
    id: str
    accounts: List[UserAccountBasicDTO] = []


class GetUsersResponse(BaseModel):
    items: List[UserDTO]


class UserAccountDTO(BaseModel):
    id: str
    connection_metadata_id: str
    user_id: Optional[str]


class GetUserAccountsResponse(BaseModel):
    items: List[UserAccountDTO]


class AssignUserAccountRequest(BaseModel):
    user_id: str
    user_account_id: str
    connection_metadata_id: str
