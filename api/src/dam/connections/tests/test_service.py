from dam.connections.dto import CreateConnectionRequest
from dam.connections.repository import FakeConnectionsRepository
from dam.connections.service import ConnectionsMetadataService
from dam.data_source_adapters.core.types import DataSourceType
from dam.model import ConnectionMetadata


def test_create_connection():
    # given
    repository = FakeConnectionsRepository()
    service = ConnectionsMetadataService(repository)

    # when
    service.create_connection(CreateConnectionRequest(
        data_source_type=DataSourceType.Redshift.value,
        description="desc",
        secret_reference_to_connect="secret1"
    ))

    # then
    connections = service.get_connections().items
    assert len(connections) == 1
    c = connections[0]
    assert c.data_source_type == DataSourceType.Redshift.value
    assert c.description == "desc"
    assert c.secret_reference_to_connect == "secret1"


def test_remove_connection():
    # given
    repository = FakeConnectionsRepository([
        ConnectionMetadata(
            id="1",
            data_source_type=DataSourceType.Redshift,
            description="d1",
            secret_reference_to_connect="s1"
        ),
        ConnectionMetadata(
            id="2",
            data_source_type=DataSourceType.Redshift,
            description="d2",
            secret_reference_to_connect="s2"
        ),        
    ])
    service = ConnectionsMetadataService(repository)

    # when
    service.delete_connection("1")

    # then
    connections = service.get_connections().items
    assert len(connections) == 1
    c = connections[0]
    assert c.id == "2"
