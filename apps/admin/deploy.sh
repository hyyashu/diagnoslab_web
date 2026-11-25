#!/usr/bin/env bash
# Deploys the staff dashboard to app.diagnoslab.in (Hostinger, public_html/app).
# Uses the same SSH login as the website: DEPLOY_SSH_PASSWORD and
# DEPLOY_DOMAIN from apps/website/.env (gitignored). Run: pnpm deploy:admin
set -e
HOST="217.21.85.64"; PORT="65002"; USER="u343497435"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"
if [[ -f ../website/.env ]]; then set -a; source ../website/.env; set +a; fi
: "${DEPLOY_DOMAIN:?Set DEPLOY_DOMAIN in apps/website/.env}"
[[ -f dist/index.html ]] || { echo "dist/ not found. Run pnpm build:admin first." >&2; exit 1; }

REMOTE="${USER}@${HOST}"
APP="domains/${DEPLOY_DOMAIN}/public_html/app"
BACKUPS="domains/${DEPLOY_DOMAIN}/app_backups"
TS=$(date +%Y-%m-%d_%H-%M-%S)
ZIP="admin_${TS}.zip"

run() { if [[ -n "${DEPLOY_SSH_PASSWORD:-}" ]] && command -v sshpass >/dev/null; then sshpass -p "$DEPLOY_SSH_PASSWORD" "$@"; else "$@"; fi; }

(cd dist && zip -qr "../$ZIP" . -x '.*' && zip -q "../$ZIP" .htaccess)
echo "Backing up the current app/ and uploading..."
run ssh -o StrictHostKeyChecking=accept-new -p "$PORT" "$REMOTE" "mkdir -p ~/$APP ~/$BACKUPS && cd ~/$APP && (ls -A | grep -q . && zip -qr ~/$BACKUPS/app_backup_${TS}.zip . || true)"
run scp -o StrictHostKeyChecking=accept-new -P "$PORT" "$ZIP" "$REMOTE:~/$BACKUPS/"
run ssh -o StrictHostKeyChecking=accept-new -p "$PORT" "$REMOTE" "find ~/$APP -mindepth 1 -maxdepth 1 -exec rm -rf {} + && cd ~/$APP && unzip -qo ~/$BACKUPS/$ZIP"
rm -f "$ZIP"
echo "Done. app.diagnoslab.in updated. Backup: $BACKUPS/app_backup_${TS}.zip"
