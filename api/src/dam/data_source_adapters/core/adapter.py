from abc import ABC, abstractmethod
from typing import List

from dam.model import DataSet, UserAccount


class DataSourceAdapter(ABC):

    @abstractmethod
    def get_datasets(self) -> List[DataSet]:
        ...

    @abstractmethod
    def get_user_accounts(self) -> List[UserAccount]:
        ...
