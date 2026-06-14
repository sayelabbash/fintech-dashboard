import { useState } from "react";
import { addTransaction } from "../api/transactions";
import toast from "react-hot-toast";
import { PlusCircle } from "lucide-react";

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

  const inputCls =
    "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300";

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6">
      <h2 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
        <PlusCircle className="w-5 h-5 text-indigo-500" /> Add Transaction
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          name="amount"
          type="number"
          placeholder="Amount (₹)"
          value={form.amount}
          onChange={handle}
          className={inputCls}
        />
        <select
          name="category"
          value={form.category}
          onChange={handle}
          className={inputCls}
        >
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select
          name="type"
          value={form.type}
          onChange={handle}
          className={inputCls}
        >
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
        </select>
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handle}
          className={inputCls}
        />
        <input
          name="note"
          type="text"
          placeholder="Note (optional)"
          value={form.note}
          onChange={handle}
          className={`${inputCls} sm:col-span-2`}
        />
      </div>
      <button
        onClick={submit}
        disabled={loading}
        className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl transition disabled:opacity-60"
      >
        {loading ? "Saving..." : "Add Transaction"}
      </button>
    </div>
  );
}
