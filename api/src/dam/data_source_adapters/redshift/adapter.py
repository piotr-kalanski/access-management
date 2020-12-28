from typing import List

from dam.data_source_adapters.core.adapter import DataSourceAdapter
from dam.model import ConnectionMetadata, DataSet, UserAccount


class RedshiftDataSourceAdapter(DataSourceAdapter):
    def __init__(self, cm: ConnectionMetadata):
        self.cm = cm

    def get_datasets(self) -> List[DataSet]:
        raise NotImplementedError()  # TODO

    def get_user_accounts(self) -> List[UserAccount]:
        raise NotImplementedError()  # TODO
