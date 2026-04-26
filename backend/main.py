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
        "description": "Full-stack AI data analysis app — CSV upload, automated EDA, LLM-generated insights, multi-turn chat with memory, and dynamic chart generation. Deployed live on Streamlit Cloud.",
        "tech": ["Python", "Streamlit", "Groq LLM API", "Pandas"],
        "github": "https://github.com/harshdubs/datasense-ai",
        "live": "https://datasense-ai-kzwea7rrhrxb88bqgxydxu.streamlit.app",
    },
    {
        "title": "Predictive Maintenance ML Pipeline",
        "description": "Anomaly detection on industrial mixer motor sensors (temperature, vibration, current) using Isolation Forest on 34,560 readings — 98% recall, 100% precision flagging pre-failure patterns.",
        "tech": ["Python", "Scikit-learn", "Isolation Forest", "SQL"],
        "github": "https://github.com/harshdubs",
        "live": None,
    },
    {
        "title": "Manufacturing OEE Dashboard",
        "description": "End-to-end pipeline: OPC-UA data ingestion → Python ETL → SQL window function analysis → Power BI dashboard tracking Availability, Performance, and Quality across 8 machines.",
        "tech": ["Python", "SQL", "Power BI", "OPC-UA"],
        "github": "https://github.com/harshdubs",
        "live": None,
    },
    {
        "title": "Supply Chain Business Insights",
        "description": "SQL analysis on 180K+ row DataCo dataset using CTEs, RANK, LAG, LEAD — uncovered a 70% revenue collapse over 4 months invisible to standard aggregation queries.",
        "tech": ["SQL Server", "Python", "Excel", "Window Functions"],
        "github": "https://github.com/harshdubs",
        "live": None,
    },
    {
        "title": "Statistical A/B Analysis",
        "description": "Welch's t-test on 180K orders analyzing discount vs. profit: p = 0.00001, Cohen's d = -0.048 — separating statistical significance from business significance.",
        "tech": ["Python", "SciPy", "Pandas", "Hypothesis Testing"],
        "github": "https://github.com/harshdubs",
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
