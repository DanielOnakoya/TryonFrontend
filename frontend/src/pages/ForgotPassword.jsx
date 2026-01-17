import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { AuthHero } from '../components/Auth/AuthHero';
import { Input } from '../components/UI/Input';

export default function ForgotPassword() {
  const [form, setForm] = useState({
    email: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, form.email);
      setSuccess('Password reset link has been sent to your email.');
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

          <h2 className="text-4xl font-bold">Forgot Password</h2>
          <p className="text-gray-400 text-sm">
            Enter your email address and we’ll send you a password reset link.
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <Input
              label="Email address"
              placeholder="name@example.com"
              type="email"
              value={form.email}
              onChange={handleChange('email')}
            />

            {error && <p className="text-red-400 text-sm">{error}</p>}
            {success && <p className="text-green-400 text-sm">{success}</p>}

            <button
              disabled={loading}
              className="w-full bg-brand-purple py-4 rounded-xl font-bold hover:bg-purple-600"
            >
              {loading ? 'Sending reset link…' : 'Send Reset Link'}
            </button>

            <p className="text-center text-sm text-gray-400 ">
              Remember your password?
              <Link to="/login" className="text-brand-purple ml-1 hover:underline">
                Log in
              </Link>
            </p>
          </form>

        </div>
      </div>
    </div>
  );
}
