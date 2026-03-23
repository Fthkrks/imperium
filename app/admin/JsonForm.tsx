"use client";

import React from 'react';

function getBlankTemplate(prototype: any): any {
  if (Array.isArray(prototype)) return [];
  if (typeof prototype === 'object' && prototype !== null) {
    const blankObj: any = {};
    for (const key of Object.keys(prototype)) {
      blankObj[key] = getBlankTemplate(prototype[key]);
    }
    return blankObj;
  }
  if (typeof prototype === 'boolean') return false;
  if (typeof prototype === 'number') return 0;
  return '';
}

interface JsonFormProps {
  data: any;
  onChange: (newData: any) => void;
  pathKey?: string | number;
  level?: number;
  fileName?: string;
}

export default function JsonForm({ data, onChange, pathKey, level = 0, fileName }: JsonFormProps) {
  const [lastAddedBrandKey, setLastAddedBrandKey] = React.useState<string | null>(null);

  // Styles are injected only once if we place them globally, but placing them in the admin page or layout is better. 
  // However, for self-containment as requested, we can put `<style>` block at level 0.
  const styleBlock = level === 0 ? (
    <style>{`
      .json-null {
        color: #9ca3af;
        font-style: italic;
      }
      .json-input, .json-textarea {
        width: 100%;
        padding: 0.5rem 0.75rem;
        font-size: 0.875rem;
        color: #1f2937;
        background-color: #ffffff;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        outline: none;
        transition: all 0.2s;
        box-sizing: border-box;
        font-family: inherit;
      }
      .json-textarea {
        resize: vertical;
        min-height: 80px;
      }
      .json-input:focus, .json-textarea:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
      }
      .json-checkbox-wrapper {
        display: flex;
        align-items: center;
        cursor: pointer;
      }
      .json-checkbox {
        width: 1rem;
        height: 1rem;
        color: #3b82f6;
        border: 1px solid #d1d5db;
        border-radius: 4px;
      }
      .json-checkbox-label {
        margin-left: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: #374151;
      }
      .json-array-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .json-array-container.nested {
        margin-left: 1rem;
        border-left: 2px solid #f1f5f9;
        padding-left: 1rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
      }
      .json-array-item {
        position: relative;
        background-color: #f8fafc;
        padding: 1rem;
        border-radius: 12px;
        border: 1px solid #e2e8f0;
        transition: all 0.2s;
      }
      .json-array-item:hover {
        background-color: #f1f5f9;
        box-shadow: 0 1px 2px rgba(0,0,0,0.05);
      }
      .json-array-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.75rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #e2e8f0;
      }
      .json-array-title {
        font-size: 0.75rem;
        font-weight: 700;
        color: #94a3b8;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .json-remove-btn {
        color: #94a3b8;
        background: transparent;
        border: none;
        padding: 0.375rem;
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
      }
      .json-remove-btn:hover {
        color: #ef4444;
        background-color: #fef2f2;
      }
      .json-add-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: #3b82f6;
        background-color: #eff6ff;
        border: 1px dashed #bfdbfe;
        padding: 0.75rem 1rem;
        border-radius: 12px;
        cursor: pointer;
        width: 100%;
        transition: all 0.2s;
      }
      .json-add-btn:hover {
        color: #2563eb;
        background-color: #dbeafe;
      }
      .json-object-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
      }
      .json-object-grid.nested {
        margin-left: 0.5rem;
      }
      .json-field-group {
        display: flex;
        flex-direction: column;
      }
      .json-field-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
      }
      .json-field-label {
        display: block;
        font-size: 0.75rem;
        font-weight: 600;
        color: #64748b;
        text-transform: uppercase;
        letter-spacing: 0.025em;
        margin-bottom: 0.375rem;
      }
      .json-field-content {
        /* wrapper for nested form */
      }
      .json-field-content.nested-obj {
        margin-top: 0.5rem;
      }
      .json-remove-key-btn {
        color: #94a3b8;
        background: transparent;
        border: none;
        padding: 0.2rem;
        border-radius: 6px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
      }
      .json-remove-key-btn:hover {
        color: #ef4444;
        background-color: #fef2f2;
      }
    `}</style>
  ) : null;

  // --- NULL / UNDEFINED ---
  if (data === null || data === undefined) {
    return (
      <>
        {styleBlock}
        <span className="json-null">null</span>
      </>
    );
  }

  // --- STRING ---
  if (typeof data === 'string') {
    const isLongText = data.length > 80 || data.includes('\n');
    return (
      <>
        {styleBlock}
        {isLongText ? (
          <textarea
            value={data}
            onChange={(e) => onChange(e.target.value)}
            rows={3}
            className="json-textarea"
          />
        ) : (
          <input
            type="text"
            value={data}
            onChange={(e) => onChange(e.target.value)}
            className="json-input"
          />
        )}
      </>
    );
  }

  // --- NUMBER ---
  if (typeof data === 'number') {
    return (
      <>
        {styleBlock}
        <input
          type="number"
          value={data}
          onChange={(e) => onChange(Number(e.target.value))}
          className="json-input"
        />
      </>
    );
  }

  // --- BOOLEAN ---
  if (typeof data === 'boolean') {
    return (
      <>
        {styleBlock}
        <label className="json-checkbox-wrapper">
          <input
            type="checkbox"
            checked={data}
            onChange={(e) => onChange(e.target.checked)}
            className="json-checkbox"
          />
          <span className="json-checkbox-label">
            {data ? 'True' : 'False'}
          </span>
        </label>
      </>
    );
  }

  // --- ARRAY ---
  if (Array.isArray(data)) {
    const handleRemove = (index: number) => {
      if (confirm('Delete this item?')) {
        const newData = [...data];
        newData.splice(index, 1);
        onChange(newData);
      }
    };

    const handleAdd = () => {
      const template = data.length > 0 ? getBlankTemplate(data[0]) : '';
      onChange([...data, template]);
    };

    return (
      <>
        {styleBlock}
        <div className={`json-array-container ${level > 0 ? 'nested' : ''}`}>
          {data.map((item, index) => (
            <div key={index} className="json-array-item">
              <div className="json-array-header">
                <span className="json-array-title">Item #{index + 1}</span>
                <button 
                  onClick={() => handleRemove(index)}
                  className="json-remove-btn"
                  title="Remove Item"
                >
                  <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="16"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                </button>
              </div>
              <JsonForm
                data={item}
                fileName={fileName}
                level={level + 1}
                onChange={(newItemVal) => {
                  const newData = [...data];
                  newData[index] = newItemVal;
                  onChange(newData);
                }}
              />
            </div>
          ))}

          <button onClick={handleAdd} className="json-add-btn">
            <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="16"><line x1="12" x2="12" y1="5" y2="19" /><line x1="5" x2="19" y1="12" y2="12" /></svg>
            Add New Array Item
          </button>
        </div>
      </>
    );
  }

  // --- OBJECT ---
  if (typeof data === 'object') {
    const isRootBrandsObject = fileName === 'brands.json' && level === 0;

    const handleRemoveKey = (keyToRemove: string) => {
      if (!confirm(`Delete key \"${keyToRemove}\"?`)) return;

      const nextData = { ...data };
      delete nextData[keyToRemove];
      onChange(nextData);
    };

    const handleAddBrandItem = () => {
      const values = Object.values(data);
      const firstValue = values.length > 0 ? values[0] : {
        title: '',
        description: '',
        image: '',
        premium: false,
      };
      const templateValue = getBlankTemplate(firstValue);

      const numericKeys = Object.keys(data)
        .map((key) => Number(key))
        .filter((value) => Number.isFinite(value));
      const nextNumericKey = numericKeys.length > 0 ? Math.max(...numericKeys) + 1 : 1;
      const nextKey = String(nextNumericKey);

      setLastAddedBrandKey(nextKey);
      onChange({ ...data, [nextKey]: templateValue });
    };

    if (isRootBrandsObject) {
      const brandEntries = Object.entries(data);
      const orderedBrandEntries = !lastAddedBrandKey
        ? brandEntries
        : brandEntries.sort(([a], [b]) => {
            if (a === lastAddedBrandKey) return 1;
            if (b === lastAddedBrandKey) return -1;
            return 0;
          });

      return (
        <>
          {styleBlock}
          <div className="json-array-container">
            {orderedBrandEntries.map(([key, val], index) => (
              <div key={key} className="json-array-item">
                <div className="json-array-header">
                  <span className="json-array-title">Item #{index + 1} ({key})</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveKey(key)}
                    className="json-remove-btn"
                    title="Remove Item"
                  >
                    <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="16"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                  </button>
                </div>
                <JsonForm
                  data={val}
                  fileName={fileName}
                  pathKey={key}
                  level={level + 1}
                  onChange={(newVal) => {
                    onChange({ ...data, [key]: newVal });
                  }}
                />
              </div>
            ))}

            <button type="button" onClick={handleAddBrandItem} className="json-add-btn">
              <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="16"><line x1="12" x2="12" y1="5" y2="19" /><line x1="5" x2="19" y1="12" y2="12" /></svg>
              Add New Array Item
            </button>
          </div>
        </>
      );
    }

    return (
      <>
        {styleBlock}
        <div className={`json-object-grid ${level > 0 ? 'nested' : ''}`}>
          {Object.entries(data).map(([key, val]) => {
            const isObj = typeof val === 'object' && val !== null;
            return (
              <div key={key} className="json-field-group">
                <div className="json-field-header">
                  <label className="json-field-label">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <button
                    type="button"
                    className="json-remove-key-btn"
                    onClick={() => handleRemoveKey(key)}
                    title="Remove Key"
                  >
                    <svg fill="none" height="14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="14"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                  </button>
                </div>
                <div className={`json-field-content ${isObj ? 'nested-obj' : ''}`}>
                  <JsonForm
                    data={val}
                    fileName={fileName}
                    pathKey={key}
                    level={level + 1}
                    onChange={(newVal) => {
                      onChange({ ...data, [key]: newVal });
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  return null;
}
