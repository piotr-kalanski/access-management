from fastapi import APIRouter, Depends

import dam.users.doc as doc
from dam.users.dto import (UserDTO,
                           CreateUserRequest,
                           GetUsersResponse)
from dam.users.service import (UsersService,
                               create_service_from_env)

router = APIRouter()

TAGS = ["Users"]


def users_service() -> UsersService:
    return create_service_from_env()


@router.post(
    "/users",
    tags=TAGS,
    description="Create new user",
    response_model=UserDTO,
)
async def create_user(
    ccr: CreateUserRequest,
    service: UsersService = Depends(users_service)
):
    return service.create_user(ccr)


@router.get(
    "/users",
    tags=TAGS,
    description="Get all users",
    response_model=GetUsersResponse,
)
async def get_users(
    service: UsersService = Depends(users_service)
):
    return service.get_users()


@router.delete(
    "/users/{user_id}",
    tags=TAGS,
    description="Delete user",
)
async def delete_user(
    user_id: str = doc.USER_ID_PARAM_DOC,
    service: UsersService = Depends(users_service)
):
    return service.delete_user(user_id)
