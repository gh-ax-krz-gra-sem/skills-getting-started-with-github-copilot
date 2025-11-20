#!/bin/bash

# Start script for Mergington High School Activities Management System

echo "========================================"
echo "Mergington High School Activities"
echo "========================================"
echo ""
echo "Starting backend server..."
echo ""

# Start the backend in the background
cd src
uvicorn app:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

echo "Backend server starting on http://localhost:8000"
echo "Backend PID: $BACKEND_PID"
echo ""
echo "Waiting for backend to start..."
sleep 3

echo ""
echo "========================================"
echo "To start the frontend, open a new terminal and run:"
echo "  cd frontend"
echo "  npm run dev"
echo "========================================"
echo ""
echo "Press Ctrl+C to stop the backend server"

# Wait for the backend process
wait $BACKEND_PID
