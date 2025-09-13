# راهنمای سیستم احراز هویت

## ویژگی‌های Authentication

### 1. ورود و ثبت‌نام
- **صفحه ورود**: ورود با ایمیل و رمز عبور
- **صفحه ثبت‌نام**: ایجاد حساب کاربری جدید با نقش‌های مختلف
- **اعتبارسنجی**: بررسی ایمیل، رمز عبور و تأیید رمز عبور

### 2. نقش‌های کاربری
- **Admin**: دسترسی کامل به همه بخش‌ها
- **Moderator**: دسترسی به ویرایش محتوا
- **User**: دسترسی محدود به داشبورد و محصولات

### 3. محافظت از مسیرها
- **ProtectedRoute**: محافظت از صفحات حساس
- **Role-based Access**: کنترل دسترسی بر اساس نقش
- **Redirect**: هدایت خودکار به صفحه ورود

## نحوه استفاده

### AuthContext
```javascript
import { useAuth } from '../contexts/AuthContext';

const { 
  currentUser, 
  userProfile, 
  signin, 
  signup, 
  logout, 
  updateUserProfile 
} = useAuth();
```

### ProtectedRoute
```javascript
<ProtectedRoute requiredRole="admin">
  <AdminComponent />
</ProtectedRoute>
```

### مدیریت وضعیت کاربر
```javascript
// بررسی ورود کاربر
if (currentUser) {
  // کاربر وارد شده
}

// دریافت اطلاعات پروفایل
const userName = userProfile?.name;
const userRole = userProfile?.role;
```

## امنیت

### Firebase Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### اعتبارسنجی سمت کلاینت
- بررسی طول رمز عبور (حداقل ۶ کاراکتر)
- تأیید رمز عبور
- اعتبارسنجی ایمیل
- مدیریت خطاهای Firebase Auth

## خطاهای رایج

### خطاهای ورود
- `auth/user-not-found`: کاربر یافت نشد
- `auth/wrong-password`: رمز عبور اشتباه
- `auth/invalid-email`: ایمیل نامعتبر

### خطاهای ثبت‌نام
- `auth/email-already-in-use`: ایمیل قبلاً استفاده شده
- `auth/weak-password`: رمز عبور ضعیف
- `auth/invalid-email`: ایمیل نامعتبر

## تنظیمات Firebase

### فعال‌سازی Authentication
1. به Firebase Console بروید
2. Authentication > Sign-in method
3. Email/Password را فعال کنید

### تنظیمات امنیتی
1. Authentication > Settings
2. Authorized domains را تنظیم کنید
3. Password policy را پیکربندی کنید
