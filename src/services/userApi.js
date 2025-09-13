import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '../config/firebase';

// User API Service
export class UserApiService {
  constructor() {
    this.collectionName = 'users';
    this.collectionRef = collection(db, this.collectionName);
  }

  // Get all users
  async getAllUsers() {
    try {
      const snapshot = await getDocs(this.collectionRef);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting users:', error);
      throw error;
    }
  }

  // Get user by ID
  async getUserById(userId) {
    try {
      const userDoc = await getDoc(doc(this.collectionRef, userId));
      if (userDoc.exists()) {
        return { id: userDoc.id, ...userDoc.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting user by ID:', error);
      throw error;
    }
  }

  // Get user by email
  async getUserByEmail(email) {
    try {
      const q = query(this.collectionRef, where('email', '==', email));
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        return { id: doc.id, ...doc.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting user by email:', error);
      throw error;
    }
  }

  // Create new user
  async createUser(userData) {
    try {
      // Check if user already exists
      const existingUser = await this.getUserByEmail(userData.email);
      if (existingUser) {
        throw new Error('کاربری با این ایمیل قبلاً وجود دارد');
      }

      const userDoc = await addDoc(this.collectionRef, {
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      return { id: userDoc.id, ...userData };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Update user
  async updateUser(userId, userData) {
    try {
      const userRef = doc(this.collectionRef, userId);
      await updateDoc(userRef, {
        ...userData,
        updatedAt: new Date()
      });

      return { id: userId, ...userData };
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  // Delete user
  async deleteUser(userId) {
    try {
      await deleteDoc(doc(this.collectionRef, userId));
      return { id: userId };
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  // Get users by role
  async getUsersByRole(role) {
    try {
      const q = query(this.collectionRef, where('role', '==', role));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting users by role:', error);
      throw error;
    }
  }

  // Get active users
  async getActiveUsers() {
    try {
      const q = query(this.collectionRef, where('status', '==', 'active'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting active users:', error);
      throw error;
    }
  }

  // Search users
  async searchUsers(searchTerm) {
    try {
      const allUsers = await this.getAllUsers();
      return allUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  }

  // Get user statistics
  async getUserStats() {
    try {
      const allUsers = await this.getAllUsers();
      const activeUsers = allUsers.filter(user => user.status === 'active');
      const adminUsers = allUsers.filter(user => user.role === 'admin');
      const moderatorUsers = allUsers.filter(user => user.role === 'moderator');
      const regularUsers = allUsers.filter(user => user.role === 'user');

      return {
        total: allUsers.length,
        active: activeUsers.length,
        inactive: allUsers.length - activeUsers.length,
        byRole: {
          admin: adminUsers.length,
          moderator: moderatorUsers.length,
          user: regularUsers.length
        }
      };
    } catch (error) {
      console.error('Error getting user stats:', error);
      throw error;
    }
  }
}

// Create instance
export const userApi = new UserApiService();

// Demo users data for testing
export const demoUsers = [
  {
    name: 'مدیر سیستم',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
    password: '123456'
  }
];

// Initialize demo users
export const initializeDemoUsers = async () => {
  try {
    // Check if demo users already exist
    const existingUsers = await userApi.getAllUsers();
    if (existingUsers.length > 0) return;

    // Create demo users
    for (const user of demoUsers) {
      await userApi.createUser(user);
    }

  } catch (error) {
    // Silent fail for demo users initialization
  }
};
