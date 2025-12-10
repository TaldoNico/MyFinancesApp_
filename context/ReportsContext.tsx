// context/ReportsContext.tsx
// @ts-nocheck
import React, { createContext, useContext, useState } from "react";

export interface Report {
  id: string;
  name: string;
  color: string;
  date: string;
  transactions: any[]; // movimentações pertencem SOMENTE a este relatório
}

export interface ReportsContextType {
  reports: Report[];
  addReport: (report: Report) => void;
  updateReport: (id: string, report: Partial<Report>) => void;
  deleteReport: (id: string) => void;

  currentReport: Report | null;
  setCurrentReport: (report: Report | null) => void;

  addTransactionToReport: (reportId: string, transaction: any) => void;
}

export const ReportsContext = createContext<ReportsContextType | undefined>(
  undefined
);

export function ReportsProvider({ children }) {
  const [reports, setReports] = useState<Report[]>([]);
  const [currentReport, setCurrentReport] = useState<Report | null>(null);

  // Criar relatório -> começa SEM transactions
  const addReport = (report: Report) => {
    setReports((prev) => [...prev, { ...report, transactions: [] }]);
  };

  // Atualiza algum campo do relatório
  const updateReport = (id: string, updatedData: Partial<Report>) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updatedData } : r))
    );
  };

  // Deleta relatório
  const deleteReport = (id: string) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
  };

  // ADICIONAR movimentação SOMENTE ao relatório selecionado
  const addTransactionToReport = (reportId: string, transaction: any) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === reportId
          ? { ...r, transactions: [...r.transactions, transaction] }
          : r
      )
    );
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
        addTransactionToReport,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
}

export function useReports() {
  const context = useContext(ReportsContext);
  if (!context) {
    throw new Error("useReports must be used within ReportsProvider");
  }
  return context;
}
