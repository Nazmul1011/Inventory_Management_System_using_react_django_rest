// import { useEffect, useState } from "react";
// // TODO: when backend is ready, create these in src/services/dashboard.js and import them
// // import { getDashboardSummary, getSalesByDay, getTopProducts } from "../../services/dashboard";

// function StatCard({ title, value, delta, positive = true }) {
//   return (
//     <div className="rounded-lg bg-white shadow p-4">
//       <div className="text-sm text-gray-500">{title}</div>
//       <div className="mt-1 text-xl font-bold text-gray-900">{value}</div>
//       {delta && (
//         <div className={`mt-1 text-xs ${positive ? "text-emerald-600" : "text-rose-600"}`}>
//           {positive ? "▴" : "▾"} {delta}
//         </div>
//       )}
//     </div>
//   );
// }

// function MiniBars({ data }) {
//   const max = Math.max(1, ...data.map(d => d.value));
//   return (
//     <div className="rounded-lg bg-white shadow p-6">
//       <h3 className="mb-4 text-sm font-semibold text-gray-700">
//         Sales by Day (Last 30 Days)
//       </h3>
//       <div className="h-40 flex items-end gap-3 overflow-x-auto pb-2">
//         {data.map(d => (
//           <div key={d.day} className="flex flex-col items-center gap-2">
//             <div
//               className="w-6 rounded-t bg-indigo-500"
//               style={{ height: `${Math.max(8, (d.value / max) * 120)}px` }}
//               title={`Day ${d.day}: ${d.value}`}
//             />
//             <span className="text-[10px] text-gray-500">{d.day}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function HBarList({ items }) {
//   const max = Math.max(1, ...items.map(i => i.value));
//   return (
//     <div className="rounded-lg bg-white shadow p-6">
//       <h3 className="mb-4 text-sm font-semibold text-gray-700">Top 5 Products Sold</h3>
//       <div className="space-y-3">
//         {items.map(i => (
//           <div key={i.label}>
//             <div className="mb-1 text-[13px] font-medium text-gray-700">{i.label}</div>
//             <div className="h-2.5 w-full rounded bg-gray-100">
//               <div
//                 className="h-2.5 rounded bg-indigo-500"
//                 style={{ width: `${(i.value / max) * 100}%` }}
//                 title={`${i.label}: ${i.value}`}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default function Dashboard() {
//   // ---- DUMMY DEFAULTS (so UI isn’t empty) ----
//   const [summary, setSummary] = useState({
//     totalStockValue: 250000,
//     todaySales: 5000,
//     monthSales: 75000,
//     lowStockCount: 15,
//     deltas: { total: "+10%", today: "+5%", month: "+12%", low: "-3%" },
//   });

//   const [salesByDay, setSalesByDay] = useState(
//     // days 1..30 with some fake values
//     Array.from({ length: 7 }).map((_, i) => ({ day: (i + 1) * 5, value: 1000 + i * 300 }))
//   );

//   const [topProducts, setTopProducts] = useState([
//     { label: "Product A", value: 30 },
//     { label: "Product B", value: 85 },
//     { label: "Product C", value: 22 },
//     { label: "Product D", value: 28 },
//     { label: "Product E", value: 95 },
//   ]);

//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState(null);

//   useEffect(() => {
//     let mounted = true;
//     (async () => {
//       setLoading(true);
//       setErr(null);
//       try {
//         // ------------------------------------------------------------
//         // TODO: UNCOMMENT WHEN BACKEND IS READY
//         // const s = await getDashboardSummary(); // {totalStockValue, todaySales, monthSales, lowStockCount, deltas}
//         // const d = await getSalesByDay({ lastDays: 30 }); // [{day, value}, ...]
//         // const t = await getTopProducts({ limit: 5 });   // [{label, value}, ...]
//         // if (!mounted) return;
//         // setSummary(s);
//         // setSalesByDay(d);
//         // setTopProducts(t);
//         // ------------------------------------------------------------
//       } catch (e) {
//         if (mounted) setErr("Failed to load dashboard data.");
//         console.error(e);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     })();
//     return () => { mounted = false; };
//   }, []);

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h2>

//       {/* Loading / Error states */}
//       {loading && (
//         <div className="mt-4 rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-700 animate-pulse">
//           Loading dashboard…
//         </div>
//       )}
//       {err && (
//         <div className="mt-4 rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">
//           {err}
//         </div>
//       )}

