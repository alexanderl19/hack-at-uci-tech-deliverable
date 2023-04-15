from datetime import datetime
from typing import Any

from fastapi import FastAPI, Form, status
from fastapi.responses import RedirectResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from services.database import JSONDatabase

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

database: JSONDatabase[list[dict[str, Any]]] = JSONDatabase("data/database.json")


@app.on_event("startup")
def on_startup() -> None:
    if "posts" not in database:
        print("Adding posts entry to database")
        database["posts"] = []


@app.on_event("shutdown")
def on_shutdown() -> None:
    database.close()


@app.get("/quotes")
def get_quotes(after: str) -> JSONResponse:
    """
    Lists all quotes after a specific ISO Date.
    """
    after_date = datetime.fromisoformat(after)
    posts = list(
        filter(
            lambda post: datetime.fromisoformat(post["time"]) >= after_date,
            database["posts"],
        )
    )

    return JSONResponse(posts, status.HTTP_200_OK)


@app.post("/quotes")
def post_quote(name: str = Form(), message: str = Form()) -> RedirectResponse:
    """
    Process a user submitting a new quote.
    You should not modify this function.
    """
    now = datetime.now().replace(microsecond=0)
    post = {
        "name": name,
        "message": message,
        "time": now.isoformat(),
    }
    database["posts"].append(post)

    return RedirectResponse("/", status.HTTP_303_SEE_OTHER)
