from typing import List

from pydantic import BaseModel


class DataSetDTO(BaseModel):
    id: str
    description: str
    connection_metadata_id: str


class GetDataSetsResponse(BaseModel):
    items: List[DataSetDTO]
