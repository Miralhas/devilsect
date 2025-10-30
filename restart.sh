#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

echo "Restarting services..."

# Stop all services
docker compose down --remove-orphans
docker system prune --force
docker system prune --volumes --force

# Check if .env file exists
if [ ! -f .env.docker ]; then
  echo "Error: .env.docker file not found."
  exit 1
fi

echo "Starting Docker containers..."

docker compose -f compose.yaml up -d --build --force-recreate

echo "Script completed."