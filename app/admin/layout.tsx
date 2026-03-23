"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

const MENU_ITEMS = [
  { name: 'Contact Info', file: 'contact.json', icon: <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> },
  { name: 'Blog Posts', file: 'blog.json', icon: <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> },
  { name: 'Services (Residential)', file: 'services-residential.json', icon: <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { name: 'Services (Commercial)', file: 'services-commercial.json', icon: <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="15" y2="22"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="16" y2="14"/></svg> },
  { name: 'Testimonials', file: 'testimonials.json', icon: <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
  { name: 'Why Us Stats', file: 'why.json', icon: <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  { name: 'Service Areas', file: 'areas.json', icon: <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
  { name: 'Locations', file: 'locations.json', icon: <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18"><path d="M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10z"/><circle cx="12" cy="11" r="2.5"/></svg> },
  { name: 'FAQ', file: 'faq.json', icon: <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
  { name: 'Brands', file: 'brands.json', icon: <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg> },
  { name: 'Site Metadata', file: 'metadata.json', icon: <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/></svg> },
];

function SidebarLinks() {
  const searchParams = useSearchParams();
  const currentFile = searchParams.get('file');

  return (
    <>
      {MENU_ITEMS.map((item) => {
        const isActive = currentFile === item.file;
        return (
          <Link
            key={item.file}
            href={`/admin?file=${item.file}`}
            className={`admin-nav-link ${isActive ? 'active' : ''}`}
          >
            <span className="admin-nav-icon">{item.icon}</span>
            {item.name}
          </Link>
        );
      })}
    </>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/status', { cache: 'no-store' });
        const data = await res.json();
        setIsAuthenticated(Boolean(data.authenticated));
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsAuthenticating(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setPassword('');
        return;
      }

      setAuthError(data.error || 'Invalid password');
    } catch {
      setAuthError('An error occurred. Please try again.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await fetch('/api/auth/logout', { method: 'POST' });
    setIsAuthenticated(false);
    setIsLoggingOut(false);
  };

  if (isCheckingAuth) {
    return (
      <div className="admin-auth-loading">
        Checking authentication...
        <style>{`
          .admin-auth-loading {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f8fafc;
            color: #475569;
            font-family: system-ui, -apple-system, sans-serif;
            font-size: 0.95rem;
          }
        `}</style>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-auth-overlay">
        <div className="admin-auth-modal">
          <h1 className="admin-auth-title">Admin Access</h1>
          <p className="admin-auth-subtitle">Continue by entering your password.</p>

          <form onSubmit={handleLogin} className="admin-auth-form">
            <label htmlFor="admin-password" className="admin-auth-label">Password</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="admin-auth-input"
              autoFocus
              required
            />

            {authError && <div className="admin-auth-error">{authError}</div>}

            <button type="submit" disabled={isAuthenticating} className="admin-auth-btn">
              {isAuthenticating ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>

        <style>{`
          .admin-auth-overlay {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            background: radial-gradient(circle at top, #e2e8f0 0%, #f8fafc 45%, #f1f5f9 100%);
            font-family: system-ui, -apple-system, sans-serif;
          }

          .admin-auth-modal {
            width: 100%;
            max-width: 420px;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 14px;
            box-shadow: 0 20px 45px rgba(15, 23, 42, 0.12);
            padding: 1.8rem;
          }

          .admin-auth-title {
            margin: 0;
            font-size: 1.4rem;
            color: #0f172a;
          }

          .admin-auth-subtitle {
            margin: 0.5rem 0 1.25rem;
            color: #475569;
            font-size: 0.92rem;
          }

          .admin-auth-form {
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
          }

          .admin-auth-label {
            font-size: 0.82rem;
            font-weight: 600;
            color: #334155;
          }

          .admin-auth-input {
            width: 100%;
            padding: 0.75rem 0.9rem;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            outline: none;
            font-size: 0.95rem;
            box-sizing: border-box;
          }

          .admin-auth-input:focus {
            border-color: #70b5ed;
            box-shadow: 0 0 0 3px rgba(112, 181, 237, 0.2);
          }

          .admin-auth-error {
            color: #b91c1c;
            font-size: 0.84rem;
            margin-top: 0.1rem;
          }

          .admin-auth-btn {
            margin-top: 0.4rem;
            padding: 0.78rem 1rem;
            border: 0;
            border-radius: 8px;
            background: #0f172a;
            color: #ffffff;
            font-weight: 600;
            font-size: 0.92rem;
            cursor: pointer;
          }

          .admin-auth-btn:disabled {
            opacity: 0.65;
            cursor: not-allowed;
          }
        `}</style>
      </div>
    );
  };

  return (
    <div className="admin-dashboard-layout">
      {/* Mobile Header */}
      <div className="admin-mobile-header">
        <button 
          className="admin-mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
        </button>
        <span className="admin-mobile-title">Dashboard</span>
      </div>

      {/* Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="admin-sidebar-overlay" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <Link href="/admin" className="admin-logo-link" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="admin-logo-icon">
              <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="18"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <span className="admin-logo-text">Dashboard</span>
          </Link>
          <button 
            className="admin-mobile-close-btn"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
          </button>
        </div>
        
        <nav className="admin-nav-menu" onClick={() => {
          if (window.innerWidth <= 768) setIsMobileMenuOpen(false);
        }}>
          <Suspense fallback={<div className="admin-nav-loading">Loading menu...</div>}>
            <SidebarLinks />
          </Suspense>
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-logout-box">
            <p className="admin-logout-text">Finished editing?</p>
            <button onClick={handleLogout} disabled={isLoggingOut} className="admin-logout-btn">
              <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="16"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
              {isLoggingOut ? 'Logging out...' : 'Sign Out'}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main-content">
        {children}
      </main>

      <style>{`
        body { margin: 0; padding: 0; }
        .admin-dashboard-layout {
          min-height: 100vh;
          display: flex;
          background-color: #f8fafc;
          font-family: system-ui, -apple-system, sans-serif;
        }
        
        .admin-sidebar {
          width: 280px;
          background-color: #0f172a;
          color: white;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          border-right: 1px solid #1e293b;
          height: 100vh;
          position: sticky;
          top: 0;
        }

        .admin-sidebar-header {
          padding: 1.5rem;
        }

        .admin-logo-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: white;
        }

        .admin-logo-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
          transition: box-shadow 0.2s;
        }

        .admin-logo-link:hover .admin-logo-icon {
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.5);
        }

        .admin-logo-text {
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.5px;
        }

        .admin-nav-menu {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
          flex: 1;
          overflow-y: auto;
        }

        .admin-nav-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #94a3b8;
          text-decoration: none;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }

        .admin-nav-link:hover {
          background-color: rgba(30, 41, 59, 0.5);
          color: #e2e8f0;
        }

        .admin-nav-link.active {
          background-color: rgba(37, 99, 235, 0.1);
          color: #60a5fa;
          border-color: rgba(59, 130, 246, 0.2);
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
        }

        .admin-nav-icon {
          color: #64748b;
          transition: color 0.2s ease;
        }

        .admin-nav-link.active .admin-nav-icon {
          color: #60a5fa;
        }

        .admin-nav-loading {
          padding: 1rem;
          color: #64748b;
          font-size: 0.875rem;
        }

        .admin-sidebar-footer {
          padding: 1rem;
          margin-top: auto;
        }

        .admin-logout-box {
          padding: 1.25rem;
          background-color: rgba(30, 41, 59, 0.3);
          border-radius: 12px;
          border: 1px solid rgba(51, 65, 85, 0.5);
        }

        .admin-logout-text {
          font-size: 0.75rem;
          color: #94a3b8;
          text-align: center;
          margin: 0 0 0.75rem 0;
        }

        .admin-logout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.6rem 1rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #ffffff;
          background-color: #1e293b;
          border: 1px solid #334155;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .admin-logout-btn:hover {
          background-color: rgba(239, 68, 68, 0.1);
          color: #f87171;
          border-color: rgba(239, 68, 68, 0.2);
        }

        .admin-logout-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .admin-main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background-color: #ffffff;
        }

        .admin-mobile-header {
          display: none;
        }
        
        .admin-mobile-close-btn {
          display: none;
        }

        @media (max-width: 768px) {
          .admin-dashboard-layout {
            flex-direction: column;
          }
          
          .admin-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            transform: translateX(-100%);
            z-index: 50;
            transition: transform 0.3s ease;
            box-shadow: 4px 0 20px rgba(0,0,0,0.1);
          }
          
          .admin-sidebar.open {
            transform: translateX(0);
          }
          
          .admin-sidebar-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          
          .admin-mobile-close-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            background: transparent;
            border: none;
            color: #94a3b8;
            padding: 0.5rem;
            cursor: pointer;
            border-radius: 6px;
          }
          
          .admin-mobile-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem 1.5rem;
            background-color: #0f172a;
            color: white;
            z-index: 40;
            position: sticky;
            top: 0;
          }
          
          .admin-mobile-menu-btn {
            background: transparent;
            border: none;
            color: white;
            padding: 0;
            cursor: pointer;
            display: flex;
            align-items: center;
          }
          
          .admin-mobile-title {
            font-size: 1.1rem;
            font-weight: 600;
          }
          
          .admin-sidebar-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(15, 23, 42, 0.5);
            backdrop-filter: blur(2px);
            z-index: 45;
          }
          
          .admin-main-content {
            height: calc(100vh - 60px);
            overflow-y: auto;
          }
        }

        /* Generic Scroller */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f5f9; 
        }
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1; 
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; 
        }
      `}</style>
    </div>
  );
}