//       {/* Stats (driven by state) */}
//       <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//         <StatCard
//           title="Total Stock Value"
//           value={`$${summary.totalStockValue.toLocaleString()}`}
//           delta={summary.deltas?.total}
//           positive
//         />
//         <StatCard
//           title="Today’s Sales"
//           value={`$${summary.todaySales.toLocaleString()}`}
//           delta={summary.deltas?.today}
//           positive
//         />
//         <StatCard
//           title="This Month’s Sales"
//           value={`$${summary.monthSales.toLocaleString()}`}
//           delta={summary.deltas?.month}
//           positive
//         />
//         <StatCard
//           title="Low Stock Count"
//           value={summary.lowStockCount}
//           delta={summary.deltas?.low}
//           positive={false}
//         />
//       </div>

//       {/* Charts (driven by state) */}
//       <div className="mt-6 grid gap-6 lg:grid-cols-2">
//         <MiniBars data={salesByDay} />
//         <HBarList items={topProducts} />
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import {
  FiPackage,
  FiDollarSign,
  FiTruck,
  FiAlertTriangle,
} from "react-icons/fi";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import StatCard from "../../components/Statcard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [stats] = useState([
    {
      title: "Total Products",
      value: "1,250",
      change: "+8%",
      icon: <FiPackage />,
    },
    {
      title: "Total Stock Value",
      value: "$250,000",
      change: "+10%",
      icon: <FiDollarSign />,
    },
    {
      title: "Total Suppliers",
      value: "35",
      change: "+3%",
      icon: <FiTruck />,
    },
    {
      title: "Low-Stock Items",
      value: "15",
      change: "-3%",
      icon: <FiAlertTriangle />,
    },
  ]);

  // Chart Data
  const stockValueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Stock Value",
        data: [220000, 245000, 230000, 250000, 260000, 275000],
        backgroundColor: [
          "#5347CE",
          "#4896FE",
          "#16C8C7",
          "#887CFD",
          "#4896FE",
          "#5347CE",
        ],
        borderRadius: 6,
      },
    ],
  };

  const salesTrendData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Sales (USD)",
        data: [4200, 3800, 4500, 4000, 4700, 5200, 4900],
        borderColor: "#4896FE",
        backgroundColor: "#4896FE",
        tension: 0.3,
        fill: false,
      },
    ],
  };

  const categoryDistributionData = {
    labels: ["Electronics", "Grocery", "Clothing", "Stationery", "Appliances"],
    datasets: [
      {
        data: [35, 25, 15, 10, 15],
        backgroundColor: [
          "#5347CE",
          "#4896FE",
          "#16C8C7",
          "#887CFD",
          "#A2D9CE",
        ],
        borderWidth: 0,
      },
    ],
  };

  const topProducts = [
    {
      name: "Product A",
      category: "Electronics",
      sold: 350,
      revenue: "$12,000",
    },
    {
      name: "Product B",
      category: "Grocery",
      sold: 290,
      revenue: "$8,500",
    },
    {
      name: "Product C",
      category: "Stationery",
      sold: 180,
      revenue: "$4,300",
    },
    {
      name: "Product D",
      category: "Clothing",
      sold: 160,
      revenue: "$3,900",
    },
    {
      name: "Product E",
      category: "Electronics",
      sold: 120,
      revenue: "$3,200",
    },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-900 text-center md:text-left">
        Inventory Dashboard
      </h2>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-700 font-medium mb-4">
            Stock Value by Month
          </h3>
          <Bar
            data={stockValueData}
            options={{
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true } },
            }}
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-700 font-medium mb-4">
            Sales Trend (Last 7 Days)
          </h3>
          <Line
            data={salesTrendData}
            options={{
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true } },
            }}
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-700 font-medium mb-4">
            Product Category Distribution
          </h3>
          <div className="w-56 mx-auto">
            <Doughnut
              data={categoryDistributionData}
              options={{
                plugins: { legend: { position: "bottom" } },
              }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-700 font-medium">Top 5 Products Sold</h3>
            <button className="text-sm text-indigo-600 hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {topProducts.map((p) => (
              <div
                key={p.name}
                className="flex items-center justify-between border-b pb-3 last:border-none"
              >
                <div>
                  <div className="font-medium text-gray-800">{p.name}</div>
                  <div className="text-xs text-gray-500">{p.category}</div>
                </div>
                <div className="text-sm text-gray-500 w-20 text-center">
                  {p.sold} sold
                </div>
                <div className="font-semibold text-gray-800">{p.revenue}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

