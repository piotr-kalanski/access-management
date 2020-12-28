from abc import ABC, abstractmethod
from typing import List

from dam.model import DataSet


class DataSourceAdapter(ABC):

    @abstractmethod
    def get_datasets(self) -> List[DataSet]:
        ...
