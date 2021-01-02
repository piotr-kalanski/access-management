from fastapi import APIRouter, Depends
from dam.access.dto import GrantAccessRequest

from dam.access.service import AccessManagementService, create_service_from_env


router = APIRouter()

TAGS = ["Access Management"]


def access_service() -> AccessManagementService:
    return create_service_from_env()


@router.post(
    "/access/grant",
    tags=TAGS,
    description="Grant access",
)
async def grant_access(
    gar: GrantAccessRequest,
    service: AccessManagementService = Depends(access_service)
):
    return service.grant_access(gar)


@router.get(
    "/access/policies/user/{user_id}",
    tags=TAGS,
    description="Get user access policies",
)
async def get_user_access_rights(
    user_id: str,
    service: AccessManagementService = Depends(access_service)
):
    return service.get_user_access_rights(user_id)

# TODO - add integration tests for api router