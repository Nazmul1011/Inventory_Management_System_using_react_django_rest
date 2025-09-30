import { useEffect, useMemo, useState } from "react";
// TODO: plug your API later
// import { getStockReport } from "../../../services/reports";

function StatusBadge({ stock, reorder }) {
  let label = "In Stock", cls = "bg-emerald-50 text-emerald-700";
  if (stock <= 0) { label = "Out of Stock"; cls = "bg-rose-50 text-rose-700"; }
  else if (stock <= reorder) { label = "Low Stock"; cls = "bg-amber-50 text-amber-700"; }
  return <span className={`inline-flex items-center rounded px-2 py-1 text-xs font-medium ${cls}`}>{label}</span>;
}

export default function StockReport() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");

  const [rows, setRows] = useState([
    // ---- DUMMY DATA (replace with API) ----
    { id: 1001, name: "Organic Gala Apples", sku: "APL-GALA", category: "Produce", unit: "kg", purchasePrice: 2.2, sellPrice: 3.5, reorder: 50, stock: 120 },
    { id: 1002, name: "Whole Wheat Bread", sku: "BRD-WW", category: "Bakery", unit: "loaf", purchasePrice: 1.5, sellPrice: 2.5, reorder: 25, stock: 15 },
    { id: 1003, name: "Cheddar Cheese", sku: "CHS-CHED", category: "Dairy", unit: "kg", purchasePrice: 6.5, sellPrice: 9.0, reorder: 30, stock: 80 },
    { id: 1007, name: "Olive Oil", sku: "PNT-OIL-OLV", category: "Pantry", unit: "ltr", purchasePrice: 5.0, sellPrice: 8.5, reorder: 25, stock: 10 },
  ]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  // categories from data
  const categories = useMemo(() => ["All", ...Array.from(new Set(rows.map(r => r.category)))], [rows]);

  useEffect(() => {
    // ------------------------------------------------------------
    // setLoading(true);
    // getStockReport({ q, category }).then(data => setRows(data.items)).catch(()=>setErr("Failed to load")).finally(()=>setLoading(false));
    // ------------------------------------------------------------
  }, []); // eslint-disable-line

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return rows.filter(r => {
      const inQ = !qq || r.name.toLowerCase().includes(qq) || r.sku.toLowerCase().includes(qq) || String(r.id).includes(qq);
      const inCat = category === "All" || r.category === category;
      return inQ && inCat;
    });
  }, [rows, q, category]);

  const totals = useMemo(() => {
    const stockValuePurchase = filtered.reduce((s,r)=>s + r.purchasePrice * r.stock, 0);
    const stockValueRetail = filtered.reduce((s,r)=>s + r.sellPrice * r.stock, 0);
    const lowCount = filtered.filter(r => r.stock <= r.reorder && r.stock > 0).length;
    const oosCount = filtered.filter(r => r.stock <= 0).length;
    return { stockValuePurchase, stockValueRetail, lowCount, oosCount };
  }, [filtered]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Stock Report</h2>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <input
            value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search by name, SKU, or ID…"
            className="w-full rounded-md border border-gray-200 bg-gray-100 pl-9 pr-3 py-2 text-sm outline-none placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
          <svg className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none">
            <path d="M21 21l-4.3-4.3M10 18a8 8 0 100-16 8 8 0 000 16z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <select
            value={category} onChange={(e)=>setCategory(e.target.value)}
            className="rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Stat cards */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded bg-white p-4 shadow">
          <div className="text-sm text-gray-500">Stock Value (Cost)</div>
          <div className="text-xl font-bold">${totals.stockValuePurchase.toFixed(2)}</div>
        </div>
        <div className="rounded bg-white p-4 shadow">
          <div className="text-sm text-gray-500">Stock Value (Retail)</div>
          <div className="text-xl font-bold">${totals.stockValueRetail.toFixed(2)}</div>
        </div>
        <div className="rounded bg-white p-4 shadow">
          <div className="text-sm text-gray-500">Low Stock Items</div>
          <div className="text-xl font-bold">{totals.lowCount}</div>
        </div>
        <div className="rounded bg-white p-4 shadow">
          <div className="text-sm text-gray-500">Out of Stock</div>
          <div className="text-xl font-bold">{totals.oosCount}</div>
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-x-auto rounded border bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 font-medium">Product ID</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">SKU</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Unit</th>
              <th className="px-4 py-3 font-medium">Purchase Price</th>
              <th className="px-4 py-3 font-medium">Sell Price</th>
              <th className="px-4 py-3 font-medium">Reorder</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map(r => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-700">{r.id}</td>
                <td className="px-4 py-3 text-gray-900 font-medium">{r.name}</td>
                <td className="px-4 py-3 text-gray-700">{r.sku}</td>
                <td className="px-4 py-3 text-gray-700">{r.category}</td>
                <td className="px-4 py-3 text-gray-700">{r.unit}</td>
                <td className="px-4 py-3 text-gray-700">${r.purchasePrice.toFixed(2)}</td>
                <td className="px-4 py-3 text-gray-700">${r.sellPrice.toFixed(2)}</td>
                <td className="px-4 py-3 text-gray-700">{r.reorder}</td>
                <td className="px-4 py-3 text-gray-700">{r.stock}</td>
                <td className="px-4 py-3"><StatusBadge stock={r.stock} reorder={r.reorder} /></td>
              </tr>
            ))}
            {filtered.length === 0 && !loading && (
              <tr><td className="px-4 py-6 text-center text-gray-500" colSpan={10}>No data.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {loading && <div className="mt-3 text-sm text-gray-600">Loading…</div>}
      {err && <div className="mt-3 text-sm text-rose-600">{err}</div>}
    </div>
  );
}
