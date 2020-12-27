from typing import List

import pytest
from fastapi.testclient import TestClient

from dam.app import app
from dam.connections.api_router import connections_service
from dam.connections.dto import ConnectionMetadataDTO, CreateConnectionRequest
from dam.connections.repository import FakeConnectionsRepository
from dam.connections.service import ConnectionsMetadataService
from dam.data_source_adapters.core.types import DataSourceType


def _create_connections(
    test_api_client: TestClient,
    ccrs: List[CreateConnectionRequest]
):
    ids = []
    for ccr in ccrs:
        response = test_api_client.post("/connections", json=ccr.dict())
        ids.append(response.json()["id"])
    return ids


def _get_connections(
    test_api_client: TestClient
) -> List[ConnectionMetadataDTO]:
    response = test_api_client.get("/connections")
    assert response.status_code == 200, "Successfully get connections"
    response_json = response.json()
    connections = response_json["items"]
    return [ConnectionMetadataDTO(**c) for c in connections]


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
    ccr = CreateConnectionRequest(
        data_source_type=DataSourceType.Redshift.value,
        description="desc",
        secret_reference_to_connect="secret1"
    )
    # when
    response = test_api_client.post("/connections", json=ccr.dict())

    # then
    assert response.status_code == 200, "Connection created successfully"

    connections = _get_connections(test_api_client)
    assert len(connections) == 1, "There should be one connection"

    c = connections[0]
    assert c.data_source_type == ccr.data_source_type
    assert c.description == ccr.description
    assert c.secret_reference_to_connect == ccr.secret_reference_to_connect


def test_delete_connection(test_api_client: TestClient):
    # given
    identifiers = _create_connections(test_api_client, [
        CreateConnectionRequest(
            data_source_type=DataSourceType.Redshift.value,
            description="d1",
            secret_reference_to_connect="s1"
        ),
        CreateConnectionRequest(
            data_source_type=DataSourceType.Redshift.value,
            description="d2",
            secret_reference_to_connect="s2"
        )
    ])
    # when
    response = test_api_client.delete("/connections/" + identifiers[0])

    # then
    assert response.status_code == 200, "Connection deleted successfully"

    connections = _get_connections(test_api_client)
    assert len(connections) == 1, "There should be one connection"
    c = connections[0]
    assert c.id == identifiers[1]
