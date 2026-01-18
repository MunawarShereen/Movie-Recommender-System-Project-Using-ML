from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pickle
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


movies_dict = pickle.load(open('movie_list.pkl', 'rb'))
movies = pd.DataFrame(movies_dict)
similarity = pickle.load(open('similarity.pkl', 'rb'))

@app.get("/movies")
def get_movies():

    return movies[['title', 'movie_id']].to_dict(orient='records')

@app.get("/recommend/{movie_title}")
def recommend(movie_title: str):
    try:
        index = movies[movies['title'] == movie_title].index[0]
        distances = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1])
        
        recommended_data = []
        for i in distances[1:6]: 
            recommended_data.append({
                "title": movies.iloc[i[0]].title,
                "id": int(movies.iloc[i[0]].movie_id)
            })
            
        return {"recommendations": recommended_data}
    except Exception as e:
        return {"error": str(e)}