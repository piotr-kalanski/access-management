from dam.connections.model import CreateConnectionRequest
from dam.connections.repository import FakeConnectionsRepository
from dam.connections.service import ConnectionsMetadataService
from dam.data_source_adapters.core.types import DataSourceType

def test_create_connection():
    # given
    repository = FakeConnectionsRepository()
    service = ConnectionsMetadataService(repository)

    # when
    service.create_connection(CreateConnectionRequest(
        data_source_type=DataSourceType.Redshift,
        description="desc",
        secret_reference_to_connect="secret1"
    ))

    # then
    connections = service.get_connections()
    assert len(connections) == 1
    c = connections[0]
    assert c.data_source_type == DataSourceType.Redshift
    assert c.description == "desc"
    assert c.secret_reference_to_connect == "secret1"
