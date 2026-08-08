# Gold Certificate Verification System

نظام احترافي للتحقق من أصالة سبائك الذهب عبر QR Code ورقم الشهادة — مشابه لـ [sabsabigold.com](https://sabsabigold.com).

## الميزات

- **صفحة التحقق**: إدخال رقم الشهادة يدوياً أو عبر QR
- **شهادة رقمية**: عرض تفاصيل السبيكة (الوزن، العيار، النقاء، تاريخ الإصدار)
- **QR Code**: كل شهادة لها رمز QR فريد يوجّه للتحقق
- **واجهة عربية RTL**: تصميم احترافي يشبه المواقع المرجعية
- **Docker**: تشغيل كامل بأمر واحد

## البنية التقنية

| الطبقة | التقنية |
|--------|---------|
| Backend API | Laravel 13 |
| Frontend | React 19 + TypeScript + Vite + Tailwind CSS |
| Database | MySQL 8 |
| Container | Docker Compose |

## التشغيل السريع (Docker)

```bash
docker compose up --build
```

| الخدمة | الرابط |
|--------|--------|
| Frontend (واجهة التحقق) | http://localhost:5173 |
| Backend API | http://localhost:8080/api |
| MySQL | localhost:3307 |

### أرقام تجريبية

| رقم الشهادة | الوصف |
|-------------|-------|
| `SG100001` | أونصة 31.1g — 24K |
| `A01748` | أونصة 31.1g — 24K |
| `TJ2026001` | أونصة 31.1g — 999 نقاء |
| `TJ2026002` | نصف أونصة 15.55g |

## Flow التحقق

```
QR على السبيكة → https://yoursite.com/cert/SG100001
                              ↓
                    عرض الشهادة الرقمية
                              ↓
              QR على الشهادة → نفس الرابط (تحقق مستمر)
```

أو:

```
https://yoursite.com/ → إدخال رقم الشهادة → عرض الشهادة
```

## Admin Panel

| الرابط | http://localhost:5173/admin |
|--------|------------------------------|
| Email | `admin@tajjewelry.com` |
| Password | `admin123` |

### Admin API

```
POST   /api/admin/login
POST   /api/admin/logout          (auth)
GET    /api/admin/me              (auth)
GET    /api/admin/stats           (auth)
GET    /api/admin/certificates    (auth)
POST   /api/admin/certificates    (auth)  — إضافة سبيكة
GET    /api/admin/certificates/{id}
PUT    /api/admin/certificates/{id}
DELETE /api/admin/certificates/{id}
```

### مثال إضافة سبيكة

```bash
# 1. Login
curl -X POST http://localhost:8080/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@tajjewelry.com","password":"admin123"}'

# 2. Create certificate
curl -X POST http://localhost:8080/api/admin/certificates \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "serial_number": "TJ2027001",
    "item_name": "اونسة 31.1",
    "karat": 24,
    "purity": 999,
    "weight": 31.1035
  }'
```


### مثال Response

```json
{
  "success": true,
  "data": {
    "serial_number": "SG100001",
    "item_name": "اونسة 31.1",
    "metal": "Gold",
    "metal_ar": "ذهب",
    "karat": 24,
    "purity": 995,
    "weight": 31.1035,
    "issued_at_formatted": "2026-07-02 11:53:07",
    "is_verified": true,
    "brand": "TAJ JEWELRY"
  }
}
```

## التخصيص (Brand)

عدّل في `docker-compose.yml`:

```yaml
APP_BRAND_NAME: "TAJ JEWELRY"
APP_BRAND_NAME_AR: "تاج للمجوهرات"
VITE_BRAND_NAME: "TAJ JEWELRY"
VITE_BRAND_NAME_AR: "تاج للمجوهرات"
```

## التطوير المحلي (بدون Docker)

### Backend

```bash
cd backend
cp .env.example .env
# عدّل DB إلى sqlite أو mysql
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve --port=8080
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## إضافة شهادات جديدة

```bash
docker compose exec backend php artisan tinker
```

```php
App\Models\Certificate::create([
    'serial_number' => 'TJ2026003',
    'item_name' => 'اونسة 31.1',
    'metal' => 'Gold',
    'metal_ar' => 'ذهب',
    'type' => 'Bar',
    'type_ar' => 'سبيكة',
    'karat' => 24,
    'purity' => 999,
    'weight' => 31.1035,
    'weight_unit' => 'g',
    'issued_at' => now(),
]);
```

## QR Code للسبائك

اطبع QR يوجّه إلى:

```
https://yourdomain.com/cert/{SERIAL_NUMBER}
```

مثال: `https://yourdomain.com/cert/SG100001`

## هيكل المشروع

```
gold/
├── backend/          # Laravel API
├── frontend/         # React SPA
├── docker/           # Nginx config
├── docker-compose.yml
└── README.md
```

## النشر على السيرفر (Production)

```bash
cp .env.prod.example .env.prod
# عدّل APP_URL وكلمات مرور DB و APP_KEY

docker compose --env-file .env.prod -f docker-compose.prod.yml up -d --build
# أو: bash deploy.sh
```

| الخدمة | المنفذ |
|--------|--------|
| الموقع بالكامل (Frontend + API) | المنفذ 80 |
| MySQL | داخلي فقط (غير مكشوف) |

راجع الدليل التفصيلي في المحادثة أو نفّذ على VPS:

1. تثبيت Docker
2. رفع المشروع (git clone أو scp)
3. إعداد `.env.prod`
4. `docker compose --env-file .env.prod -f docker-compose.prod.yml up -d --build`
5. ربط الدومين + SSL (Certbot)

## الخطوات القادمة

- [ ] رفع شعار العميل (Logo upload)
- [ ] تصدير PDF للشهادة
- [ ] توليد QR codes بالجملة
