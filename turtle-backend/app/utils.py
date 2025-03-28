from pathlib import Path
from transformers import pipeline
from PyPDF2 import PdfReader

# Open the PDF file in binary mode
def read_pdf():
    pdf_paths = list(Path("/home/nagmani/root/projects/Turtle-Justice/turtle-backend/data/").glob("*.pdf"))
    text = ""  # Initialize text outside the loop
    for pdf_path in pdf_paths:
        reader = PdfReader(str(pdf_path))
        for page in reader.pages:
            text += page.extract_text() or ""
    return text


classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli",device=0)
intents = [
    "Fundamental Rights",
    "Directive Principles",
    "Structure of Government",
    "Federalism and Decentralization",
    "Citizenship and Electoral Provisions",
    "Economic Policies",
    "Social Justice",
    "Environmental Protection",
    "Amendment Procedures"
]

def get_intent(chunk):
    result = classifier(chunk, intents, multi_label=True)
    return result["labels"][:2]  # Top 2 intents


