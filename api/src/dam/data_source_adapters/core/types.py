from enum import Enum

from .exceptions import NotSupportedDataSource


class DataSourceType(Enum):
    Redshift = "redshift"
    AwsLakeFormation = "awsLakeFormation"
    Fake = "fake"

    @staticmethod
    def from_str(label: str):
        for d in DataSourceType:
            if label == d.value:
                return d

        raise NotSupportedDataSource(label)
