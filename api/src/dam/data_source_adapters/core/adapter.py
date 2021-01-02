from abc import ABC, abstractmethod
from typing import List
from dam.data_source_adapters.core.types import AccessType

from dam.model import AccessPolicy, DataSet, UserAccount


class DataSourceAdapter(ABC):

    @abstractmethod
    def get_datasets(self) -> List[DataSet]:
        ...

    @abstractmethod
    def get_user_accounts(self) -> List[UserAccount]:
        ...

    @abstractmethod
    def grant_access(
        self,
        user_account_id: str,
        dataset_id: str,
        access_type: AccessType,
    ):
        ...

    @abstractmethod
    def get_access_policies(self) -> List[AccessPolicy]:
        ...
