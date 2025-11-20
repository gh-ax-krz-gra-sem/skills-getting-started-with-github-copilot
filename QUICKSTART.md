# Quick Start Guide

## Prerequisites Check

```bash
# Check Python
python --version  # Should be 3.8+

# Check Node.js
node --version    # Should be 18+

# Check npm
npm --version
```

## First Time Setup

### 1. Install Backend Dependencies
```bash
pip install -r requirements.txt
```

### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

## Running the Application

### Start Backend (Terminal 1)
```bash
cd src
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

✅ Backend running at: http://localhost:8000
✅ API docs at: http://localhost:8000/docs

### Start Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```

✅ Frontend running at: http://localhost:3000 (or check terminal output)

## Quick Test

1. Open http://localhost:3000 in your browser
2. You should see the Mergington High School Activities page
3. Try signing up for an activity
4. Try removing a participant

## API Endpoints

- `GET /api/activities` - Get all activities
- `POST /api/activities/{name}/signup?email={email}` - Sign up
- `DELETE /api/activities/{name}/unregister?email={email}` - Unregister

## Troubleshooting

### Backend won't start
```bash
# Make sure you're in the src directory
cd src
# Check if port 8000 is available
lsof -i :8000
```

### Frontend won't start
```bash
# Make sure you're in the frontend directory
cd frontend
# Try removing node_modules and reinstalling
rm -rf node_modules package-lock.json
npm install
```

### CORS errors in browser
- Make sure backend is running on port 8000
- Check CORS configuration in `src/app.py`
- Frontend should be on port 3000 or 5173

### API calls failing
- Check that backend URL is correct in `frontend/vite.config.js`
- Verify backend is running: curl http://localhost:8000/api/activities
- Check browser console for detailed errors

## Development Tips

### Backend Hot Reload
The `--reload` flag automatically restarts the server when you edit Python files.

### Frontend Hot Reload
Vite provides instant hot module replacement - just save and see changes.

### Running Tests
```bash
# Backend tests
pytest -v

# With coverage
pytest --cov=src tests/
```

### Building for Production
```bash
cd frontend
npm run build
# Built files will be in frontend/dist/
```

## Project Structure Quick Reference

```
├── src/
│   └── app.py              # FastAPI backend
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Main component
│   │   ├── components/     # UI components
│   │   └── services/       # API client
│   └── package.json        # Frontend deps
├── tests/
│   └── test_app.py         # Backend tests
└── requirements.txt        # Backend deps
```

## Common Commands

```bash
# Backend
uvicorn app:app --reload                    # Start dev server
pytest                                      # Run tests
pytest -v                                   # Verbose tests

# Frontend
npm run dev                                 # Start dev server
npm run build                               # Build for production
npm run preview                             # Preview production build

# Both
git status                                  # Check changes
git add .                                   # Stage all changes
git commit -m "message"                     # Commit changes
git push                                    # Push to remote
```

## Need Help?

- Backend API docs: http://localhost:8000/docs (when running)
- Frontend README: `frontend/README.md`
- Full README: `README.md`
- Migration details: `MIGRATION.md`
