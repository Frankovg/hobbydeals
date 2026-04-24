#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
ENV_FILE="$REPO_ROOT/.env"

if [ ! -f "$ENV_FILE" ]; then
  echo "Error: $ENV_FILE not found" >&2
  exit 1
fi

set -a
# shellcheck source=/dev/null
source "$ENV_FILE"
set +a

if [ -z "${CHROMATIC_PROJECT_TOKEN:-}" ]; then
  echo "Error: CHROMATIC_PROJECT_TOKEN is not set in $ENV_FILE" >&2
  exit 1
fi

exec pnpm exec chromatic --exit-zero-on-changes "$@"
