from functools import lru_cache

from fastapi import APIRouter, Depends
from dam.data_catalog.dto import GetDataSetsResponse

from dam.data_catalog.service import DataCatalogService, create_service_from_env

router = APIRouter()

TAGS = ["Data Catalog"]


@lru_cache
def data_catalog_service() -> DataCatalogService:
    return create_service_from_env()


@router.get(
    "/datasets",
    tags=TAGS,
    description="Get all datasets",
    response_model=GetDataSetsResponse,
)
async def get_datasets(
    service: DataCatalogService = Depends(data_catalog_service)
):
    return service.get_datasets()
