from fastapi import Path

USER_ID_PARAM_DOC = Path(
    ...,
    title="User id",
    description="""
        User id
    """
)
