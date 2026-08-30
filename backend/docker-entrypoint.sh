#!/bin/sh
set -e

cd /var/www/html

if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        cp .env.example .env
    fi
fi

# Prefer APP_KEY from environment (production); generate only if missing
if [ -z "$APP_KEY" ]; then
    php artisan key:generate --force --no-interaction 2>/dev/null || true
fi

echo "Waiting for database connection..."
for i in $(seq 1 30); do
    if php -r "
        try {
            new PDO(
                'mysql:host=' . getenv('DB_HOST') . ';port=' . (getenv('DB_PORT') ?: '3306') . ';dbname=' . getenv('DB_DATABASE'),
                getenv('DB_USERNAME'),
                getenv('DB_PASSWORD'),
                [PDO::ATTR_TIMEOUT => 3]
            );
            exit(0);
        } catch (Throwable \$e) {
            exit(1);
        }
    " 2>/dev/null; then
        echo "Database connection established."
        break
    fi
    echo "Database not ready, retrying... ($i/30)"
    sleep 2
done

php artisan migrate --force --no-interaction

if [ "${RUN_SEEDERS}" = "true" ]; then
    echo "Running database seeders..."
    php artisan db:seed --force --no-interaction
fi

if [ "${APP_ENV}" = "local" ] || [ "${APP_DEBUG}" = "true" ]; then
    php artisan config:clear
    php artisan route:clear
    php artisan view:clear 2>/dev/null || true
else
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache 2>/dev/null || true
fi
php artisan storage:link 2>/dev/null || true

exec "$@"
