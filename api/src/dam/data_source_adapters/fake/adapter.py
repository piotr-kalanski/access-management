from typing import List

from dam.data_source_adapters.core.adapter import DataSourceAdapter
from dam.data_source_adapters.core.types import AccessType
from dam.model import AccessPolicy, ConnectionMetadata, DataSet, UserAccount


class FakeDataSourceAdapter(DataSourceAdapter):

    def __init__(self, cm: ConnectionMetadata):
        self.cm = cm
        self.policies = []

    def get_datasets(self) -> List[DataSet]:
        return [
            DataSet(
                id=self.cm.id + "_" + str(i),
                description="desc_" + str(i),
                connection_metadata=self.cm
            )
            for i in range(1, 11)
        ]

    def get_user_accounts(self) -> List[UserAccount]:
        return [
            UserAccount(
                id=self.cm.id + "_" + str(i),
                connection_metadata=self.cm
            )
            for i in range(1, 11)
        ]

    def grant_access(
        self,
        user_account_id: str,
        dataset_id: str,
        access_type: AccessType,
    ):
        self.policies.append(AccessPolicy(
            connection_metadata_id=self.cm.id,
            user_account_id=user_account_id,
            dataset_id=dataset_id,
            has_read_access=access_type == AccessType.Read,
            has_write_access=access_type == AccessType.Write,
        ))

    def get_access_policies(self) -> List[AccessPolicy]:
        return self.policies
