# AI-Powered-Book-Recommendation-and-Exploration-Platform
# 📚 AI-Powered Book Recommendation & Exploration Platform

A **full-stack machine learning web application** that combines **content-based book recommendation**, **live auto-suggest search**, and **real-time Google Books integration** to help users discover and explore books intelligently.

---

## 🚀 Key Features

- ⭐ **Content-Based Recommendation** using **TF-IDF** and **Cosine Similarity**
- 🔎 **Live Auto-Suggest Search** with dropdown suggestions
- 📖 **Google Books API Integration** for real-time book details & summaries
- 🎨 **Premium Blog-Style Summary Layout**
- 🔗 Clickable books redirect to original **Google Books preview**

---

## 🧠 Tech Stack

**Backend:** Python, FastAPI, Pandas, Scikit-learn  
**Frontend:** React.js, React Router, Axios  
**ML:** TF-IDF Vectorizer, Cosine Similarity  
**API:** Google Books API

---

## ⚙️ Setup

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload

GOOGLE_API_KEY=your_api_key

cd frontend
npm install
npm run dev


