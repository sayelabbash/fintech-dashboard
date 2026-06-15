import { useState } from "react";
import { addTransaction } from "../api/transactions";
import toast from "react-hot-toast";

const CATEGORIES = [
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

export default function AddTransactionForm({ onAdded }) {
  const [form, setForm] = useState({
    amount: "",
    category: "Food",
    type: "EXPENSE",
    date: new Date().toISOString().split("T")[0],
    note: "",
  });
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    if (!form.amount || !form.date)
      return toast.error("Amount and date are required");
    setLoading(true);
    try {
      await addTransaction({ ...form, amount: parseFloat(form.amount) });
      toast.success("Transaction added!");
      setForm({
        amount: "",
        category: "Food",
        type: "EXPENSE",
        date: new Date().toISOString().split("T")[0],
        note: "",
      });
      onAdded();
    } catch {
      toast.error("Failed to add transaction");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "11px 14px",
    border: "1.5px solid #e5e7eb",
    borderRadius: "12px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "Inter, sans-serif",
    background: "#f9fafb",
    transition: "all 0.2s",
    color: "#1f2937",
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
          ➕
        </div>
        <h2
          style={{
            margin: 0,
            fontSize: "16px",
            fontWeight: "700",
            color: "#1e293b",
          }}
        >
          Add Transaction
        </h2>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}
      >
        <input
          name="amount"
          type="number"
          placeholder="Amount (₹)"
          value={form.amount}
          onChange={handle}
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.borderColor = "#6366f1";
            e.target.style.background = "white";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e5e7eb";
            e.target.style.background = "#f9fafb";
          }}
        />
        <select
          name="category"
          value={form.category}
          onChange={handle}
          style={inputStyle}
        >
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select
          name="type"
          value={form.type}
          onChange={handle}
          style={{
            ...inputStyle,
            color: form.type === "INCOME" ? "#10b981" : "#ef4444",
            fontWeight: "600",
          }}
        >
          <option value="INCOME">📈 Income</option>
          <option value="EXPENSE">📉 Expense</option>
        </select>
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handle}
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.borderColor = "#6366f1";
            e.target.style.background = "white";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e5e7eb";
            e.target.style.background = "#f9fafb";
          }}
        />
        <input
          name="note"
          type="text"
          placeholder="Note (optional)"
          value={form.note}
          onChange={handle}
          style={{ ...inputStyle, gridColumn: "1 / -1" }}
          onFocus={(e) => {
            e.target.style.borderColor = "#6366f1";
            e.target.style.background = "white";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e5e7eb";
            e.target.style.background = "#f9fafb";
          }}
        />
      </div>

      <button
        onClick={submit}
        disabled={loading}
        style={{
          width: "100%",
          marginTop: "14px",
          padding: "13px",
          background: loading
            ? "#a5b4fc"
            : "linear-gradient(135deg, #667eea, #764ba2)",
          color: "white",
          border: "none",
          borderRadius: "12px",
          fontSize: "15px",
          fontWeight: "700",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "all 0.2s",
        }}
      >
        {loading ? "Saving..." : "Add Transaction"}
      </button>
    </div>
  );
}
