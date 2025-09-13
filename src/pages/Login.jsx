import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Notification from '../components/Notification';
import { Eye, EyeOff, Loader2, LogIn, UserPlus } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { signin, signup, userProfile } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });

  // Check if user is already logged in
  useEffect(() => {
    if (userProfile) {
      navigate('/dashboard');
    }
  }, [userProfile, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        await signin(formData.email, formData.password);
        setSuccess('ورود با موفقیت انجام شد! در حال انتقال به داشبورد...');
      } else {
        // Signup
        if (formData.password !== formData.confirmPassword) {
          setError('رمزهای عبور مطابقت ندارند');
          setLoading(false);
          return;
        }

        if (formData.password.length < 6) {
          setError('رمز عبور باید حداقل ۶ کاراکتر باشد');
          setLoading(false);
          return;
        }

        await signup(formData.email, formData.password, {
          name: formData.name,
          role: formData.role
        });
        setSuccess('ثبت‌نام با موفقیت انجام شد! در حال انتقال به داشبورد...');
      }
    } catch (error) {
      console.error('Auth error:', error);
      switch (error.code) {
        case 'auth/user-not-found':
          setError('کاربری با این ایمیل یافت نشد');
          break;
        case 'auth/wrong-password':
          setError('رمز عبور اشتباه است');
          break;
        case 'auth/email-already-in-use':
          setError('این ایمیل قبلاً استفاده شده است');
          break;
        case 'auth/weak-password':
          setError('رمز عبور ضعیف است');
          break;
        case 'auth/invalid-email':
          setError('ایمیل نامعتبر است');
          break;
        case 'auth/configuration-not-found':
          setError('تنظیمات Firebase فعال نشده است. لطفاً با مدیر تماس بگیرید');
          break;
        default:
          setError('خطا در ورود/ثبت‌نام. لطفاً دوباره تلاش کنید');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const fillDemoCredentials = (email, password) => {
    setFormData({
      ...formData,
      email,
      password
    });
  };


  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'user'
    });
  };


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Notifications */}
      <Notification
        type="success"
        message={success}
        show={!!success}
        onClose={() => setSuccess('')}
        duration={3000}
      />
      <Notification
        type="error"
        message={error}
        show={!!error}
        onClose={() => setError('')}
        duration={5000}
      />
      
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900">
            <LogIn className="h-6 w-6 text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {isLogin ? 'ورود به پنل مدیریت' : 'ثبت‌نام در پنل مدیریت'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {isLogin ? 'حساب کاربری خود را وارد کنید' : 'حساب کاربری جدید ایجاد کنید'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  نام و نام خانوادگی
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required={!isLogin}
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-field mt-1"
                  placeholder="نام و نام خانوادگی خود را وارد کنید"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                آدرس ایمیل
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="input-field mt-1"
                placeholder="ایمیل خود را وارد کنید"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                رمز عبور
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input-field pr-10"
                  placeholder="رمز عبور خود را وارد کنید"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 left-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {!isLogin && (
              <>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    تأیید رمز عبور
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required={!isLogin}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="input-field mt-1"
                    placeholder="رمز عبور را دوباره وارد کنید"
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    نقش کاربری
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="input-field mt-1"
                  >
                    <option value="user">کاربر عادی</option>
                    <option value="moderator">ویرایشگر</option>
                    <option value="admin">مدیر</option>
                  </select>
                </div>
              </>
            )}
          </div>


          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  {isLogin ? (
                    <>
                      <LogIn className="h-4 w-4 ml-2" />
                      ورود
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 ml-2" />
                      ثبت‌نام
                    </>
                  )}
                </>
              )}
            </button>
          </div>

          <div className="text-center space-y-3">
            <button
              type="button"
              onClick={toggleMode}
              className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
            >
              {isLogin ? 'حساب کاربری ندارید؟ ثبت‌نام کنید' : 'حساب کاربری دارید؟ وارد شوید'}
            </button>
            
          </div>

          {/* Test Login Button */}
          {isLogin && (
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-green-800 dark:text-green-200">
                    تست سریع ورود
                  </h4>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    admin@example.com / 123456
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => fillDemoCredentials('admin@example.com', '123456')}
                  className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs rounded-md transition-colors"
                >
                  پر کردن فرم
                </button>
              </div>
            </div>
          )}

        </form>
      </div>
    </div>
  );
};

export default Login;
