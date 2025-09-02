import { Users, DollarSign, Package, TrendingUp } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const Dashboard = () => {
  // داده‌های پیش‌فرض برای charts
  const salesData = [
    { month: 'فروردین', sales: 4000, users: 240 },
    { month: 'اردیبهشت', sales: 3000, users: 139 },
    { month: 'خرداد', sales: 2000, users: 980 },
    { month: 'تیر', sales: 2780, users: 390 },
    { month: 'مرداد', sales: 1890, users: 480 },
    { month: 'شهریور', sales: 2390, users: 380 },
  ]

  const productData = [
    { name: 'لپ‌تاپ', value: 400, color: '#3b82f6' },
    { name: 'موبایل', value: 300, color: '#10b981' },
    { name: 'تبلت', value: 200, color: '#f59e0b' },
    { name: 'سایر', value: 100, color: '#ef4444' },
  ]

  const stats = [
    {
      name: 'تعداد کاربران',
      value: '2,345',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
    },
    {
      name: 'مجموع فروش',
      value: '45,678,000',
      change: '+8%',
      changeType: 'positive',
      icon: DollarSign,
    },
    {
      name: 'محصولات فعال',
      value: '1,234',
      change: '+3%',
      changeType: 'positive',
      icon: Package,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">داشبورد</h1>
        <p className="text-gray-600 dark:text-gray-400">نمای کلی از وضعیت سیستم</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                  <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 ml-1" />
                <span className="text-sm text-green-600 dark:text-green-400">
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                  نسبت به ماه قبل
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            نمودار فروش ماهانه
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="فروش"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Users Chart */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            نمودار کاربران ماهانه
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#10b981" name="کاربران" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Product Categories */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          دسته‌بندی محصولات
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {productData.map((product) => (
            <div key={product.name} className="text-center">
              <div 
                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: product.color }}
              >
                {product.value}
              </div>
              <p className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
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