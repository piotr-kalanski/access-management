import pytest
from fastapi.testclient import TestClient

from dam.app import app
from dam.connections.repository import FakeConnectionsRepository
from dam.data_catalog.api_router import data_catalog_service
from dam.data_catalog.dto import GetDataSetsResponse
from dam.data_catalog.service import DataCatalogService
from dam.data_source_adapters.core.types import DataSourceType
from dam.model import ConnectionMetadata


@pytest.fixture
def test_api_client() -> TestClient:
    client = TestClient(app)
    connection_repository = FakeConnectionsRepository([
        ConnectionMetadata(
            id="f1",
            data_source_type=DataSourceType.Fake,
            description="fake1",
            secret_reference_to_connect=""
        )
    ])

    def fake_data_catalog_service():
        return DataCatalogService(
            connection_repository=connection_repository
        )

    app.dependency_overrides[data_catalog_service] = fake_data_catalog_service
    return client


def test_get_datasets(test_api_client: TestClient):
    # when
    response = test_api_client.get("/datasets")

    # then
    assert response.status_code == 200, "Datasets returned successfully"

    get_datasets_response = GetDataSetsResponse(**response.json())
    datasets = get_datasets_response.items

    assert len(datasets) == 10  # fake data source has static 10 datasets
