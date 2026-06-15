export default function SummaryCards({ summary }) {
  if (!summary) return null;

  const cards = [
    { label: "Total Income", value: summary.totalIncome, icon: "📈", color: "#10b981", bg: "#ecfdf5", border: "#6ee7b7" },
    { label: "Total Expense", value: summary.totalExpense, icon: "📉", color: "#ef4444", bg: "#fef2f2", border: "#fca5a5" },
    { label: "Net Balance", value: summary.netBalance, icon: "💳",
      color: summary.netBalance >= 0 ? "#6366f1" : "#ef4444",
      bg: summary.netBalance >= 0 ? "#eef2ff" : "#fef2f2",
      border: summary.netBalance >= 0 ? "#a5b4fc" : "#fca5a5" },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "16px",
      }}
    >
      {cards.map(({ label, value, icon, color, bg, border }) => (
        <div
          key={label}
          style={{
            background: bg,
            borderRadius: "20px",
            padding: "1.5rem",
            border: `1.5px solid ${border}`,
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-2px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <p
                style={{
                  margin: "0 0 8px",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                }}
              >
                {label}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "26px",
                  fontWeight: "700",
                  color: color,
                }}
              >
                ₹
                {Number(value).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
            <div style={{ fontSize: "28px", opacity: 0.8 }}>{icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}