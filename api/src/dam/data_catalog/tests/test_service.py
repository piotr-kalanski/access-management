from dam.connections.repository import FakeConnectionsRepository
from dam.data_catalog.service import DataCatalogService
from dam.data_source_adapters.core.types import DataSourceType
from dam.model import ConnectionMetadata


def test_get_datasets_fake_data_source():
    # given
    connection_repository = FakeConnectionsRepository([
        ConnectionMetadata(
            id="f1",
            data_source_type=DataSourceType.Fake,
            description="fake1",
            secret_reference_to_connect=""
        ),
        ConnectionMetadata(
            id="f2",
            data_source_type=DataSourceType.Fake,
            description="fake2",
            secret_reference_to_connect=""
        ),
    ])
    service = DataCatalogService(
        connection_repository=connection_repository
    )

    # when
    get_datasets_response = service.get_datasets()
    datasets = get_datasets_response.items

    # then
    assert len(datasets) == 2*10  # fake data source has static 10 datasets

# TODO - test with redshift adapter
# @patch('dam.data_source_adapters.redshift.adapter.RedshiftDataSourceAdapter')
# def test_get_datasets_redshift(mock_redshift_data_source_adapter):
#     # given
#     cm = ConnectionMetadata(
#         id="r1",
#         data_source_type=DataSourceType.Redshift,
#         description="fake1",
#         secret_reference_to_connect=""
#     )
#     connection_repository = FakeConnectionsRepository([cm])
#     mock_data_source_adapter = mock_redshift_data_source_adapter.return_value
#     mock_data_source_adapter.get_datasets.return_value = [
#         DataSet(
#             id="d1",
#             description="desc1",
#             connection_metadata=cm
#         ),
#         DataSet(
#             id="d2",
#             description="desc2",
#             connection_metadata=cm
#         ),
#     ]
#     service = DataCatalogService(
#         connection_repository=connection_repository
#     )

#     # when
#     get_datasets_response = service.get_datasets()
#     datasets = get_datasets_response.items

#     # then
#     assert len(datasets) == 2
#     assert datasets[0].id == "d1"
#     assert datasets[1].id == "d2"
