// @ts-nocheck
import React, { createContext, useState } from "react";

export interface Report {
  id: string;
  name: string;
  color: string;
  date: string;
  transactions: any[];
}

export interface ReportsContextType {
  reports: Report[];
  addReport: (report: Report) => void;
  updateReport: (id: string, report: Partial<Report>) => void;
  deleteReport: (id: string) => void;
  currentReport: Report | null;
  setCurrentReport: (report: Report | null) => void;
}

export const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

export function ReportsProvider({ children }: { children: React.ReactNode }) {
  const [reports, setReports] = useState<Report[]>([]);
  const [currentReport, setCurrentReport] = useState<Report | null>(null);

  const addReport = (report: Report) => {
    setReports([...reports, report]);
  };

  const updateReport = (id: string, updatedData: Partial<Report>) => {
    setReports(reports.map(r => r.id === id ? { ...r, ...updatedData } : r));
  };

  const deleteReport = (id: string) => {
    setReports(reports.filter(r => r.id !== id));
  };

  return (
    <ReportsContext.Provider
      value={{
        reports,
        addReport,
        updateReport,
        deleteReport,
        currentReport,
        setCurrentReport,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
}

export function useReports() {
  const context = React.useContext(ReportsContext);
  if (context === undefined) {
    throw new Error("useReports must be used within ReportsProvider");
  }
  return context;
}
