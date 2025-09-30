import { useEffect, useState } from "react";
// TODO: when backend is ready, create these in src/services/dashboard.js and import them
// import { getDashboardSummary, getSalesByDay, getTopProducts } from "../../services/dashboard";

function StatCard({ title, value, delta, positive = true }) {
  return (
    <div className="rounded-lg bg-white shadow p-4">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-1 text-xl font-bold text-gray-900">{value}</div>
      {delta && (
        <div className={`mt-1 text-xs ${positive ? "text-emerald-600" : "text-rose-600"}`}>
          {positive ? "▴" : "▾"} {delta}
        </div>
      )}
    </div>
  );
}

function MiniBars({ data }) {
  const max = Math.max(1, ...data.map(d => d.value));
  return (
    <div className="rounded-lg bg-white shadow p-6">
      <h3 className="mb-4 text-sm font-semibold text-gray-700">
        Sales by Day (Last 30 Days)
      </h3>
      <div className="h-40 flex items-end gap-3 overflow-x-auto pb-2">
        {data.map(d => (
          <div key={d.day} className="flex flex-col items-center gap-2">
            <div
              className="w-6 rounded-t bg-indigo-500"
              style={{ height: `${Math.max(8, (d.value / max) * 120)}px` }}
              title={`Day ${d.day}: ${d.value}`}
            />
            <span className="text-[10px] text-gray-500">{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HBarList({ items }) {
  const max = Math.max(1, ...items.map(i => i.value));
  return (
    <div className="rounded-lg bg-white shadow p-6">
      <h3 className="mb-4 text-sm font-semibold text-gray-700">Top 5 Products Sold</h3>
      <div className="space-y-3">
        {items.map(i => (
          <div key={i.label}>
            <div className="mb-1 text-[13px] font-medium text-gray-700">{i.label}</div>
            <div className="h-2.5 w-full rounded bg-gray-100">
              <div
                className="h-2.5 rounded bg-indigo-500"
                style={{ width: `${(i.value / max) * 100}%` }}
                title={`${i.label}: ${i.value}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  // ---- DUMMY DEFAULTS (so UI isn’t empty) ----
  const [summary, setSummary] = useState({
    totalStockValue: 250000,
    todaySales: 5000,
    monthSales: 75000,
    lowStockCount: 15,
    deltas: { total: "+10%", today: "+5%", month: "+12%", low: "-3%" },
  });

  const [salesByDay, setSalesByDay] = useState(
    // days 1..30 with some fake values
    Array.from({ length: 7 }).map((_, i) => ({ day: (i + 1) * 5, value: 1000 + i * 300 }))
  );

  const [topProducts, setTopProducts] = useState([
    { label: "Product A", value: 30 },
    { label: "Product B", value: 85 },
    { label: "Product C", value: 22 },
    { label: "Product D", value: 28 },
    { label: "Product E", value: 95 },
  ]);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        // ------------------------------------------------------------
        // TODO: UNCOMMENT WHEN BACKEND IS READY
        // const s = await getDashboardSummary(); // {totalStockValue, todaySales, monthSales, lowStockCount, deltas}
        // const d = await getSalesByDay({ lastDays: 30 }); // [{day, value}, ...]
        // const t = await getTopProducts({ limit: 5 });   // [{label, value}, ...]
        // if (!mounted) return;
        // setSummary(s);
        // setSalesByDay(d);
        // setTopProducts(t);
        // ------------------------------------------------------------
      } catch (e) {
        if (mounted) setErr("Failed to load dashboard data.");
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h2>

      {/* Loading / Error states */}
      {loading && (
        <div className="mt-4 rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-700 animate-pulse">
          Loading dashboard…
        </div>
      )}
      {err && (
        <div className="mt-4 rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {err}
        </div>
      )}

      {/* Stats (driven by state) */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Stock Value"
          value={`$${summary.totalStockValue.toLocaleString()}`}
          delta={summary.deltas?.total}
          positive
        />
        <StatCard
          title="Today’s Sales"
          value={`$${summary.todaySales.toLocaleString()}`}
          delta={summary.deltas?.today}
          positive
        />
        <StatCard
          title="This Month’s Sales"
          value={`$${summary.monthSales.toLocaleString()}`}
          delta={summary.deltas?.month}
          positive
        />
        <StatCard
          title="Low Stock Count"
          value={summary.lowStockCount}
          delta={summary.deltas?.low}
          positive={false}
        />
      </div>

      {/* Charts (driven by state) */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <MiniBars data={salesByDay} />
        <HBarList items={topProducts} />
      </div>
    </div>
  );
}
