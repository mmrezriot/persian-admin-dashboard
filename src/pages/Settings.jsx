import { useState } from 'react'
import { Save, Bell, Shield, Palette, Globe, Database } from 'lucide-react'

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: 'پنل مدیریت فارسی',
    siteDescription: 'سیستم مدیریت محتوا و کاربران',
    language: 'fa',
    timezone: 'Asia/Tehran',
    notifications: {
      email: true,
      push: false,
      sms: false
    },
    security: {
      twoFactor: false,
      sessionTimeout: 30,
      passwordPolicy: 'medium'
    },
    appearance: {
      theme: 'light',
      primaryColor: '#3b82f6',
      sidebarCollapsed: false
    },
    backup: {
      autoBackup: true,
      backupFrequency: 'daily',
      retentionDays: 30
    }
  })

  const [activeTab, setActiveTab] = useState('general')

  const tabs = [
    { id: 'general', name: 'عمومی', icon: Globe },
    { id: 'notifications', name: 'اعلان‌ها', icon: Bell },
    { id: 'security', name: 'امنیت', icon: Shield },
    { id: 'appearance', name: 'ظاهر', icon: Palette },
    { id: 'backup', name: 'پشتیبان‌گیری', icon: Database },
  ]

  const handleSave = () => {
    // در اینجا می‌توانید تنظیمات را ذخیره کنید
    alert('تنظیمات با موفقیت ذخیره شد!')
  }

  const updateSettings = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }))
  }

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          نام سایت
        </label>
        <input
          type="text"
          value={settings.siteName}
          onChange={(e) => setSettings({...settings, siteName: e.target.value})}
          className="input-field"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          توضیحات سایت
        </label>
        <textarea
          value={settings.siteDescription}
          onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
          className="input-field"
          rows="3"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          زبان پیش‌فرض
        </label>
        <select
          value={settings.language}
          onChange={(e) => setSettings({...settings, language: e.target.value})}
          className="input-field"
        >
          <option value="fa">فارسی</option>
          <option value="en">انگلیسی</option>
          <option value="ar">عربی</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          منطقه زمانی
        </label>
        <select
          value={settings.timezone}
          onChange={(e) => setSettings({...settings, timezone: e.target.value})}
          className="input-field"
        >
          <option value="Asia/Tehran">تهران (GMT+3:30)</option>
          <option value="UTC">UTC (GMT+0)</option>
          <option value="America/New_York">نیویورک (GMT-5)</option>
        </select>
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">اعلان‌های ایمیل</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">دریافت اعلان‌ها از طریق ایمیل</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.notifications.email}
            onChange={(e) => updateSettings('notifications', 'email', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
        </label>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">اعلان‌های Push</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">دریافت اعلان‌های فوری در مرورگر</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.notifications.push}
            onChange={(e) => updateSettings('notifications', 'push', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
        </label>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">اعلان‌های SMS</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">دریافت اعلان‌ها از طریق پیامک</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.notifications.sms}
            onChange={(e) => updateSettings('notifications', 'sms', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
        </label>
      </div>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">احراز هویت دو مرحله‌ای</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">افزایش امنیت با کد تایید</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.security.twoFactor}
            onChange={(e) => updateSettings('security', 'twoFactor', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
        </label>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          زمان انقضای جلسه (دقیقه)
        </label>
        <input
          type="number"
          value={settings.security.sessionTimeout}
          onChange={(e) => updateSettings('security', 'sessionTimeout', parseInt(e.target.value))}
          className="input-field"
          min="5"
          max="120"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          سیاست رمز عبور
        </label>
        <select
          value={settings.security.passwordPolicy}
          onChange={(e) => updateSettings('security', 'passwordPolicy', e.target.value)}
          className="input-field"
        >
          <option value="low">ضعیف</option>
          <option value="medium">متوسط</option>
          <option value="high">قوی</option>
        </select>
      </div>
    </div>
  )

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          تم پیش‌فرض
        </label>
        <select
          value={settings.appearance.theme}
          onChange={(e) => updateSettings('appearance', 'theme', e.target.value)}
          className="input-field"
        >
          <option value="light">روشن</option>
          <option value="dark">تاریک</option>
          <option value="auto">خودکار</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          رنگ اصلی
        </label>
        <div className="flex space-x-3 space-x-reverse">
          {['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'].map(color => (
            <button
              key={color}
              onClick={() => updateSettings('appearance', 'primaryColor', color)}
              className={`w-8 h-8 rounded-full border-2 ${
                settings.appearance.primaryColor === color ? 'border-gray-900 dark:border-white' : 'border-gray-300'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">منوی کناری جمع شده</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">نمایش منوی کناری به صورت جمع شده</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.appearance.sidebarCollapsed}
            onChange={(e) => updateSettings('appearance', 'sidebarCollapsed', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
        </label>
      </div>
    </div>
  )

  const renderBackupSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">پشتیبان‌گیری خودکار</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">ایجاد پشتیبان خودکار از داده‌ها</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.backup.autoBackup}
            onChange={(e) => updateSettings('backup', 'autoBackup', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
        </label>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          فرکانس پشتیبان‌گیری
        </label>
        <select
          value={settings.backup.backupFrequency}
          onChange={(e) => updateSettings('backup', 'backupFrequency', e.target.value)}
          className="input-field"
        >
          <option value="daily">روزانه</option>
          <option value="weekly">هفتگی</option>
          <option value="monthly">ماهانه</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          مدت نگهداری پشتیبان (روز)
        </label>
        <input
          type="number"
          value={settings.backup.retentionDays}
          onChange={(e) => updateSettings('backup', 'retentionDays', parseInt(e.target.value))}
          className="input-field"
          min="7"
          max="365"
        />
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings()
      case 'notifications':
        return renderNotificationSettings()
      case 'security':
        return renderSecuritySettings()
      case 'appearance':
        return renderAppearanceSettings()
      case 'backup':
        return renderBackupSettings()
      default:
        return renderGeneralSettings()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">تنظیمات</h1>
        <p className="text-gray-600 dark:text-gray-400">مدیریت تنظیمات سیستم</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="ml-3 h-4 w-4" />
                    {tab.name}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {tabs.find(tab => tab.id === activeTab)?.name}
              </h2>
              <button
                onClick={handleSave}
                className="btn-primary flex items-center"
              >
                <Save className="h-4 w-4 ml-2" />
                ذخیره تغییرات
              </button>
            </div>
            
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings