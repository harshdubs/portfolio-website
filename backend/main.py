import logging
from datetime import datetime

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

app = FastAPI(title="Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# --- Models ---

class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    message: str

# --- Project Data ---

projects = [
    {
        "title": "DataSense AI",
        "description": "AI-powered data analysis tool that lets users upload CSVs and ask natural language questions. Uses Groq LLM for intelligent data interpretation and visualization.",
        "tech": ["Streamlit", "Groq LLM", "Python", "Pandas"],
        "github": "https://github.com/harshdubey",
        "live": "#",
    },
    {
        "title": "Predictive Maintenance System",
        "description": "Machine learning pipeline for predicting equipment failures using Isolation Forest anomaly detection. Achieved 98% recall on factory sensor data.",
        "tech": ["Python", "Scikit-learn", "Isolation Forest", "Pandas"],
        "github": "https://github.com/harshdubey",
        "live": None,
    },
    {
        "title": "Factory Monitor",
        "description": "Real-time factory floor monitoring system with OPC-UA data collection, REST API backend, and containerized deployment for edge servers.",
        "tech": ["FastAPI", "OPC-UA", "Docker", "Python"],
        "github": "https://github.com/harshdubey",
        "live": None,
    },
    {
        "title": "OEE Dashboard",
        "description": "Overall Equipment Effectiveness dashboard pulling data from production databases, computing KPIs, and visualizing trends for plant managers.",
        "tech": ["Python", "SQL", "Power BI", "Data Pipelines"],
        "github": "https://github.com/harshdubey",
        "live": None,
    },
    {
        "title": "SQL Supply Chain Analytics",
        "description": "Advanced SQL analytics on a 180K-row supply chain dataset. Window functions, CTEs, and complex aggregations for logistics optimization.",
        "tech": ["SQL", "Window Functions", "CTEs", "PostgreSQL"],
        "github": "https://github.com/harshdubey",
        "live": None,
    },
]

# --- Routes ---

@app.get("/api/projects")
def get_projects():
    return projects


@app.post("/api/contact")
def submit_contact(msg: ContactMessage):
    logger.info(
        "Contact form submission: name=%s email=%s time=%s",
        msg.name,
        msg.email,
        datetime.now().isoformat(),
    )
    logger.info("Message: %s", msg.message)
    return {"status": "ok", "message": "Thank you for reaching out!"}
