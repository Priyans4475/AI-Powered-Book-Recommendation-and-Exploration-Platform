from fastapi import APIRouter
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

router = APIRouter()

books = pd.read_csv("data/Books.csv", low_memory=False)

books['content'] = (
    books['Book-Title'].fillna('') + " " +
    books['Book-Author'].fillna('') + " " +
    books['Publisher'].fillna('') + " " +
    books['Year-Of-Publication'].astype(str)
)

books_cb = books.drop_duplicates(subset='Book-Title').reset_index(drop=True)
books_cb['title_lower'] = books_cb['Book-Title'].str.lower().str.strip()

tfidf = TfidfVectorizer(stop_words='english', max_features=3000, min_df=5, max_df=0.8)
tfidf_matrix = tfidf.fit_transform(books_cb['content'])

@router.get("/recommend/{book_name}")
def recommend(book_name: str):

    q = book_name.lower().strip()

    matches = books_cb[
        books_cb['title_lower'].str.contains(q, na=False)
    ]

    if matches.empty:
        return []

    index = matches.index[0]

    scores = cosine_similarity(tfidf_matrix[index], tfidf_matrix).flatten()

    similar_indices = scores.argsort()[::-1][1:9]

    data = []

    for i in similar_indices:
        data.append({
            "title": books_cb.loc[i,'Book-Title'],
            "author": books_cb.loc[i,'Book-Author'],
            "image": books_cb.loc[i,'Image-URL-M']
        })

    return data
