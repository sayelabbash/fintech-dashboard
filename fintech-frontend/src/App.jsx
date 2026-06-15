import { useEffect, useState, useCallback } from "react";
import { Toaster } from "react-hot-toast";
import { getTransactions, getSummary } from "./api/transactions";
import AddTransactionForm from "./components/AddTransactionForm";
import TransactionList from "./components/TransactionList";
import SummaryCards from "./components/SummaryCards";
import SpendingChart from "./components/SpendingChart";
import InsightCard from "./components/InsightCard";
import AuthPage from "./components/AuthPage";

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));
  const email = localStorage.getItem("email");

  const fetchAll = useCallback(async (params = {}) => {
    try {
      const [txRes, sumRes] = await Promise.all([
        getTransactions(params),
        getSummary(),
      ]);
      setTransactions(txRes.data);
      setSummary(sumRes.data);
    } catch (err) {
      if (err.response?.status === 401) handleLogout();
    }
  }, []);

  useEffect(() => {
    if (isAuth) fetchAll();
  }, [isAuth, fetchAll]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setIsAuth(false);
    setSummary(null);
    setTransactions([]);
  };

  if (!isAuth)
    return (
      <>
        <Toaster
          position="top-right"
          toastOptions={{
            style: { borderRadius: "12px", fontFamily: "Inter, sans-serif" },
          }}
        />
        <AuthPage onAuth={() => setIsAuth(true)} />
      </>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <Toaster
        position="top-right"
        toastOptions={{
          style: { borderRadius: "12px", fontFamily: "Inter, sans-serif" },
        }}
      />

      {/* Header */}
      <header
        style={{
          background: "white",
          borderBottom: "1px solid #f1f5f9",
          padding: "0 2rem",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 1px 20px rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
            }}
          >
            💰
          </div>
          <span
            style={{ fontSize: "18px", fontWeight: "800", color: "#1e293b" }}
          >
            Fintech <span style={{ color: "#6366f1" }}>Dashboard</span>
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "13px",
                fontWeight: "700",
              }}
            >
              {email?.[0]?.toUpperCase()}
            </div>
            <span
              style={{ fontSize: "13px", color: "#64748b", fontWeight: "500" }}
            >
              {email}
            </span>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px",
              background: "#fef2f2",
              color: "#ef4444",
              border: "1.5px solid #fecaca",
              borderRadius: "10px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#fee2e2")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#fef2f2")}
          >
            Sign Out
          </button>
        </div>
      </header>

      <main
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "2rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* Welcome */}
        <div>
          <h2
            style={{
              margin: "0 0 4px",
              fontSize: "24px",
              fontWeight: "800",
              color: "#1e293b",
            }}
          >
            Good day! 👋
          </h2>
          <p style={{ margin: 0, color: "#94a3b8", fontSize: "14px" }}>
            Here's your financial overview
          </p>
        </div>

        <SummaryCards summary={summary} />
        <InsightCard
          insight={summary?.insight}
          topCategory={summary?.topSpendingCategory}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "1.5rem",
              border: "1px solid #f1f5f9",
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  background: "#eef2ff",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                }}
              >
                🥧
              </div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "#1e293b",
                }}
              >
                Spending by Category
              </h2>
            </div>
            <SpendingChart spendingByCategory={summary?.spendingByCategory} />
          </div>
          <AddTransactionForm onAdded={fetchAll} />
        </div>

        <TransactionList transactions={transactions} onRefresh={fetchAll} />
      </main>
    </div>
  );
}
