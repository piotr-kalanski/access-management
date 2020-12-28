from typing import List

from dam.data_source_adapters.core.adapter import DataSourceAdapter
from dam.model import ConnectionMetadata, DataSet


class FakeDataSourceAdapter(DataSourceAdapter):
    def __init__(self, cm: ConnectionMetadata):
        self.cm = cm

    def get_datasets(self) -> List[DataSet]:
        return [
            DataSet(
                id=str(i),
                description="desc_" + str(i),
                connection_metadata=self.cm
            )
            for i in range(1, 11)
        ]
