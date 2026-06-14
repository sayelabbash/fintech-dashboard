import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

export default function SummaryCards({ summary }) {
  if (!summary) return null;

  const cards = [
    {
      label: "Total Income",
      value: summary.totalIncome,
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
    },
    {
      label: "Total Expense",
      value: summary.totalExpense,
      icon: TrendingDown,
      color: "text-rose-600",
      bg: "bg-rose-50",
      border: "border-rose-200",
    },
    {
      label: "Net Balance",
      value: summary.netBalance,
      icon: Wallet,
      color: summary.netBalance >= 0 ? "text-blue-600" : "text-rose-600",
      bg: summary.netBalance >= 0 ? "bg-blue-50" : "bg-rose-50",
      border: summary.netBalance >= 0 ? "border-blue-200" : "border-rose-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map(({ label, value, icon: Icon, color, bg, border }) => (
        <div
          key={label}
          className={`rounded-2xl border ${border} ${bg} p-5 flex items-center gap-4`}
        >
          <div className="p-3 rounded-xl bg-white shadow-sm">
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
              {label}
            </p>
            <p className={`text-2xl font-bold ${color}`}>
              ₹
              {Number(value).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
