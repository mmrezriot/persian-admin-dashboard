import { useState, useEffect } from 'react';
import { 
  usersService, 
  productsService, 
  salesService, 
  dashboardService 
} from '../services/api';

// Generic hook for any collection
export const useCollection = (service, dependencies = []) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await service.getAll();
        setData(result);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  const create = async (newData) => {
    try {
      const result = await service.create(newData);
      setData(prev => [...prev, result]);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const update = async (id, updatedData) => {
    try {
      const result = await service.update(id, updatedData);
      setData(prev => prev.map(item => item.id === id ? result : item));
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const remove = async (id) => {
    try {
      await service.delete(id);
      setData(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { data, loading, error, create, update, remove };
};

// Specific hooks for different collections
export const useUsers = () => useCollection(usersService);
export const useProducts = () => useCollection(productsService);
export const useSales = () => useCollection(salesService);

// Dashboard hook
export const useDashboard = () => {
  const [stats, setStats] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [statsData, salesChartData, categoriesData] = await Promise.all([
          dashboardService.getStats(),
          dashboardService.getSalesData(),
          dashboardService.getProductCategories()
        ]);

        setStats(statsData);
        setSalesData(salesChartData);
        setProductCategories(categoriesData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return { stats, salesData, productCategories, loading, error };
};

// Real-time data hook
export const useRealtimeCollection = (service) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = service.subscribeToChanges((newData) => {
      setData(newData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [service]);

  return { data, loading, error };
};
