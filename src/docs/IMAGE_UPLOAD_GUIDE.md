# راهنمای آپلود تصاویر

## ویژگی‌های Image Upload

### 1. آپلود مستقیم به Firebase Storage
- **Drag & Drop**: کشیدن و رها کردن فایل
- **Click to Upload**: کلیک برای انتخاب فایل
- **Preview**: پیش‌نمایش تصویر قبل از آپلود
- **Progress Indicator**: نمایش وضعیت آپلود

### 2. اعتبارسنجی فایل
- **نوع فایل**: فقط تصاویر (PNG, JPG, GIF, WebP)
- **حجم فایل**: حداکثر ۵ مگابایت (قابل تنظیم)
- **ابعاد**: نسبت تصویر قابل تنظیم

### 3. مدیریت تصاویر
- **حذف تصویر**: حذف تصویر آپلود شده
- **جایگزینی**: آپلود تصویر جدید
- **URL تولیدی**: لینک مستقیم به تصویر

## نحوه استفاده

### کامپوننت ImageUpload
```javascript
import ImageUpload from '../components/ImageUpload';

<ImageUpload
  onImageUpload={(imageUrl) => setImage(imageUrl)}
  currentImage={currentImage}
  className="mb-4"
  aspectRatio="aspect-square"
  maxSize={5 * 1024 * 1024} // 5MB
/>
```

### Props
- `onImageUpload`: تابع callback برای دریافت URL تصویر
- `currentImage`: تصویر فعلی (برای ویرایش)
- `className`: کلاس‌های CSS اضافی
- `aspectRatio`: نسبت تصویر (aspect-square, aspect-video, etc.)
- `maxSize`: حداکثر حجم فایل (پیش‌فرض: 5MB)

## تنظیمات Firebase Storage

### Security Rules
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

### تنظیمات CORS
```javascript
[
  {
    "origin": ["http://localhost:5173", "https://yourdomain.com"],
    "method": ["GET", "POST", "PUT", "DELETE"],
    "maxAgeSeconds": 3600
  }
]
```

## مدیریت خطا

### خطاهای رایج
- **نوع فایل نامعتبر**: فقط تصاویر مجاز
- **حجم فایل زیاد**: بیش از حد مجاز
- **خطای آپلود**: مشکل در اتصال یا مجوزها

### نمایش خطا
```javascript
{error && (
  <p className="text-sm text-red-600">{error}</p>
)}
```

## بهینه‌سازی

### فشرده‌سازی تصاویر
```javascript
// قبل از آپلود
const compressImage = (file) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = 800; // عرض ثابت
      canvas.height = (img.height * 800) / img.width;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob(resolve, 'image/jpeg', 0.8);
    };
    
    img.src = URL.createObjectURL(file);
  });
};
```

### Lazy Loading
```javascript
<img
  src={imageUrl}
  alt="Product"
  loading="lazy"
  className="w-full h-full object-cover"
/>
```

## مثال کامل

### استفاده در فرم محصول
```javascript
const [formData, setFormData] = useState({
  name: '',
  price: '',
  image: '',
  // ...
});

const handleImageUpload = (imageUrl) => {
  setFormData(prev => ({
    ...prev,
    image: imageUrl
  }));
};

return (
  <form>
    <ImageUpload
      onImageUpload={handleImageUpload}
      currentImage={formData.image}
      aspectRatio="aspect-square"
    />
  </form>
);
```

## نکات مهم

1. **امنیت**: همیشه Security Rules را تنظیم کنید
2. **بهینه‌سازی**: تصاویر را فشرده کنید
3. **UX**: Loading state و Error handling اضافه کنید
4. **Backup**: تصاویر مهم را در جای دیگری هم ذخیره کنید
