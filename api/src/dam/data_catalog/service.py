from functools import lru_cache

from dam.connections.repository import (ConnectionsRepository,
                                        create_repository_from_env)
from dam.data_catalog.dto import DataSetDTO, GetDataSetsResponse
from dam.data_source_adapters.core import data_source_adapter_factory as dsaf
from dam.model import DataSet


class DataCatalogService:
    def __init__(self, connection_repository: ConnectionsRepository):
        self._connection_repository = connection_repository

    def get_datasets(self) -> GetDataSetsResponse:
        items = []

        for c in self._connection_repository.read_all():
            data_source_adapter = dsaf.get_data_source_adapter(c)
            items.extend((
                self._map_to_data_set_dto(d)
                for d in data_source_adapter.get_datasets()
            ))

        return GetDataSetsResponse(items=items)

    @staticmethod
    def _map_to_data_set_dto(d: DataSet) -> DataSetDTO:
        return DataSetDTO(
            id=d.id,
            description=d.description,
            connection_metadata_id=d.connection_metadata.id,
        )


@lru_cache
def create_service_from_env() -> DataCatalogService:
    return DataCatalogService(
        connection_repository=create_repository_from_env()
    )
