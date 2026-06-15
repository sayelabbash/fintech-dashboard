import { useState } from "react";
import { deleteTransaction } from "../api/transactions";
import toast from "react-hot-toast";

const CATEGORIES = [
  "",
  "Salary",
  "Food",
  "Transport",
  "Rent",
  "Shopping",
  "Health",
  "Entertainment",
  "Education",
  "Other",
];

export default function TransactionList({ transactions, onRefresh }) {
  const [filters, setFilters] = useState({
    category: "",
    startDate: "",
    endDate: "",
  });

  const handle = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const applyFilter = () => {
    const params = {};
    if (filters.category) params.category = filters.category;
    if (filters.startDate) params.startDate = filters.startDate;
    if (filters.endDate) params.endDate = filters.endDate;
    onRefresh(params);
  };

  const clearFilter = () => {
    setFilters({ category: "", startDate: "", endDate: "" });
    onRefresh({});
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this transaction?")) return;
    try {
      await deleteTransaction(id);
      toast.success("Deleted!");
      onRefresh({});
    } catch {
      toast.error("Delete failed");
    }
  };

  const inputStyle = {
    padding: "9px 12px",
    border: "1.5px solid #e5e7eb",
    borderRadius: "10px",
    fontSize: "13px",
    outline: "none",
    fontFamily: "Inter, sans-serif",
    background: "#f9fafb",
    color: "#374151",
  };

  const categoryIcons = {
    Salary: "💼",
    Food: "🍕",
    Transport: "🚗",
    Rent: "🏠",
    Shopping: "🛍️",
    Health: "❤️",
    Entertainment: "🎮",
    Education: "📚",
    Other: "📌",
  };

  return (
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
          marginBottom: "1.25rem",
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
          🔍
        </div>
        <h2
          style={{
            margin: 0,
            fontSize: "16px",
            fontWeight: "700",
            color: "#1e293b",
          }}
        >
          Transactions
        </h2>
        <span
          style={{
            marginLeft: "auto",
            background: "#f1f5f9",
            color: "#64748b",
            padding: "4px 10px",
            borderRadius: "99px",
            fontSize: "12px",
            fontWeight: "600",
          }}
        >
          {transactions.length} records
        </span>
      </div>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginBottom: "1rem",
          padding: "12px",
          background: "#f8fafc",
          borderRadius: "12px",
        }}
      >
        <select
          name="category"
          value={filters.category}
          onChange={handle}
          style={inputStyle}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c || "All Categories"}
            </option>
          ))}
        </select>
        <input
          name="startDate"
          type="date"
          value={filters.startDate}
          onChange={handle}
          style={inputStyle}
        />
        <input
          name="endDate"
          type="date"
          value={filters.endDate}
          onChange={handle}
          style={inputStyle}
        />
        <button
          onClick={applyFilter}
          style={{
            padding: "9px 18px",
            background: "#6366f1",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "13px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Apply
        </button>
        <button
          onClick={clearFilter}
          style={{
            padding: "9px 18px",
            background: "white",
            color: "#64748b",
            border: "1.5px solid #e5e7eb",
            borderRadius: "10px",
            fontSize: "13px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Clear
        </button>
      </div>

      {/* List */}
      {transactions.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "#94a3b8" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>📭</div>
          <p style={{ margin: 0, fontSize: "14px" }}>
            No transactions yet. Add your first one!
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            maxHeight: "420px",
            overflowY: "auto",
            paddingRight: "4px",
          }}
        >
          {transactions.map((t) => (
            <div
              key={t.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                borderRadius: "14px",
                border: "1.5px solid #f1f5f9",
                background: "#fafbff",
                transition: "all 0.15s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f8faff";
                e.currentTarget.style.borderColor = "#e0e7ff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#fafbff";
                e.currentTarget.style.borderColor = "#f1f5f9";
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    background: t.type === "INCOME" ? "#ecfdf5" : "#fef2f2",
                  }}
                >
                  {categoryIcons[t.category] || "📌"}
                </div>
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#1e293b",
                    }}
                  >
                    {t.category}
                  </p>
                  <p style={{ margin: 0, fontSize: "12px", color: "#94a3b8" }}>
                    {t.date}
                    {t.note && ` · ${t.note}`}
                  </p>
                </div>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div style={{ textAlign: "right" }}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "15px",
                      fontWeight: "700",
                      color: t.type === "INCOME" ? "#10b981" : "#ef4444",
                    }}
                  >
                    {t.type === "INCOME" ? "+" : "-"}₹
                    {Number(t.amount).toLocaleString("en-IN")}
                  </p>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                      padding: "2px 8px",
                      borderRadius: "99px",
                      background: t.type === "INCOME" ? "#ecfdf5" : "#fef2f2",
                      color: t.type === "INCOME" ? "#10b981" : "#ef4444",
                    }}
                  >
                    {t.type}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(t.id)}
                  style={{
                    background: "#fef2f2",
                    border: "none",
                    borderRadius: "10px",
                    width: "34px",
                    height: "34px",
                    cursor: "pointer",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ef4444",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#fee2e2")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#fef2f2")
                  }
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
