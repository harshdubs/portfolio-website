# Harsh Dubey — Portfolio Website

Personal portfolio site for a Data & IoT Engineer transitioning to AI Engineering.

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** FastAPI (Python)
- **Deployment:** Docker Compose

## Quick Start

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Docker

```bash
docker-compose up
```

## API Endpoints

- `GET /api/projects` — Returns project list as JSON
- `POST /api/contact` — Accepts `{ name, email, message }`
