# Movie Recommendation System
## 1. Project Overview
This project implements a content-based movie recommendation system using machine learning. It suggests movies similar to a selected title by analyzing features like genres, keywords, overview, and cast

---

## 2. Types of Recommendation Systems

There are three main approaches used to build a recommendation engine:

---

### A. Content-Based Filtering

**Logic:**  
> *“If you liked this, you will like that.”*

**How it works:**  
This approach recommends items that are similar to what a user has liked in the past.  
It focuses on the **attributes or tags** of the items, such as:
- Genre
- Director
- Actors
- Plot

**Example:**  
If a user watches a romantic movie like *The Notebook*, the system may recommend similar romantic movies such as *Titanic* or *La La Land*.  
This method **does not consider other users’ opinions**.

---

### B. Collaborative Filtering

**Logic:**  
> *“Tell me who your friends are, and I’ll tell you who you are.”*

**How it works:**  
This method is based on the idea that users with similar past behavior will have similar preferences in the future.

**Example:**
- User A likes **Batman** and **Iron Man**
- User B likes **Batman** and **Iron Man**
- User A watches **Avengers** and likes it

The system recommends **Avengers** to User B because both users have similar tastes.

---

### C. Hybrid System

**Logic:**  
> *“The best of both worlds.”*

**How it works:**  
A hybrid system combines **Content-Based Filtering** and **Collaborative Filtering** to overcome the limitations of each approach, such as the **Cold Start problem** (when a new user has no interaction history).

**Example:**  
Netflix uses a hybrid recommendation system.  
It analyzes:
- The movies you watch (**Content-Based**)
- The behavior of users with similar tastes (**Collaborative Filtering**)

This combination leads to more accurate and personalized recommendations.

---

## 3. How the Content-Based Algorithm Works (Workflow)

For a project using **Content-Based Filtering**, the typical workflow is:

### Step 1: Data Preprocessing
- Clean the dataset
- Handle missing values
- Remove duplicate entries

### Step 2: Tag Creation
- Combine important columns such as:
  - Overview
  - Genre
  - Keywords
  - Cast
  - Crew
- Merge them into a single **Tags** column

### Step 3: Vectorization (Text to Numbers)
- Convert text data into numerical form using:
  - **CountVectorizer** (Bag of Words)
  - **TF-IDF**

### Step 4: Similarity Calculation
- Compute **Cosine Similarity** between movie vectors

**Interpretation:**
- Higher score (closer to 1) → More similar movies
- Lower score (closer to 0) → Less similar movies

### Step 5: Recommendation
- Sort movies based on similarity scores
- Return the **top 5 most similar movies** as recommendations


#How to Clone the Files
## Generate Model Files (`.pkl`)

The core logic and data processing of the project are implemented in a **Jupyter Notebook**.

### Steps

1. Open the **`Movies_Recommendation_system.ipynb`** file on your system.
2. Run **all the cells** in the notebook.
3. After the notebook finishes running, **two files will be generated**:
   - `movie_list.pkl`
   - `similarity.pkl`

### Important

- **Copy** both of these files  
- **Paste** them into the **`src/backend/`** folder

---

### Project Folder Structure

```text
movieRecommendation/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── backend/           # Python Backend Files
│   │   ├── main.py        # FastAPI Logic
│   │   ├── movie_list.pkl # Generated from Notebook
│   │   └── similarity.pkl # Generated from Notebook
│   ├── App.css
│   ├── App.jsx            # Main React Component
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```
