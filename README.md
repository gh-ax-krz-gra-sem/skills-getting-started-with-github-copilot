# Mergington High School Activities Management System

A web application for managing extracurricular activities at Mergington High School. Students can view available activities, sign up for activities, and manage their registrations.

## Architecture

This application uses a **separate frontend and backend architecture**:

- **Backend**: FastAPI (Python) - RESTful API server
- **Frontend**: React.js with Vite - Single Page Application (SPA)

## Prerequisites

- Python 3.8 or higher
- Node.js 18 or higher
- npm or yarn package manager

## Installation

### Backend Setup

1. Navigate to the project root directory:
```bash
cd /workspaces/skills-getting-started-with-github-copilot
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install Node.js dependencies:
```bash
npm install
```

## Running the Application

You need to run **both** the backend and frontend servers simultaneously.

### Terminal 1: Start the Backend (FastAPI)

From the project root directory:

```bash
cd src
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

The FastAPI backend will be available at: **http://localhost:8000**

API endpoints:
- `GET /api/activities` - Get all activities
- `POST /api/activities/{activity_name}/signup?email={email}` - Sign up for an activity
- `DELETE /api/activities/{activity_name}/unregister?email={email}` - Unregister from an activity

### Terminal 2: Start the Frontend (React)

From the `frontend` directory:

```bash
npm run dev
```

The React frontend will be available at: **http://localhost:3000** (or **http://localhost:5173** for Vite)

## Features

- **View Activities**: Browse all available extracurricular activities with details including:
  - Description
  - Schedule
  - Available spots
  - Current participants
  
- **Sign Up**: Register for activities using your student email

- **Unregister**: Remove yourself from activities you've signed up for

- **Real-time Updates**: Activity lists update immediately after signup/unregister actions

## API Documentation

When the backend is running, visit **http://localhost:8000/docs** for interactive API documentation (Swagger UI).

## Development

### Backend Development

The backend uses FastAPI with CORS enabled for local development. The API endpoints are prefixed with `/api/`.

Key files:
- `src/app.py` - Main FastAPI application with all endpoints

### Frontend Development

The frontend is built with React and uses Vite as the build tool. It's configured to proxy API requests to the backend during development.

Key files:
- `frontend/src/App.jsx` - Main application component
- `frontend/src/components/` - Reusable React components
- `frontend/src/services/api.js` - API client for backend communication
- `frontend/vite.config.js` - Vite configuration with proxy setup

### Project Structure

```
.
├── src/
│   ├── app.py              # FastAPI backend
│   └── static/             # Legacy static files (not used)
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Main React component
│   │   ├── components/     # React components
│   │   └── services/       # API service
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
├── tests/
│   └── test_app.py         # Backend tests
├── requirements.txt        # Python dependencies
└── README.md               # This file
```

## Running Tests

Backend tests:
```bash
pytest
```

## Technologies Used

### Backend
- FastAPI - Modern web framework for building APIs
- Uvicorn - ASGI server
- Python 3.x

### Frontend
- React 18 - UI library
- Vite - Build tool and dev server
- Vanilla JavaScript (ES6+)
- CSS3

## Contributing

This project is part of the GitHub Skills "Getting Started with GitHub Copilot" course.

---

<div align="center">

# 🎉 Congratulations gh-ax-krz-gra-sem! 🎉

<img src="https://octodex.github.com/images/welcometocat.png" height="200px" />

### 🌟 You've successfully completed the exercise! 🌟

## 🚀 Share Your Success!

**Show off your new skills and inspire others!**

<a href="https://twitter.com/intent/tweet?text=I%20just%20completed%20the%20%22Getting%20Started%20with%20GitHub%20Copilot%22%20GitHub%20Skills%20hands-on%20exercise!%20%F0%9F%8E%89%0A%0Ahttps%3A%2F%2Fgithub.com%2Fgh-ax-krz-gra-sem%2Fskills-getting-started-with-github-copilot%0A%0A%23GitHubSkills%20%23OpenSource%20%23GitHubLearn" target="_blank" rel="noopener noreferrer">
  <img src="https://img.shields.io/badge/Share%20on%20X-1da1f2?style=for-the-badge&logo=x&logoColor=white" alt="Share on X" />
</a>
<a href="https://bsky.app/intent/compose?text=I%20just%20completed%20the%20%22Getting%20Started%20with%20GitHub%20Copilot%22%20GitHub%20Skills%20hands-on%20exercise!%20%F0%9F%8E%89%0A%0Ahttps%3A%2F%2Fgithub.com%2Fgh-ax-krz-gra-sem%2Fskills-getting-started-with-github-copilot%0A%0A%23GitHubSkills%20%23OpenSource%20%23GitHubLearn" target="_blank" rel="noopener noreferrer">
  <img src="https://img.shields.io/badge/Share%20on%20Bluesky-0085ff?style=for-the-badge&logo=bluesky&logoColor=white" alt="Share on Bluesky" />
</a>
<a href="https://www.linkedin.com/feed/?shareActive=true&text=I%20just%20completed%20the%20%22Getting%20Started%20with%20GitHub%20Copilot%22%20GitHub%20Skills%20hands-on%20exercise!%20%F0%9F%8E%89%0A%0Ahttps%3A%2F%2Fgithub.com%2Fgh-ax-krz-gra-sem%2Fskills-getting-started-with-github-copilot%0A%0A%23GitHubSkills%20%23OpenSource%20%23GitHubLearn" target="_blank" rel="noopener noreferrer">
  <img src="https://img.shields.io/badge/Share%20on%20LinkedIn-0077b5?style=for-the-badge&logo=linkedin&logoColor=white" alt="Share on LinkedIn" />
</a>

### 🎯 What's Next?

**Keep the momentum going!**

[![](https://img.shields.io/badge/Return%20to%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/gh-ax-krz-gra-sem/skills-getting-started-with-github-copilot/issues/1)
[![GitHub Skills](https://img.shields.io/badge/Explore%20GitHub%20Skills-000000?style=for-the-badge&logo=github&logoColor=white)](https://learn.github.com/skills)

*There's no better way to learn than building things!* 🚀

</div>

---

&copy; 2025 GitHub &bull; [Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md) &bull; [MIT License](https://gh.io/mit)

