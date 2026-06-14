import { useState } from "react";
import { deleteTransaction } from "../api/transactions";
import toast from "react-hot-toast";
import { Trash2, Filter } from "lucide-react";

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

  const applyFilter = async () => {
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

  const inputCls =
    "rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300";

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6">
      <h2 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Filter className="w-5 h-5 text-indigo-500" /> Transactions
      </h2>
      <div className="flex flex-wrap gap-2 mb-4">
        <select
          name="category"
          value={filters.category}
          onChange={handle}
          className={inputCls}
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
          className={inputCls}
        />
        <input
          name="endDate"
          type="date"
          value={filters.endDate}
          onChange={handle}
          className={inputCls}
        />
        <button
          onClick={applyFilter}
          className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
        >
          Apply
        </button>
        <button
          onClick={clearFilter}
          className="bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-xl hover:bg-gray-200 transition"
        >
          Clear
        </button>
      </div>
      {transactions.length === 0 ? (
        <p className="text-center text-gray-400 py-8 text-sm">
          No transactions found. Add one above!
        </p>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
          {transactions.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 hover:bg-gray-100 transition"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-lg ${
                    t.type === "INCOME"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {t.type}
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {t.category}
                  </p>
                  <p className="text-xs text-gray-400">
                    {t.date} {t.note && `· ${t.note}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`font-bold text-sm ${
                    t.type === "INCOME" ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {t.type === "INCOME" ? "+" : "-"}₹
                  {Number(t.amount).toLocaleString("en-IN")}
                </span>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="text-gray-300 hover:text-rose-500 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
