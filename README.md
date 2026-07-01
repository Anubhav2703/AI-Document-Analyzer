# 📄 AI Document Analyzer

An AI-powered web application that allows users to upload PDF documents and instantly generate intelligent summaries, extract important keywords, and interact with AI-powered document analysis.

🔗 **Live Demo:** https://ai-document-analyzer-theta.vercel.app

---

# 🚀 Features

✅ Upload PDF documents

✅ AI-powered document summarization using Google Gemini AI

✅ Automatic keyword extraction

✅ Text-to-Speech (Read Summary)

✅ Download Summary as PDF

✅ Copy Summary to Clipboard

✅ Responsive modern UI

✅ FastAPI Backend

✅ React + Vite Frontend

---

# 📸 <img width="1917" height="1036" alt="image" src="https://github.com/user-attachments/assets/8874b1a7-445c-4c61-8fe2-00037c7925aa" />


> Add screenshots of your application here.

Example:

```
Home Page
Summary Generation
Keyword Extraction
```

*(You can later upload screenshots inside a `screenshots` folder and link them here.)*

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- Axios
- React Icons
- CSS

## Backend

- FastAPI
- Python
- PyPDF2
- Google Gemini AI API
- Uvicorn

## Deployment

- Frontend → Vercel
- Backend → Render

---

# 📂 Project Structure

```
AI-Document-Analyzer
│
├── backend
│   ├── main.py
│   ├── summarizer.py
│   ├── pdf_utils.py
│   ├── requirements.txt
│   └── .env
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# ⚙️ Installation

## Clone the Repository

```bash
git clone https://github.com/Anubhav2703/AI-Document-Analyzer.git

cd AI-Document-Analyzer
```

---

## Backend Setup

```bash
cd backend

python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Create a `.env` file

```env
GEMINI_API_KEY=YOUR_API_KEY
```

Run backend

```bash
uvicorn main:app --reload
```

Backend runs on

```
http://127.0.0.1:8000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 📖 How It Works

1. Upload a PDF document.
2. Backend extracts text using PyPDF2.
3. Text is sent to Google Gemini AI.
4. Gemini generates:
   - Summary
   - Keywords
5. Results are displayed instantly.
6. Users can:
   - Read summary aloud
   - Copy summary
   - Download summary as PDF

---

# 🌐 Live Deployment

### Frontend

https://ai-document-analyzer-theta.vercel.app

### Backend API

https://anubhav-ai-document-analyzer.onrender.com

---

# 📌 API Endpoint

### POST

```
/summarize
```

Upload a PDF file using multipart/form-data.

Returns

```json
{
    "summary": "...",
    "keywords": [
        "...",
        "..."
    ],
    "quiz": []
}
```

---

# 🎯 Future Improvements

- 💬 Chat with PDF (RAG)
- 📝 AI Quiz Generator
- 🌍 Multi-language Summaries
- 📚 Summary History
- 📊 Reading Difficulty Analysis
- 📌 Highlight Important Sentences
- ☁️ Cloud Storage
- 🔍 Semantic Search
- 🤖 AI Study Assistant

---

# 👨‍💻 Author

**Anubhav Pratap Singh**

GitHub

https://github.com/Anubhav2703

LinkedIn

*(Add your LinkedIn profile here)*

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

---

# 📄 License

This project is licensed under the MIT License.
