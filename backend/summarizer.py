import google.generativeai as genai
import os
import json
from dotenv import load_dotenv

# Load API key
load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

# Gemini model
model = genai.GenerativeModel("gemini-2.5-flash")


def summarize_text(text):
    """
    Returns:
    {
        "summary": "...",
        "keywords": [...],
        "quiz": [
            {
                "question": "...",
                "options": [...],
                "answer": "..."
            }
        ]
    }
    """

    prompt = f"""
You are an AI study assistant.

Read the following document and return ONLY valid JSON.

Return the output in exactly this format:

{{
    "summary": "A detailed but simple summary.",
    "keywords": [
        "keyword1",
        "keyword2",
        "keyword3",
        "keyword4",
        "keyword5",
        "keyword6",
        "keyword7",
        "keyword8"
    ],
    "quiz": [
        {{
            "question": "Question 1?",
            "options": [
                "Option A",
                "Option B",
                "Option C",
                "Option D"
            ],
            "answer": "Option A"
        }},
        {{
            "question": "Question 2?",
            "options": [
                "Option A",
                "Option B",
                "Option C",
                "Option D"
            ],
            "answer": "Option C"
        }},
        {{
            "question": "Question 3?",
            "options": [
                "Option A",
                "Option B",
                "Option C",
                "Option D"
            ],
            "answer": "Option D"
        }},
        {{
            "question": "Question 4?",
            "options": [
                "Option A",
                "Option B",
                "Option C",
                "Option D"
            ],
            "answer": "Option B"
        }},
        {{
            "question": "Question 5?",
            "options": [
                "Option A",
                "Option B",
                "Option C",
                "Option D"
            ],
            "answer": "Option A"
        }}
    ]
}}

IMPORTANT:
Return ONLY JSON.
Do NOT write markdown.
Do NOT use ```json.
Do NOT explain anything.

Document:

{text[:12000]}
"""

    try:
        response = model.generate_content(prompt)

        raw_text = response.text.strip()

        # Remove markdown if Gemini accidentally returns it
        raw_text = raw_text.replace("```json", "")
        raw_text = raw_text.replace("```", "")
        raw_text = raw_text.strip()

        data = json.loads(raw_text)

        return data

    except Exception as e:

        print("Gemini Error:", e)

        return {
            "summary": "Unable to generate summary.",
            "keywords": [],
            "quiz": []
        }