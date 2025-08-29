# Install dependencies first:
# pip install fastapi uvicorn transformers accelerate torch

from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch
import json

app = FastAPI()

# Load FLAN-T5 model once at startup
model_name = "google/flan-t5-base"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

class RecipeRequest(BaseModel):
    ingredients: str
    continent: str

@app.post("/generate-recipe")
def generate_recipe(data: RecipeRequest):
    prompt = f"""
    You are a professional chef.
    Create a recipe from {data.continent} cuisine using these ingredients: {data.ingredients}.
    The output must be in JSON format with the following keys:
    recipe_name, ingredients, steps, cooking_time (minutes), calories (approximate).
    """

    inputs = tokenizer(prompt, return_tensors="pt").to(device)
    output = model.generate(
        **inputs,
        max_length=350,
        temperature=0.9,
        top_p=0.95,
        do_sample=True,
        num_return_sequences=1
    )

    raw_text = tokenizer.decode(output[0], skip_special_tokens=True)

    try:
        recipe = json.loads(raw_text)
    except:
        recipe = {"raw_output": raw_text}

    return {"recipe": recipe}

