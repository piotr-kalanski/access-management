import os

import uvicorn

from dam.app import app

if __name__ == "__main__":
    os.environ['IS_LOCAL'] = 'true'
    uvicorn.run(app, port=8080, log_level="info")
