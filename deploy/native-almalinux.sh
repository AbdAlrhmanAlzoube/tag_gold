#!/usr/bin/env bash
# نشر Tag Gold على AlmaLinux (Nginx + PHP-FPM + MariaDB) — بدون Docker
# شغّل كـ root من داخل مجلد المشروع بعد git clone
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/html/tag_gold}"
DOMAIN="${DOMAIN:-}"

if [[ "$(id -u)" -ne 0 ]]; then
  echo "شغّل السكربت كـ root"
  exit 1
fi

if [[ -z "$DOMAIN" ]]; then
  echo "مثال: DOMAIN=certificates.example.com bash deploy/native-almalinux.sh"
  exit 1
fi

cd "$APP_DIR"

echo "==> Backend dependencies"
cd backend
if [[ ! -f .env ]]; then
  cp .env.example .env
  echo "عدّل backend/.env (DB + APP_URL) ثم أعد تشغيل السكربت"
  exit 1
fi
composer install --no-dev --optimize-autoloader --no-interaction
php artisan key:generate --force --no-interaction 2>/dev/null || true
php artisan migrate --force
php artisan db:seed --force
php artisan config:cache
php artisan route:cache
php artisan storage:link 2>/dev/null || true
chown -R nginx:nginx storage bootstrap/cache
chmod -R 775 storage bootstrap/cache
cd ..

echo "==> Frontend build"
cd frontend
npm ci
VITE_API_URL=/api VITE_APP_URL="https://${DOMAIN}" npm run build
cd ..

echo "==> Nginx vhost"
CONF="/etc/nginx/conf.d/tag-gold.conf"
sed "s/YOUR_DOMAIN.com/${DOMAIN}/g" deploy/nginx-tag-gold.conf > "$CONF"
# إن كان socket مختلفاً على السيرفر، صحّحه يدوياً بعد التحقق من:
# ls /run/php-fpm/  أو  grep listen /etc/php-fpm.d/*.conf

nginx -t
systemctl reload nginx

echo "تم. افتح: http://${DOMAIN}"
echo "Admin: http://${DOMAIN}/admin"
