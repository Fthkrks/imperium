"use client";

import React, { createContext, useContext } from 'react';

const SiteDataContext = createContext<any>(null);

export function SiteDataProvider({ data, children }: { data: any, children: React.ReactNode }) {
  return (
    <SiteDataContext.Provider value={data}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
}
