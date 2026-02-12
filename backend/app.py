from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.recommender import router as recommender_router
from routes.google_api import router as google_router
from routes.popular import router as popular_router

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"msg":"Book Recommender API Running"}

# Include Routes
app.include_router(recommender_router)
app.include_router(google_router)
app.include_router(popular_router)
