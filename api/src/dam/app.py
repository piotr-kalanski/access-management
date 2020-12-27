from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from dam.connections.api_router import router as c_router

app = FastAPI(
    title="Data Access Management API"
)

# configure CORS (https://fastapi.tiangolo.com/tutorial/cors/)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(c_router)
