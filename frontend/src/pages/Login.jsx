import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { AuthHero } from '../components/Auth/AuthHero';
import { Input } from '../components/UI/Input';

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        form.email.trim(),
        form.password
      );

      // ✅ Redirect after login
      navigate('/home');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-dark-bg text-white">
      {/* Visual Hero Side */}
      <AuthHero image="/public/images/female-model-white-tshirt_979387-24.jpg" />

      {/* Form Side */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-24 lg:px-32 py-12">
        <div className="max-w-md w-full mx-auto space-y-10">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-purple rounded-full shadow-[0_0_20px_rgba(139,92,246,0.6)]" />
            <span className="font-bold text-xl tracking-tight">AI Stylist</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-4xl font-bold tracking-tight">Welcome Back</h2>
            <p className="text-sm text-gray-400">
              Continue style journey.
              <Link
                to="/register"
                className="text-brand-purple hover:text-purple-400 ml-1"
              >
                Create an account
              </Link>
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Email address"
              placeholder="name@example.com"
              type="email"
              value={form.email}
              onChange={handleChange('email')}
            />

            <div className="space-y-3">
              <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
                value={form.password}
                onChange={handleChange('password')}
              />

              <Link
                to="/forgot-password"
                className="text-brand-purple text-sm font-medium hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-purple hover:bg-purple-600 py-4 rounded-xl font-bold text-lg transition-all shadow-lg disabled:opacity-60"
            >
              {loading ? 'Logging in…' : 'Log In'}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
