"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import JsonForm from './JsonForm';

function AdminPageContent() {
  const searchParams = useSearchParams();
  const file = searchParams.get('file');

  const [content, setContent] = useState<any>('');
  const [originalContent, setOriginalContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (!file) {
      setContent('');
      setOriginalContent('');
      setMessage({ type: '', text: '' });
      return;
    }

    const loadData = async () => {
      setIsLoading(true);
      setMessage({ type: '', text: '' });
      try {
        const res = await fetch(`/api/admin/data?file=${file}`);
        const data = await res.json();
        
        if (res.ok) {
          const parsedData = JSON.parse(data.data);
          setContent(parsedData);
          setOriginalContent(JSON.stringify(parsedData));
        } else {
          setMessage({ type: 'error', text: data.error || 'Failed to load file.' });
        }
      } catch (err) {
        setMessage({ type: 'error', text: 'Network error loading file.' });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [file]);

  const handleSave = async () => {
    if (!file) return;

    setIsSaving(true);
    setMessage({ type: 'info', text: 'Saving...' });

    try {
      const res = await fetch(`/api/admin/data?file=${file}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: JSON.stringify(content, null, 2) }),
      });

      const data = await res.json();

      if (res.ok) {
        setOriginalContent(JSON.stringify(content));
        setMessage({ type: 'success', text: 'File saved successfully!' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Network error saving file.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setContent(JSON.parse(originalContent));
    setMessage({ type: '', text: '' });
  };

  if (!file) {
    return (
      <div className="admin-welcome-container">
        <svg fill="none" height="64" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" width="64" xmlns="http://www.w3.org/2000/svg" className="admin-welcome-icon">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" x2="8" y1="13" y2="13" />
          <line x1="16" x2="8" y1="17" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        <h2 className="admin-welcome-title">Welcome to the Dashboard</h2>
        <p className="admin-welcome-desc">Select a JSON file from the sidebar to edit its content.</p>
      </div>
    );
  }

  const hasUnsavedChanges = JSON.stringify(content) !== originalContent;

  return (
    <div className="admin-page-container">
      {/* Header */}
      <div className="admin-page-header">
        <div className="admin-header-title-box">
          <h1 className="admin-page-title">
            Editing <span className="admin-file-badge">{file}</span>
          </h1>
          {hasUnsavedChanges && (
            <span className="admin-unsaved-badge">Unsaved changes</span>
          )}
        </div>
        <div className="admin-header-actions">
          <button
            onClick={handleReset}
            disabled={!hasUnsavedChanges || isSaving}
            className="admin-btn admin-btn-secondary"
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={!hasUnsavedChanges || isSaving}
            className="admin-btn admin-btn-primary"
          >
            {isSaving ? (
              <>
                <svg className="admin-spinner" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle className="admin-spinner-bg" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="admin-spinner-fg" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Saving...
              </>
            ) : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Message Banner */}
      {message.text && (
        <div className={`admin-alert admin-alert-${message.type}`}>
          {message.text}
        </div>
      )}

      {/* Editor */}
      <div className="admin-editor-area">
        {isLoading ? (
          <div className="admin-loading-box">
             <svg className="admin-spinner" style={{width: 32, height: 32}} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle className="admin-spinner-bg" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="admin-spinner-fg" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          </div>
        ) : content !== '' ? (
          <div className="admin-scroll-area">
            <JsonForm data={content} onChange={setContent} fileName={file || undefined} />
          </div>
        ) : null}
      </div>

      <style>{`
        .admin-page-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background-color: #ffffff;
        }

        .admin-welcome-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: #64748b;
        }
        .admin-welcome-icon {
          margin-bottom: 1rem;
          color: #94a3b8;
        }
        .admin-welcome-title {
          font-size: 1.25rem;
          font-weight: 500;
          color: #334155;
          margin: 0;
        }
        .admin-welcome-desc {
          margin-top: 0.5rem;
          font-size: 0.875rem;
        }

        .admin-page-header {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #ffffff;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .admin-header-title-box {
          display: flex;
          flex-direction: column;
        }

        .admin-page-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1e293b;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0;
        }

        .admin-file-badge {
          color: #3b82f6;
          font-family: monospace;
          background-color: #eff6ff;
          padding: 0.125rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 1.125rem;
        }

        .admin-unsaved-badge {
          font-size: 0.7rem;
          font-weight: 600;
          color: #f59e0b;
          margin-top: 0.25rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .admin-header-actions {
          display: flex;
          gap: 0.75rem;
        }

        .admin-btn {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          font-weight: 500;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border: 1px solid transparent;
        }

        .admin-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .admin-btn-secondary {
          background-color: #f1f5f9;
          color: #475569;
        }
        
        .admin-btn-secondary:not(:disabled):hover {
          background-color: #e2e8f0;
        }

        .admin-btn-primary {
          background-color: #3b82f6;
          color: white;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }

        .admin-btn-primary:not(:disabled):hover {
          background-color: #2563eb;
        }

        .admin-spinner {
          animation: admin-spin 1s linear infinite;
          height: 1rem;
          width: 1rem;
          color: inherit;
        }
        .admin-spinner-bg {
          opacity: 0.25;
        }
        .admin-spinner-fg {
          opacity: 0.75;
        }
        @keyframes admin-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .admin-alert {
          padding: 0.75rem 1.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          border-bottom: 1px solid transparent;
        }
        .admin-alert-error {
          background-color: #fef2f2;
          color: #b91c1c;
          border-color: #fee2e2;
        }
        .admin-alert-success {
          background-color: #f0fdf4;
          color: #15803d;
          border-color: #dcfce7;
        }
        .admin-alert-info {
          background-color: #eff6ff;
          color: #1d4ed8;
          border-color: #dbeafe;
        }

        .admin-editor-area {
          flex: 1;
          background-color: #f8fafc;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .admin-loading-box {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
        }

        .admin-scroll-area {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
          padding-bottom: 3rem;
        }
      `}</style>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div style={{padding: '2rem', textAlign: 'center', color: '#64748b', fontFamily:'sans-serif'}}>Loading editor...</div>}>
      <AdminPageContent />
    </Suspense>
  );
}
