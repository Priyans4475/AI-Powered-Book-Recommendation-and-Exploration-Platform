from fastapi import APIRouter
import pandas as pd

router = APIRouter()

books = pd.read_csv("data/Books.csv", low_memory=False)
ratings = pd.read_csv("data/Ratings.csv")

ratings['Book-Rating'] = pd.to_numeric(ratings['Book-Rating'], errors='coerce')

ratings_with_name = ratings.merge(books, on='ISBN')

num_rating_df = ratings_with_name.groupby('Book-Title')['Book-Rating'].count().reset_index()
num_rating_df.rename(columns={'Book-Rating':'num_ratings'}, inplace=True)

avg_rating_df = ratings_with_name.groupby('Book-Title')['Book-Rating'].mean().reset_index()
avg_rating_df.rename(columns={'Book-Rating':'avg_rating'}, inplace=True)

popular_df = num_rating_df.merge(avg_rating_df, on='Book-Title')

popular_df = popular_df[popular_df['num_ratings']>=250] \
                .sort_values('avg_rating', ascending=False) \
                .head(50)

popular_df = popular_df.merge(books, on='Book-Title') \
                .drop_duplicates('Book-Title')[[
                    'Book-Title',
                    'Book-Author',
                    'Image-URL-M'
                ]]

@router.get("/top-books")
def top_books():

    data = []

    for i in popular_df.index:
        data.append({
            "title": popular_df.loc[i,'Book-Title'],
            "author": popular_df.loc[i,'Book-Author'],
            "image": popular_df.loc[i,'Image-URL-M']
        })

    return data
