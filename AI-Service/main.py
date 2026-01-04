import os
import uvicorn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()
api_key = os.getenv("GOOGLE_GENAI_API_KEY")

if not api_key:
    raise ValueError("GOOGLE_GENAI_API_KEY environment variable not set")

client = genai.Client(api_key=api_key)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class ChatRequest(BaseModel):
    message : str

@app.post("/chat")
def chat_endpoint(request: ChatRequest):
    try:
        model_id = "gemini-2.5-flash" 

        # 1. Prepare User Message
        contents = [
            types.Content(
                role="user",
                parts=[
                    types.Part.from_text(text=request.message),
                ],
            ),
        ]
        
        # 2. Prepare Tools (Search)
        tools = [
            types.Tool(googleSearch=types.GoogleSearch()),
        ]
        
        # 3. Define System Instruction
        system_prompt = """
        You are a concise customer support AI for an online grocery store.
        STRICT RULES:
        1. NO Markdown: Do not use asterisks (**), bolding, or italics. Use plain text only.
        2. No Lists: Do not use bullet points unless absolutely necessary. Use commas instead.
        3. Give the recipe of what the user input the ingradients.
        """

        # 4. CONFIGURATION (The Fix is Here)
        generate_content_config = types.GenerateContentConfig(
            tools=tools,
            response_modalities=["TEXT"],
            temperature=0.7,
            system_instruction=system_prompt  # <--- Correct: Singular & Inside Config
        )

        full_response_text = ""
        
        # 5. Generate Content
        for chunk in client.models.generate_content_stream(
            model=model_id,
            contents=contents,
            config=generate_content_config, 
        ):
            if chunk.text:
                full_response_text += chunk.text

        return {"reply": full_response_text}

    except Exception as e:
        print(f"Error: {e}")
        # Check if it's a quota error (429) and give a clear message
        if "429" in str(e):
            return {"reply": "I am currently overloaded. Please wait 1 minute and try again."}
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)