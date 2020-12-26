import pytest
from fastapi.testclient import TestClient
from dam.app import app
from dam.connections.api_router import connections_service
from dam.connections.dto import ConnectionMetadataDTO, CreateConnectionRequest
from dam.connections.repository import FakeConnectionsRepository
from dam.connections.service import ConnectionsMetadataService
from dam.data_source_adapters.core.types import DataSourceType


@pytest.fixture
def test_api_client() -> TestClient:
    client = TestClient(app)
    connection_repository = FakeConnectionsRepository()

    def fake_connections_service():
        return ConnectionsMetadataService(
            connection_repository=connection_repository
        )

    app.dependency_overrides[connections_service] = fake_connections_service
    return client


def test_create_connection(test_api_client: TestClient):
    # given
    create_connection_request = CreateConnectionRequest(
        data_source_type=DataSourceType.Redshift.value,
        description="desc",
        secret_reference_to_connect="secret1"        
    )
    # when
    response = test_api_client.post("/connections", json=create_connection_request.dict())

    # then
    assert response.status_code == 200, "Connection created successfully"
    
    response = test_api_client.get("/connections")
    assert response.status_code == 200, "Successfully get connections"

    response_json = response.json()
    assert "items" in response_json, "items field in get connections response"
    connections = response_json["items"]
    assert len(connections) == 1, "There should be one connection"

    assert "id" in connections[0], "Connection has id field"
    c = ConnectionMetadataDTO(**connections[0])
    assert c.data_source_type == create_connection_request.data_source_type
    assert c.description == create_connection_request.description
    assert c.secret_reference_to_connect == create_connection_request.secret_reference_to_connect
