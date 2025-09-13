# راهنمای یکپارچه‌سازی API

## User API Service

### ویژگی‌های API
- **CRUD Operations**: ایجاد، خواندن، به‌روزرسانی و حذف کاربران
- **جستجو و فیلتر**: جستجو بر اساس نام و ایمیل
- **مدیریت نقش‌ها**: فیلتر بر اساس نقش کاربری
- **آمار کاربران**: دریافت آمار کلی کاربران

### متدهای API

#### 1. دریافت همه کاربران
```javascript
const users = await userApi.getAllUsers();
```

#### 2. دریافت کاربر بر اساس ID
```javascript
const user = await userApi.getUserById('userId');
```

#### 3. دریافت کاربر بر اساس ایمیل
```javascript
const user = await userApi.getUserByEmail('user@example.com');
```

#### 4. ایجاد کاربر جدید
```javascript
const newUser = await userApi.createUser({
  name: 'نام کاربر',
  email: 'user@example.com',
  role: 'user',
  status: 'active'
});
```

#### 5. به‌روزرسانی کاربر
```javascript
const updatedUser = await userApi.updateUser('userId', {
  name: 'نام جدید',
  role: 'admin'
});
```

#### 6. حذف کاربر
```javascript
await userApi.deleteUser('userId');
```

#### 7. جستجوی کاربران
```javascript
const searchResults = await userApi.searchUsers('جستجو');
```

#### 8. دریافت آمار کاربران
```javascript
const stats = await userApi.getUserStats();
// Returns: { total, active, inactive, byRole: { admin, moderator, user } }
```

## Demo Users

### کاربران نمونه
سیستم به صورت خودکار سه کاربر نمونه ایجاد می‌کند:

1. **مدیر سیستم**
   - ایمیل: `admin@example.com`
   - رمز عبور: `123456`
   - نقش: `admin`

2. **ویرایشگر محتوا**
   - ایمیل: `moderator@example.com`
   - رمز عبور: `123456`
   - نقش: `moderator`

3. **کاربر عادی**
   - ایمیل: `user@example.com`
   - رمز عبور: `123456`
   - نقش: `user`

### نحوه استفاده از Demo Users
```javascript
// در صفحه Login، روی دکمه‌های نمونه کلیک کنید
// یا مستقیماً از API استفاده کنید:

const demoUsers = await userApi.getAllUsers();
console.log(demoUsers);
```

## Authentication Integration

### ورود با API
```javascript
// 1. ورود با Firebase Auth
const result = await signInWithEmailAndPassword(auth, email, password);

// 2. دریافت پروفایل از API
const userProfile = await userApi.getUserByEmail(email);
```

### ثبت‌نام با API
```javascript
// 1. ایجاد کاربر در Firebase Auth
const result = await createUserWithEmailAndPassword(auth, email, password);

// 2. ایجاد پروفایل در API
const userProfile = await userApi.createUser({
  name: userData.name,
  email: email,
  role: userData.role,
  status: 'active'
});
```

## Error Handling

### مدیریت خطاها
```javascript
try {
  const user = await userApi.getUserById('userId');
} catch (error) {
  console.error('API Error:', error.message);
  // نمایش پیام خطا به کاربر
}
```

### خطاهای رایج
- **کاربر یافت نشد**: `کاربری با این ایمیل قبلاً وجود دارد`
- **دسترسی غیرمجاز**: `شما دسترسی لازم را ندارید`
- **خطای شبکه**: `خطا در اتصال به سرور`

## Security Rules

### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null;
      allow create: if request.auth != null && 
        request.resource.data.email == request.auth.token.email;
    }
  }
}
```

### Storage Rules
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

## Performance Optimization

### Caching
```javascript
// Cache users in component state
const [users, setUsers] = useState([]);

// Load users once
useEffect(() => {
  loadUsers();
}, []);
```

### Pagination
```javascript
// برای کاربران زیاد، از pagination استفاده کنید
const getUsersPage = async (page, limit) => {
  const q = query(
    collection(db, 'users'),
    orderBy('createdAt', 'desc'),
    limit(limit),
    startAfter(lastDoc)
  );
  return getDocs(q);
};
```

## Testing

### تست API
```javascript
// تست ایجاد کاربر
const testUser = await userApi.createUser({
  name: 'تست کاربر',
  email: 'test@example.com',
  role: 'user',
  status: 'active'
});

// تست جستجو
const searchResults = await userApi.searchUsers('تست');

// تست حذف
await userApi.deleteUser(testUser.id);
```

## Best Practices

1. **همیشه Error Handling استفاده کنید**
2. **Loading states نمایش دهید**
3. **داده‌ها را Cache کنید**
4. **Security Rules را تنظیم کنید**
5. **Validation انجام دهید**
6. **Logging اضافه کنید**

## مثال کامل

### Component با API
```javascript
import { useState, useEffect } from 'react';
import { userApi } from '../services/userApi';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const usersData = await userApi.getAllUsers();
      setUsers(usersData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateUser = async (userData) => {
    try {
      const newUser = await userApi.createUser(userData);
      setUsers(prev => [...prev, newUser]);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {loading && <div>در حال بارگذاری...</div>}
      {error && <div>خطا: {error}</div>}
      {/* Render users */}
    </div>
  );
};
```
