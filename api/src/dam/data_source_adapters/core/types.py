from enum import Enum


class DataSourceType(Enum):
    Redshift = "redshift"
    AwsLakeFormation = "aws_lake_formation"
