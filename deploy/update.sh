#!/usr/bin/env bash
# تحديث سريع بعد كل git push — بدون Docker
# الاستخدام (كـ root من أي مكان):
#   bash /var/www/html/tag_gold/deploy/update.sh
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/html/tag_gold}"
DOMAIN="${DOMAIN:-taj-jeweiry.abdulrahem-alzoubi.cloud}"
NGINX_CONF="${NGINX_CONF:-/etc/nginx/conf.d/taj-jewelry.conf}"
SKIP_PULL="${SKIP_PULL:-0}"
SKIP_NGINX="${SKIP_NGINX:-0}"
SKIP_BACKEND="${SKIP_BACKEND:-0}"

if [[ "$(id -u)" -ne 0 ]]; then
  echo "شغّل السكربت كـ root"
  exit 1
fi

cd "$APP_DIR"

if [[ "$SKIP_PULL" != "1" ]]; then
  echo "==> git pull"
  git pull origin main
fi

if [[ "$SKIP_BACKEND" != "1" ]]; then
  echo "==> Backend (composer + migrate + cache)"
  cd backend
  composer install --no-dev --optimize-autoloader --no-interaction
  php artisan migrate --force --no-interaction
  php artisan config:cache
  php artisan route:cache
  php artisan view:cache 2>/dev/null || true
  chown -R nginx:nginx storage bootstrap/cache 2>/dev/null || true
  chmod -R 775 storage bootstrap/cache 2>/dev/null || true
  cd ..
fi

if [[ "$SKIP_NGINX" != "1" ]]; then
  echo "==> Nginx config"
  if [[ -f "$NGINX_CONF" ]]; then
    cp "$NGINX_CONF" "${NGINX_CONF}.bak.$(date +%Y%m%d%H%M%S)"
  fi
  cp "$APP_DIR/deploy/nginx-tag-gold.conf" "$NGINX_CONF"
  nginx -t
  systemctl reload nginx
  echo "Nginx: OK"
fi

echo "==> Frontend build"
cd frontend
if [[ -f package-lock.json ]]; then
  npm ci
else
  npm install
fi
VITE_API_URL=/api VITE_APP_URL="https://${DOMAIN}" npm run build
cd ..

echo "==> API smoke test"
HTTP_CODE=$(curl -s -o /tmp/tag_gold_api_test.json -w "%{http_code}" \
  "https://${DOMAIN}/api/certificates/SG100001" || true)
echo "HTTP ${HTTP_CODE}"
head -c 300 /tmp/tag_gold_api_test.json 2>/dev/null || true
echo ""

echo ""
echo "تم التحديث."
echo "الموقع: https://${DOMAIN}"
echo "Admin:  https://${DOMAIN}/admin"
echo "Ctrl+F5 في المتصفح بعد التحديث"
