from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from pdf_utils import extract_text
from summarizer import summarize_text

app = FastAPI()

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/summarize")
async def summarize(file: UploadFile = File(...)):
    try:
        # Extract text from uploaded PDF
        text = extract_text(file.file)

        # Generate AI response
        result = summarize_text(text)

        return {
            "summary": result.get("summary", ""),
            "keywords": result.get("keywords", []),
            "quiz": result.get("quiz", [])
        }

    except Exception as e:
        print("ERROR:", e)

        return {
            "error": str(e)
        }