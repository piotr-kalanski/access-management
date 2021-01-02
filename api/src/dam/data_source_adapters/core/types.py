from enum import Enum

from .exceptions import NotSupportedAccessType, NotSupportedDataSource


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


class AccessType(Enum):
    Read = "read"
    Write = "write"

    @staticmethod
    def from_str(label: str):
        for at in AccessType:
            if label == at.value:
                return at

        raise NotSupportedAccessType(label)
