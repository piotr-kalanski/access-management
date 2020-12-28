from typing import List

from pydantic import BaseModel


class UserBase(BaseModel):
    name: str


class CreateUserRequest(UserBase):
    ...


class UserDTO(UserBase):
    id: str


class GetUsersResponse(BaseModel):
    items: List[UserDTO]


class UserAccountDTO(BaseModel):
    id: str
    connection_metadata_id: str


class GetUserAccountsResponse(BaseModel):
    items: List[UserAccountDTO]
