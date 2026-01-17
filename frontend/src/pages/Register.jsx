import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { AuthHero } from '../components/Auth/AuthHero';
import { Input } from '../components/UI/Input';

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);

      await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-dark-bg text-white">
      <AuthHero image="/public/images/OIP.webp" />

      <div className="flex-1 flex flex-col justify-center px-8 md:px-24 lg:px-32 py-12">
        <div className="max-w-md w-full mx-auto space-y-8">

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-purple rounded-full" />
            <span className="font-bold text-xl">AI Stylist</span>
          </div>

          <h2 className="text-4xl font-bold">Create your account</h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <Input
              label="Email address"
              type="email"
              value={form.email}
              onChange={handleChange('email')}
            />

            <Input
              label="Password"
              type="password"
              value={form.password}
              onChange={handleChange('password')}
            />

            <Input
              label="Confirm Password"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange('confirmPassword')}
            />

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              disabled={loading}
              className="w-full bg-brand-purple py-4 rounded-xl font-bold"
            >
              {loading ? 'Creating account…' : 'Create Account'}
            </button>

            <p className="text-center text-sm text-gray-400">
              Already a member?
              <Link to="/login" className="text-brand-purple ml-1">
                Log in
              </Link>
            </p>
          </form>

        </div>
      </div>
    </div>
  );
}
