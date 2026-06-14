import { useEffect, useState, useCallback } from "react";
import { Toaster } from "react-hot-toast";
import { getTransactions, getSummary } from "./api/transactions";
import AddTransactionForm from "./components/AddTransactionForm";
import TransactionList from "./components/TransactionList";
import SummaryCards from "./components/SummaryCards";
import SpendingChart from "./components/SpendingChart";
import InsightCard from "./components/InsightCard";
import { LayoutDashboard } from "lucide-react";

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);

  const fetchAll = useCallback(async (params = {}) => {
    const [txRes, sumRes] = await Promise.all([
      getTransactions(params),
      getSummary(),
    ]);
    setTransactions(txRes.data);
    setSummary(sumRes.data);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900">
      <Toaster position="top-right" />
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-3 shadow-sm">
        <LayoutDashboard className="w-6 h-6 text-indigo-600" />
        <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
          Fintech <span className="text-indigo-600">Dashboard</span>
        </h1>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <SummaryCards summary={summary} />
        <InsightCard
          insight={summary?.insight}
          topCategory={summary?.topSpendingCategory}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6">
            <h2 className="text-base font-bold text-gray-800 mb-2">
              Spending by Category
            </h2>
            <SpendingChart spendingByCategory={summary?.spendingByCategory} />
          </div>
          <AddTransactionForm onAdded={fetchAll} />
        </div>
        <TransactionList transactions={transactions} onRefresh={fetchAll} />
      </main>
    </div>
  );
}
