# Firebase Integration Guide

## Overview
This project has been integrated with Firebase Firestore for dynamic data management. All data is now stored in and retrieved from Firebase instead of static local data.

## Firebase Configuration
- **Project ID**: my-panel-92ba9
- **Database**: Firestore
- **Storage**: Firebase Storage (configured but not actively used)

## Data Collections

### 1. Users Collection
- **Fields**: name, email, role, status, createdAt, updatedAt
- **Roles**: admin, moderator, user
- **Status**: active, inactive

### 2. Products Collection
- **Fields**: name, price, category, description, stock, image, status, createdAt, updatedAt
- **Categories**: لپ‌تاپ, موبایل, تبلت, لوازم جانبی
- **Status**: active, inactive

### 3. Sales Collection
- **Fields**: amount, userId, productId, status, createdAt, updatedAt
- **Status**: completed, pending, cancelled

## API Services

### Generic ApiService Class
Located in `src/services/api.js`, provides CRUD operations for any collection:
- `getAll()` - Get all documents
- `getById(id)` - Get single document
- `create(data)` - Add new document
- `update(id, data)` - Update document
- `delete(id)` - Delete document
- `getWithQuery(constraints)` - Query with Firestore constraints
- `subscribeToChanges(callback)` - Real-time updates

### Specific Services
- `usersService` - User management
- `productsService` - Product management
- `salesService` - Sales tracking
- `dashboardService` - Dashboard statistics and charts

## React Hooks

### useCollection Hook
Generic hook for any collection with loading states and error handling:
```javascript
const { data, loading, error, create, update, remove } = useCollection(service)
```

### Specific Hooks
- `useUsers()` - User data management
- `useProducts()` - Product data management
- `useSales()` - Sales data management
- `useDashboard()` - Dashboard statistics

## Sample Data
The system automatically initializes sample data on first load if no data exists. This includes:
- 4 sample users with different roles
- 4 sample products across different categories
- 4 sample sales records

## Real-time Updates
All data is automatically synchronized with Firebase. Changes made in one browser tab will be reflected in other tabs immediately.

## Error Handling
- Loading states are shown during data fetching
- Error states display user-friendly messages
- Console errors are logged for debugging

## Security Rules
Make sure to configure Firestore security rules in the Firebase Console to protect your data:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // For development only
    }
  }
}
```

**Note**: The above rule allows all read/write access. For production, implement proper authentication and authorization rules.

## Usage Examples

### Adding a new user:
```javascript
const { create } = useUsers()
await create({
  name: 'نام کاربر',
  email: 'email@example.com',
  role: 'user',
  status: 'active'
})
```

### Updating a product:
```javascript
const { update } = useProducts()
await update(productId, {
  name: 'نام جدید محصول',
  price: 1000000,
  stock: 50
})
```

### Getting dashboard statistics:
```javascript
const { stats, salesData, productCategories, loading, error } = useDashboard()
```
