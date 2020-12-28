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
