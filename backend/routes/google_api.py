from fastapi import APIRouter
import requests
import os
from dotenv import load_dotenv
import re

load_dotenv()

router = APIRouter()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

@router.get("/google-search/{query}")
def google_search(query: str):

    url = f"https://www.googleapis.com/books/v1/volumes?q={query}&orderBy=newest&key={GOOGLE_API_KEY}&maxResults=12"

    res = requests.get(url).json()

    books = []

    if "items" not in res:
        return []

    for item in res["items"]:

        info = item.get("volumeInfo", {})

        description = info.get("description", "No description available")

        # ⭐ 10-line summary
        sentences = re.split(r'(?<=[.!?]) +', description)
        short_summary = " ".join(sentences[:10])

        preview = info.get("previewLink", "")
        infoLink = info.get("infoLink", "")   # ⭐ NEW (original google books page)

        books.append({
            "title": info.get("title", ""),
            "author": info.get("authors", ["Unknown"])[0],
            "image": info.get("imageLinks", {}).get("thumbnail", ""),
            "publisher": info.get("publisher", ""),
            "publishedDate": info.get("publishedDate", ""),
            "summary": short_summary,
            "preview": preview,
            "infoLink": infoLink   # ⭐ ADDED HERE
        })

    return books
