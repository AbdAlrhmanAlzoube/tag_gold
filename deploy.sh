#!/usr/bin/env bash
# نشر سريع على السيرفر
# الاستخدام: ./deploy.sh
set -euo pipefail

COMPOSE="docker compose --env-file .env.prod -f docker-compose.prod.yml"

if [ ! -f .env.prod ]; then
  echo "خطأ: ملف .env.prod غير موجود"
  echo "شغّل: cp .env.prod.example .env.prod ثم عدّل القيم"
  exit 1
fi

if ! grep -q '^APP_KEY=base64:' .env.prod; then
  echo "توليد APP_KEY..."
  # مفتاح مؤقت عبر PHP إن وُجد، وإلا نطلب من المستخدم
  if command -v openssl >/dev/null 2>&1; then
    KEY=$(openssl rand -base64 32)
    sed -i "s|^APP_KEY=.*|APP_KEY=base64:${KEY}|" .env.prod
    echo "تم توليد APP_KEY وكتابته في .env.prod"
  else
    echo "ضع APP_KEY يدوياً في .env.prod ثم أعد المحاولة"
    exit 1
  fi
fi

echo "بناء وتشغيل الحاويات..."
$COMPOSE up -d --build

echo ""
echo "الحالة:"
$COMPOSE ps

echo ""
echo "تم. افتح: ${APP_URL:-http://YOUR_SERVER_IP}"
echo "Admin: ${APP_URL:-http://YOUR_SERVER_IP}/admin"
echo ""
echo "بعد أول تشغيل ناجح: غيّر RUN_SEEDERS=false في .env.prod"
