# راهنمای راه‌اندازی Firebase

## مشکل: auth/configuration-not-found

این خطا زمانی رخ می‌دهد که Firebase Authentication به درستی پیکربندی نشده باشد.

## راه‌حل مرحله به مرحله

### 1. بررسی Firebase Console

#### الف) ورود به Firebase Console
1. به [Firebase Console](https://console.firebase.google.com) بروید
2. پروژه `my-panel-92ba9` را انتخاب کنید

#### ب) فعال‌سازی Authentication
1. در منوی سمت چپ، روی **Authentication** کلیک کنید
2. روی **Get Started** کلیک کنید
3. به تب **Sign-in method** بروید
4. **Email/Password** را پیدا کنید
5. روی آن کلیک کنید و **Enable** کنید
6. **Save** کنید

### 2. بررسی تنظیمات پروژه

#### الف) Project Settings
1. روی آیکون تنظیمات (⚙️) کلیک کنید
2. **Project settings** را انتخاب کنید
3. به تب **General** بروید
4. مطمئن شوید که **Project ID** درست است: `my-panel-92ba9`

#### ب) Web App Configuration
1. در همان صفحه، به بخش **Your apps** بروید
2. اگر اپلیکیشن وب وجود ندارد، روی **Add app** کلیک کنید
3. **Web** (</>) را انتخاب کنید
4. نام اپلیکیشن را وارد کنید: `persian-admin-dashboard`
5. **Register app** را کلیک کنید
6. کد کانفیگ را کپی کنید

### 3. به‌روزرسانی Firebase Config

اگر کانفیگ جدید دریافت کردید، آن را در `src/config/firebase.js` جایگزین کنید:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_NEW_API_KEY",
  authDomain: "my-panel-92ba9.firebaseapp.com",
  projectId: "my-panel-92ba9",
  storageBucket: "my-panel-92ba9.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 4. تنظیمات Firestore

#### الف) ایجاد دیتابیس
1. در Firebase Console، **Firestore Database** را انتخاب کنید
2. **Create database** را کلیک کنید
3. **Start in test mode** را انتخاب کنید
4. **Next** و سپس **Done** را کلیک کنید

#### ب) تنظیم Security Rules
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

### 5. تنظیمات Storage

#### الف) فعال‌سازی Storage
1. در Firebase Console، **Storage** را انتخاب کنید
2. **Get started** را کلیک کنید
3. **Start in test mode** را انتخاب کنید
4. **Next** و سپس **Done** را کلیک کنید

#### ب) تنظیم Security Rules
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

### 6. تست اتصال

#### الف) اجرای پروژه
```bash
npm run dev
```

#### ب) بررسی Console
1. Developer Tools را باز کنید (F12)
2. به تب **Console** بروید
3. خطاهای Firebase را بررسی کنید

### 7. ایجاد کاربران نمونه

#### الف) از طریق Firebase Console
1. **Authentication** > **Users** بروید
2. **Add user** را کلیک کنید
3. کاربران زیر را ایجاد کنید:

| Email | Password | Display Name |
|-------|----------|--------------|
| admin@example.com | 123456 | مدیر سیستم |
| moderator@example.com | 123456 | ویرایشگر |
| user@example.com | 123456 | کاربر عادی |

#### ب) از طریق کد
کاربران نمونه به صورت خودکار ایجاد می‌شوند.

### 8. عیب‌یابی

#### خطاهای رایج:

**1. auth/configuration-not-found**
- Authentication فعال نشده
- کانفیگ Firebase اشتباه است

**2. auth/invalid-api-key**
- API Key اشتباه است
- پروژه Firebase اشتباه است

**3. auth/network-request-failed**
- مشکل اتصال اینترنت
- فایروال مسدود کرده

**4. auth/too-many-requests**
- درخواست‌های زیاد
- کمی صبر کنید

### 9. بررسی نهایی

#### الف) تست ورود
1. به `http://localhost:5173` بروید
2. روی دکمه‌های نمونه کلیک کنید
3. باید وارد سیستم شوید

#### ب) تست ثبت‌نام
1. روی "ثبت‌نام" کلیک کنید
2. اطلاعات جدید وارد کنید
3. کاربر باید ایجاد شود

### 10. نکات مهم

1. **همیشه Authentication را فعال کنید**
2. **Security Rules را تنظیم کنید**
3. **API Key را محرمانه نگه دارید**
4. **در Production از Environment Variables استفاده کنید**

## کد تست اتصال

```javascript
// در console مرورگر اجرا کنید
import { auth } from './src/config/firebase.js';
console.log('Auth instance:', auth);
console.log('Auth app:', auth.app);
```

## پشتیبانی

اگر مشکل ادامه داشت:
1. Screenshot از Firebase Console بگیرید
2. خطاهای Console را کپی کنید
3. با تیم پشتیبانی تماس بگیرید
