#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

echo "[deploy] git pull"
git pull

echo "[deploy] build app (no cache)"
docker compose build --no-cache app

echo "[deploy] restart services"
docker compose up -d --force-recreate app nginx media cam1_recorder cam2_recorder cam3_recorder cam4_recorder
