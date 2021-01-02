from typing import List

from dam.data_source_adapters.core.adapter import DataSourceAdapter
from dam.data_source_adapters.core.types import AccessType
from dam.model import AccessPolicy, ConnectionMetadata, DataSet, UserAccount


class RedshiftDataSourceAdapter(DataSourceAdapter):
    def __init__(self, cm: ConnectionMetadata):
        self.cm = cm

    def get_datasets(self) -> List[DataSet]:
        raise NotImplementedError()  # TODO

    def get_user_accounts(self) -> List[UserAccount]:
        raise NotImplementedError()  # TODO

    def grant_access(
        self,
        user_account_id: str,
        dataset_id: str,
        access_type: AccessType,
    ):
        raise NotImplementedError()  # TODO

    def get_access_policies(self) -> List[AccessPolicy]:
        raise NotImplementedError()  # TODO
