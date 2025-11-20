# Copilot Instructions: Mergington High School Activities System

## Architecture Overview

This is a **separated frontend/backend architecture**:
- **Backend**: FastAPI (Python) - Pure API server on port 8000
- **Frontend**: React + Vite - SPA on port 3000/5173
- **Communication**: Vite proxy forwards `/api/*` requests to backend during development

The backend does NOT serve static files. CORS is configured in `src/app.py` for React dev servers (ports 3000 and 5173).

## Critical Workflows

### Running the Application (ALWAYS use 2 terminals)
```bash
# Terminal 1 - Backend
cd src
uvicorn app:app --reload --host 0.0.0.0 --port 8000

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

**Common Issue**: "HTTP proxy error" means backend isn't running. Start backend first, then frontend.

### Testing
```bash
# Backend tests (from project root)
pytest tests/test_app.py -v

# All endpoints use /api/ prefix
# Tests import from src.app, not app directly
```

### Frontend Development
```bash
cd frontend
npm install          # First time only
npm run dev          # Development server
npm run build        # Production build to dist/
```

## Project-Specific Conventions

### API Endpoints (ALL prefixed with `/api/`)
- `GET /api/activities` - Returns full activities dict
- `POST /api/activities/{name}/signup?email={email}` - Email as query param, not body
- `DELETE /api/activities/{name}/unregister?email={email}` - Email as query param

**Important**: Activity names are URL-encoded (e.g., "Chess Club" → "Chess%20Club"). The frontend handles this in `frontend/src/services/api.js` using `encodeURIComponent()`.

### Data Model (In-Memory)
The backend uses a single `activities` dict in `src/app.py` - **no database, no persistence**. Data resets on server restart. Each activity:
```python
{
    "description": str,
    "schedule": str, 
    "max_participants": int,
    "participants": list[str]  # Student emails
}
```

### React Component Structure
Components have co-located CSS files:
- `frontend/src/components/ActivityCard.jsx` + `ActivityCard.css`
- Each component manages its own styles, no global CSS framework

API calls are centralized in `frontend/src/services/api.js` - **always use this service, never fetch directly in components**.

### Error Handling Pattern
Backend returns FastAPI HTTPExceptions with `detail` field:
```python
raise HTTPException(status_code=400, detail="Student already signed up")
```

Frontend catches and displays `error.message` or `result.detail`:
```javascript
const result = await response.json();
if (!response.ok) {
    throw new Error(result.detail || 'Failed to sign up');
}
```

### Testing Patterns
Tests in `tests/test_app.py` use:
- `TestClient` from FastAPI (not real HTTP)
- `autouse` fixture to reset activities dict after each test
- Direct import: `from src.app import app, activities`

When adding endpoints, update tests to use `/api/` prefix.

## Integration Points

### Vite Proxy Configuration
`frontend/vite.config.js` proxies API requests:
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:8000',
    changeOrigin: true,
  }
}
```

Frontend calls `/api/activities`, Vite forwards to `http://localhost:8000/api/activities`.

### CORS Setup
Backend allows specific origins in `src/app.py`:
```python
allow_origins=["http://localhost:3000", "http://localhost:5173"]
```

If adding new frontend ports, update CORS origins.

## Key Files Reference

- `src/app.py` - All backend logic, in-memory data, CORS config
- `frontend/src/services/api.js` - Centralized API client
- `frontend/src/App.jsx` - Main state management (activities, messages)
- `tests/test_app.py` - Backend API tests with reset fixture
- `frontend/vite.config.js` - Dev server proxy configuration

## Legacy Files (DO NOT USE)
`src/static/*` - Old HTML/JS frontend, kept for reference only. The app now uses React frontend in `frontend/` directory.
