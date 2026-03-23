"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        window.location.href = '/admin';
      } else {
        setError(data.error || 'Invalid password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <h1>Admin Login</h1>
          <p>Enter your password to access the dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="admin-input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className="admin-error-message">{error}</div>}

          <button type="submit" disabled={isLoading} className="admin-login-btn">
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>

      <style>{`
        .admin-login-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f8fafc;
          padding: 1rem;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .admin-login-card {
          width: 100%;
          max-width: 400px;
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
          padding: 2rem;
        }
        .admin-login-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .admin-login-header h1 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }
        .admin-login-header p {
          color: #6b7280;
          margin-top: 0.5rem;
          font-size: 0.95rem;
        }
        .admin-login-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .admin-input-group label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.5rem;
        }
        .admin-input-group input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          outline: none;
          font-size: 1rem;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }
        .admin-input-group input:focus {
          border-color: #70B5ED;
          box-shadow: 0 0 0 3px rgba(112, 181, 237, 0.2);
        }
        .admin-error-message {
          color: #ef4444;
          font-size: 0.875rem;
          text-align: center;
        }
        .admin-login-btn {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 0.875rem 1rem;
          background-color: #70B5ED;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .admin-login-btn:hover {
          background-color: #5a9cce;
        }
        .admin-login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
