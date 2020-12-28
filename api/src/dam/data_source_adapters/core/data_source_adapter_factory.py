from dam.data_source_adapters.core.adapter import DataSourceAdapter
from dam.data_source_adapters.core.types import DataSourceType
from dam.data_source_adapters.fake.adapter import FakeDataSourceAdapter
from dam.data_source_adapters.redshift.adapter import RedshiftDataSourceAdapter
from dam.model import ConnectionMetadata


def get_data_source_adapter(cm: ConnectionMetadata) -> DataSourceAdapter:
    if cm.data_source_type == DataSourceType.Fake:
        return FakeDataSourceAdapter(cm)
    elif cm.data_source_type == DataSourceType.Redshift:
        return RedshiftDataSourceAdapter(cm)
    # TODO - support for more adapters
    raise NotImplementedError(cm.data_source_type)
