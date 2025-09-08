import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  limit,
  where,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Generic CRUD operations
export class ApiService {
  constructor(collectionName) {
    this.collectionName = collectionName;
    this.collectionRef = collection(db, collectionName);
  }

  // Get all documents
  async getAll() {
    try {
      const snapshot = await getDocs(this.collectionRef);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error(`Error getting ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Get single document
  async getById(id) {
    try {
      const docRef = doc(this.collectionRef, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error(`Document with id ${id} not found`);
      }
    } catch (error) {
      console.error(`Error getting ${this.collectionName} by id:`, error);
      throw error;
    }
  }

  // Add new document
  async create(data) {
    try {
      const docRef = await addDoc(this.collectionRef, {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return { id: docRef.id, ...data };
    } catch (error) {
      console.error(`Error creating ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Update document
  async update(id, data) {
    try {
      const docRef = doc(this.collectionRef, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date()
      });
      return { id, ...data };
    } catch (error) {
      console.error(`Error updating ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Delete document
  async delete(id) {
    try {
      const docRef = doc(this.collectionRef, id);
      await deleteDoc(docRef);
      return { id };
    } catch (error) {
      console.error(`Error deleting ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Get documents with query
  async getWithQuery(queryConstraints) {
    try {
      const q = query(this.collectionRef, ...queryConstraints);
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error(`Error querying ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Real-time listener
  subscribeToChanges(callback) {
    return onSnapshot(this.collectionRef, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(data);
    });
  }
}

// Specific services for different data types
export const usersService = new ApiService('users');
export const productsService = new ApiService('products');
export const salesService = new ApiService('sales');
export const categoriesService = new ApiService('categories');

// Dashboard specific functions
export const dashboardService = {
  // Get dashboard statistics
  async getStats() {
    try {
      const [users, products, sales] = await Promise.all([
        usersService.getAll(),
        productsService.getAll(),
        salesService.getAll()
      ]);

      const totalSales = sales.reduce((sum, sale) => sum + (sale.amount || 0), 0);
      const activeProducts = products.filter(product => product.status === 'active').length;
      const totalUsers = users.length;

      return {
        totalUsers,
        totalSales,
        activeProducts,
        totalOrders: sales.length
      };
    } catch (error) {
      console.error('Error getting dashboard stats:', error);
      throw error;
    }
  },

  // Get sales data for charts
  async getSalesData() {
    try {
      const sales = await salesService.getWithQuery([
        orderBy('createdAt', 'desc'),
        limit(12)
      ]);

      // Group by month
      const monthlyData = {};
      sales.forEach(sale => {
        const date = new Date(sale.createdAt.seconds * 1000);
        const month = date.toLocaleDateString('fa-IR', { month: 'long' });
        
        if (!monthlyData[month]) {
          monthlyData[month] = { sales: 0, users: 0 };
        }
        monthlyData[month].sales += sale.amount || 0;
        monthlyData[month].users += 1;
      });

      return Object.entries(monthlyData).map(([month, data]) => ({
        month,
        sales: data.sales,
        users: data.users
      }));
    } catch (error) {
      console.error('Error getting sales data:', error);
      throw error;
    }
  },

  // Get product categories data
  async getProductCategories() {
    try {
      const products = await productsService.getAll();
      const categories = {};

      products.forEach(product => {
        const category = product.category || 'سایر';
        if (!categories[category]) {
          categories[category] = 0;
        }
        categories[category] += 1;
      });

      const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
      let colorIndex = 0;

      return Object.entries(categories).map(([name, value]) => ({
        name,
        value,
        color: colors[colorIndex++ % colors.length]
      }));
    } catch (error) {
      console.error('Error getting product categories:', error);
      throw error;
    }
  }
};

// Sample data initialization
export const initializeSampleData = async () => {
  try {
    // Check if data already exists
    const existingUsers = await usersService.getAll();
    if (existingUsers.length > 0) return;

    // Sample users
    const sampleUsers = [
      { name: 'احمد محمدی', email: 'ahmad@example.com', role: 'admin', status: 'active' },
      { name: 'فاطمه احمدی', email: 'fateme@example.com', role: 'user', status: 'active' },
      { name: 'علی رضایی', email: 'ali@example.com', role: 'user', status: 'inactive' },
      { name: 'زهرا کریمی', email: 'zahra@example.com', role: 'moderator', status: 'active' }
    ];

    // Sample products
    const sampleProducts = [
      { name: 'لپ‌تاپ ایسوس', price: 15000000, category: 'لپ‌تاپ', status: 'active', stock: 10 },
      { name: 'موبایل سامسونگ', price: 8000000, category: 'موبایل', status: 'active', stock: 25 },
      { name: 'تبلت اپل', price: 12000000, category: 'تبلت', status: 'active', stock: 5 },
      { name: 'هدفون بلوتوث', price: 2000000, category: 'سایر', status: 'active', stock: 50 }
    ];

    // Sample sales
    const sampleSales = [
      { amount: 15000000, userId: 'user1', productId: 'product1', status: 'completed' },
      { amount: 8000000, userId: 'user2', productId: 'product2', status: 'completed' },
      { amount: 12000000, userId: 'user3', productId: 'product3', status: 'pending' },
      { amount: 2000000, userId: 'user4', productId: 'product4', status: 'completed' }
    ];

    // Add sample data
    for (const user of sampleUsers) {
      await usersService.create(user);
    }

    for (const product of sampleProducts) {
      await productsService.create(product);
    }

    for (const sale of sampleSales) {
      await salesService.create(sale);
    }

    console.log('Sample data initialized successfully');
  } catch (error) {
    console.error('Error initializing sample data:', error);
  }
};
