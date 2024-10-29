#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Install backend dependencies
pip install -r backend/requirements.txt

# Navigate to the frontend and build it
cd server
npm install
npm run build
cd ..

# Start the FastAPI backend
uvicorn backend.app:app --host 0.0.0.0 --port $PORT
