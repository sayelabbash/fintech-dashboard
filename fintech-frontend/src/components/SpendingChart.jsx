import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#6366f1",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
];

export default function SpendingChart({ spendingByCategory }) {
  if (!spendingByCategory || Object.keys(spendingByCategory).length === 0) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "200px",
          color: "#94a3b8",
        }}
      >
        <div style={{ fontSize: "48px", marginBottom: "12px" }}>📊</div>
        <p style={{ margin: 0, fontSize: "14px" }}>No expense data yet</p>
      </div>
    );
  }

  const data = Object.entries(spendingByCategory).map(([name, value]) => ({
    name,
    value: Number(value),
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={65}
          outerRadius={100}
          paddingAngle={4}
          dataKey="value"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(v) => `₹${Number(v).toLocaleString("en-IN")}`}
          contentStyle={{
            borderRadius: "12px",
            border: "none",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        />
        <Legend iconType="circle" iconSize={10} />
      </PieChart>
    </ResponsiveContainer>
  );
}
