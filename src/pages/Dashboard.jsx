import { Users, DollarSign, Package, TrendingUp, Loader2, Eye, ArrowUpRight, ArrowDownRight, Activity, UserPlus, Star } from 'lucide-react'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts'
import { useDashboard } from '../hooks/useFirebase'
import { initializeSampleData } from '../services/api'
import { useEffect } from 'react'

const Dashboard = () => {
  const { stats, salesData, productCategories, loading, error } = useDashboard()

  // Initialize sample data on first load
  useEffect(() => {
    initializeSampleData()
  }, [])

  // Format number with Persian locale
  const formatNumber = (num) => {
    return new Intl.NumberFormat('fa-IR').format(num)
  }

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fa-IR', {
      style: 'currency',
      currency: 'IRR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        <span className="mr-2 text-gray-600 dark:text-gray-400">در حال بارگذاری...</span>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-2">خطا در بارگذاری داده‌ها</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    )
  }

  // Stats data with dynamic values
  const statsData = stats ? [
    {
      name: 'تعداد کاربران',
      value: formatNumber(stats.totalUsers),
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      name: 'مجموع فروش',
      value: formatCurrency(stats.totalSales),
      change: '+8%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      iconColor: 'text-green-600 dark:text-green-400',
    },
    {
      name: 'محصولات فعال',
      value: formatNumber(stats.activeProducts),
      change: '+3%',
      changeType: 'positive',
      icon: Package,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      iconColor: 'text-purple-600 dark:text-purple-400',
    },
    {
      name: 'نرخ تبدیل',
      value: '68%',
      change: '+5%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      iconColor: 'text-orange-600 dark:text-orange-400',
    },
  ] : []

  // Recent activities data
  const recentActivities = [
    { id: 1, action: 'کاربر جدید ثبت‌نام کرد', user: 'علی احمدی', time: '5 دقیقه پیش', type: 'user' },
    { id: 2, action: 'محصول جدید اضافه شد', user: 'محصول لپ‌تاپ', time: '15 دقیقه پیش', type: 'product' },
    { id: 3, action: 'فروش جدید', user: '2,500,000 تومان', time: '1 ساعت پیش', type: 'sale' },
    { id: 4, action: 'کاربر آنلاین', user: '12 کاربر', time: '2 ساعت پیش', type: 'activity' },
  ]

  // Top products data
  const topProducts = [
    { name: 'لپ‌تاپ ایسوس', sales: 45, revenue: '125,000,000', growth: '+12%' },
    { name: 'موبایل سامسونگ', sales: 38, revenue: '98,000,000', growth: '+8%' },
    { name: 'تبلت اپل', sales: 32, revenue: '156,000,000', growth: '+15%' },
    { name: 'هدفون سونی', sales: 28, revenue: '45,000,000', growth: '+5%' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">داشبورد</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">خوش آمدید! اینجا نمای کلی از سیستم شماست</p>
        </div>
        <div className="flex items-center space-x-3 space-x-reverse">
          <button className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
            <Eye className="h-4 w-4 ml-2" />
            مشاهده گزارش
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div 
              key={stat.name} 
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity duration-300" 
                   style={{ background: `linear-gradient(135deg, ${stat.color.split(' ')[1]}, ${stat.color.split(' ')[3]})` }}></div>
              
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                  </div>
                  <div className="flex items-center text-sm">
                    {stat.changeType === 'positive' ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500 ml-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500 ml-1" />
                    )}
                    <span className={`font-medium ${stat.changeType === 'positive' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              نمودار فروش ماهانه
            </h3>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Activity className="h-4 w-4 ml-1" />
              آخرین 6 ماه
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="sales" 
                stroke="#3b82f6" 
                strokeWidth={2}
                fill="url(#salesGradient)"
                name="فروش"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Users Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              نمودار کاربران ماهانه
            </h3>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <UserPlus className="h-4 w-4 ml-1" />
              رشد کاربران
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar 
                dataKey="users" 
                fill="#10b981" 
                name="کاربران"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              فعالیت‌های اخیر
            </h3>
            <button className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400">
              مشاهده همه
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 space-x-reverse p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className={`p-2 rounded-full ${
                  activity.type === 'user' ? 'bg-blue-100 dark:bg-blue-900/20' :
                  activity.type === 'product' ? 'bg-green-100 dark:bg-green-900/20' :
                  activity.type === 'sale' ? 'bg-yellow-100 dark:bg-yellow-900/20' :
                  'bg-purple-100 dark:bg-purple-900/20'
                }`}>
                  {activity.type === 'user' && <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                  {activity.type === 'product' && <Package className="h-4 w-4 text-green-600 dark:text-green-400" />}
                  {activity.type === 'sale' && <DollarSign className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />}
                  {activity.type === 'activity' && <Activity className="h-4 w-4 text-purple-600 dark:text-purple-400" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              پرفروش‌ترین محصولات
            </h3>
            <Star className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-sm font-bold text-primary-600 dark:text-primary-400">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {product.sales} فروش
                    </p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {product.revenue}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400">
                    {product.growth}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Categories */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            دسته‌بندی محصولات
          </h3>
          <button className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400">
            مدیریت دسته‌ها
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {productCategories.map((product) => (
            <div key={product.name} className="text-center group cursor-pointer">
              <div 
                className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-200"
                style={{ backgroundColor: product.color }}
              >
                {product.value}
              </div>
              <p className="mt-3 text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {product.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard