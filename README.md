# Persian Admin Dashboard

یک پنل مدیریت مدرن و کاملاً فارسی با React و Firebase که شامل سیستم احراز هویت، آپلود تصاویر و مدیریت کاربران است.

## ✨ ویژگی‌های اصلی

### 🔐 سیستم احراز هویت
- **ورود و ثبت‌نام** با ایمیل و رمز عبور
- **نقش‌های کاربری** (Admin, Moderator, User)
- **محافظت از مسیرها** بر اساس نقش
- **کاربران نمونه** برای تست سریع

### 📸 آپلود تصاویر
- **آپلود مستقیم** به Firebase Storage
- **Drag & Drop** و Click to Upload
- **Preview تصویر** قبل از آپلود
- **اعتبارسنجی فایل** (نوع و حجم)

### 👥 مدیریت کاربران
- **CRUD کامل** برای کاربران
- **جستجو و فیلتر** کاربران
- **مدیریت نقش‌ها** و وضعیت
- **API یکپارچه** با Firestore

### 📊 داشبورد تحلیلی
- **آمار کلی** سیستم
- **نمودارهای تعاملی** با Recharts
- **دسته‌بندی محصولات**
- **داده‌های Real-time**

## 🚀 شروع سریع

### نصب وابستگی‌ها
```bash
npm install
```

### اجرای پروژه
```bash
npm run dev
```

پنل مدیریت در `http://localhost:5173` در دسترس خواهد بود.

## 🔑 اطلاعات ورود نمونه

برای تست سریع، از این اطلاعات استفاده کنید:

| نقش | ایمیل | رمز عبور |
|-----|-------|----------|
| مدیر | admin@example.com | 123456 |
| ویرایشگر | moderator@example.com | 123456 |
| کاربر | user@example.com | 123456 |

## 🛠️ تکنولوژی‌های استفاده شده

### Frontend
- **React 19.1.1** - آخرین نسخه React
- **React Router 7.8.2** - مسیریابی
- **Tailwind CSS 3.4.17** - طراحی UI
- **Lucide React** - آیکون‌ها
- **Recharts** - نمودارها

### Backend & Database
- **Firebase 12.2.1** - Backend as a Service
- **Firestore** - دیتابیس NoSQL
- **Firebase Storage** - ذخیره‌سازی فایل
- **Firebase Auth** - احراز هویت

## 📁 ساختار پروژه

```
src/
├── components/          # کامپوننت‌های قابل استفاده مجدد
│   ├── ImageUpload.jsx  # آپلود تصاویر
│   └── ProtectedRoute.jsx # محافظت از مسیرها
├── contexts/            # Context API
│   └── AuthContext.jsx  # مدیریت احراز هویت
├── pages/               # صفحات اصلی
│   ├── Login.jsx        # ورود و ثبت‌نام
│   ├── Dashboard.jsx    # داشبورد
│   ├── Users.jsx        # مدیریت کاربران
│   ├── Products.jsx     # مدیریت محصولات
│   └── Settings.jsx     # تنظیمات
├── services/            # سرویس‌های API
│   ├── api.js          # API عمومی
│   └── userApi.js      # API کاربران
├── hooks/               # Custom Hooks
│   └── useFirebase.js  # Hooks Firebase
├── layouts/             # Layout ها
│   └── Layout.jsx      # Layout اصلی
└── docs/               # مستندات
    ├── AUTHENTICATION_GUIDE.md
    ├── IMAGE_UPLOAD_GUIDE.md
    └── API_INTEGRATION_GUIDE.md
```

## 🔧 تنظیمات Firebase

### 1. ایجاد پروژه Firebase
1. به [Firebase Console](https://console.firebase.google.com) بروید
2. پروژه جدید ایجاد کنید
3. Authentication و Firestore را فعال کنید

### 2. تنظیمات Authentication
```
Authentication > Sign-in method > Email/Password > Enable
```

### 3. تنظیمات Firestore
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 4. تنظیمات Storage
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /images/{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 📚 مستندات

- [راهنمای احراز هویت](src/docs/AUTHENTICATION_GUIDE.md)
- [راهنمای آپلود تصاویر](src/docs/IMAGE_UPLOAD_GUIDE.md)
- [راهنمای یکپارچه‌سازی API](src/docs/API_INTEGRATION_GUIDE.md)

## 🚀 Deployment

### Vercel
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Firebase Hosting
```bash
npm run build
firebase deploy --only hosting
```

## 🤝 مشارکت

1. Fork کنید
2. Branch جدید ایجاد کنید (`git checkout -b feature/amazing-feature`)
3. تغییرات را commit کنید (`git commit -m 'Add amazing feature'`)
4. Push کنید (`git push origin feature/amazing-feature`)
5. Pull Request ایجاد کنید

## 📄 لایسنس

این پروژه تحت لایسنس MIT منتشر شده است.

## 📞 پشتیبانی

برای سوالات و پشتیبانی، لطفاً issue ایجاد کنید یا با ما تماس بگیرید.

---

**ساخته شده با ❤️ برای جامعه فارسی‌زبان**
