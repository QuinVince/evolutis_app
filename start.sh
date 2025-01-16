#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Install backend dependencies
pip install -r backend/requirements.txt

# Navigate to the frontend and build it
cd server
npm install
NODE_OPTIONS=--max_old_space_size=512 npm run build --production
cd ..

# Start the FastAPI backend
uvicorn backend.app:app --host 0.0.0.0 --port $PORT
