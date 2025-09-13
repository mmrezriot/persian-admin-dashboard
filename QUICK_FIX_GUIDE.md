# راهنمای سریع حل مشکل Firebase Authentication

## 🚨 خطای فعلی
```
Firebase: Error (auth/configuration-not-found)
```

## ⚡ راه‌حل سریع (5 دقیقه)

### 1. ورود به Firebase Console
- به [console.firebase.google.com](https://console.firebase.google.com) بروید
- پروژه `my-panel-92ba9` را انتخاب کنید

### 2. فعال‌سازی Authentication
1. در منوی سمت چپ، **Authentication** را کلیک کنید
2. **Get Started** را کلیک کنید
3. به تب **Sign-in method** بروید
4. **Email/Password** را پیدا کنید
5. روی آن کلیک کنید و **Enable** کنید
6. **Save** کنید

### 3. فعال‌سازی Firestore
1. **Firestore Database** را کلیک کنید
2. **Create database** را کلیک کنید
3. **Start in test mode** را انتخاب کنید
4. **Next** و سپس **Done** را کلیک کنید

### 4. فعال‌سازی Storage
1. **Storage** را کلیک کنید
2. **Get started** را کلیک کنید
3. **Start in test mode** را انتخاب کنید
4. **Next** و سپس **Done** را کلیک کنید

### 5. تست اتصال
1. پروژه را اجرا کنید: `npm run dev`
2. به `http://localhost:5173` بروید
3. روی **"تست اتصال Firebase"** کلیک کنید
4. وضعیت اتصال را بررسی کنید

## 🔧 اگر مشکل ادامه داشت

### بررسی کانفیگ Firebase
1. در Firebase Console، **Project Settings** (⚙️) را کلیک کنید
2. به تب **General** بروید
3. در بخش **Your apps**، اپلیکیشن وب را پیدا کنید
4. اگر وجود ندارد، **Add app** → **Web** را کلیک کنید
5. کد کانفیگ جدید را کپی کنید
6. در `src/config/firebase.js` جایگزین کنید

### ایجاد کاربران نمونه
1. **Authentication** → **Users** بروید
2. **Add user** را کلیک کنید
3. این کاربران را ایجاد کنید:

| Email | Password | Display Name |
|-------|----------|--------------|
| admin@example.com | 123456 | مدیر سیستم |
| moderator@example.com | 123456 | ویرایشگر |
| user@example.com | 123456 | کاربر عادی |

## ✅ تست نهایی

1. پروژه را اجرا کنید
2. روی دکمه‌های نمونه کلیک کنید
3. باید وارد سیستم شوید
4. اگر خطا داشتید، Console را بررسی کنید

## 📞 پشتیبانی

اگر مشکل ادامه داشت:
1. Screenshot از Firebase Console بگیرید
2. خطاهای Console را کپی کنید
3. با تیم پشتیبانی تماس بگیرید

---

**⏱️ زمان مورد نیاز: 5-10 دقیقه**
