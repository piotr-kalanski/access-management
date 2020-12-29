from fastapi import APIRouter, Depends

import dam.users.doc as doc
from dam.users.dto import (AssignUserAccountRequest, CreateUserRequest,
                           GetUserAccountsResponse, GetUsersResponse, UserDTO)
from dam.users.service import UsersService, create_service_from_env

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


@router.get(
    "/users_accounts",
    tags=TAGS,
    description="Get all users accounts",
    response_model=GetUserAccountsResponse,
)
async def get_users_accounts(
    service: UsersService = Depends(users_service)
):
    return service.get_user_accounts()


@router.post(
    "/users/assign",
    tags=TAGS,
    description="Assign user account to user",
)
async def assign_user_account(
    uaar: AssignUserAccountRequest,
    service: UsersService = Depends(users_service)
):
    return service.assign_user_account(uaar)
