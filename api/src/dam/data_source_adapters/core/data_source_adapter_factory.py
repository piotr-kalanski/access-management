from functools import lru_cache
from dam.data_source_adapters.core.adapter import DataSourceAdapter
from dam.data_source_adapters.core.types import DataSourceType
from dam.data_source_adapters.fake.adapter import FakeDataSourceAdapter
from dam.data_source_adapters.redshift.adapter import RedshiftDataSourceAdapter
from dam.model import ConnectionMetadata


__adapters_cache = {}

def get_data_source_adapter(cm: ConnectionMetadata) -> DataSourceAdapter:
    if cm.id in __adapters_cache:
        return __adapters_cache.get(cm.id)
    
    if cm.data_source_type == DataSourceType.Fake:
        adapter = FakeDataSourceAdapter(cm)
    elif cm.data_source_type == DataSourceType.Redshift:
        adapter = RedshiftDataSourceAdapter(cm)
    # TODO - support for more adapters
    else:
        raise NotImplementedError(cm.data_source_type)
    __adapters_cache[cm.id] = adapter
    return adapter
