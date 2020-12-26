from fastapi import FastAPI

from dam.connections.api_router import router as c_router

app = FastAPI()

app.include_router(c_router)
