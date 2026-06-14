export default function InsightCard({ insight, topCategory }) {
  if (!insight) return null;
  return (
    <div className="rounded-2xl border border-violet-200 bg-violet-50 p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-1">
        Smart Insight
      </p>
      <p className="text-gray-700 font-medium">{insight}</p>
      {topCategory && (
        <p className="mt-2 text-sm text-violet-500">
          🏷️ Top spending category:{" "}
          <span className="font-bold">{topCategory}</span>
        </p>
      )}
    </div>
  );
}
