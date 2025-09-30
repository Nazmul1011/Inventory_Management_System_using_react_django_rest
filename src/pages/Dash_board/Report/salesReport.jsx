import { useEffect, useMemo, useState } from "react";
// TODO: plug your API later
// import { getSalesReport, exportSalesCSV } from "../../../services/reports";

function toCSV(rows) {
  const header = [
    "Date","Invoice","Customer","Items","Subtotal","Discount","VAT","Total"
  ];
  const body = rows.map(r => [
    r.date, r.invoice, r.customer, r.items, r.subtotal, r.discount, r.vat, r.total
  ]);
  return [header, ...body].map(r => r.join(",")).join("\n");
}

export default function SalesReport() {
  // filters
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [q, setQ] = useState("");

  const [rows, setRows] = useState([
    // ---- DUMMY DATA (replace with API) ----
    { date: "2025-09-27", invoice: "INV-10021", customer: "Alice Johnson", items: 3, subtotal: 60, discount: 5, vat: 4, total: 59 },
    { date: "2025-09-28", invoice: "INV-10022", customer: "Brian Kim",     items: 2, subtotal: 40, discount: 0, vat: 4, total: 44 },
    { date: "2025-09-29", invoice: "INV-10023", customer: "Walk-in",       items: 1, subtotal: 25, discount: 2, vat: 0, total: 23 },
    { date: "2025-09-29", invoice: "INV-10024", customer: "Carla Mendes",  items: 5, subtotal: 120, discount: 10, vat: 8, total: 118 },
  ]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    // On mount or when filters change, fetch (if server-side filtering)
    // For now we keep dummy data.
    // ------------------------------------------------------------
    // setLoading(true);
    // getSalesReport({ from, to, q }).then(data => setRows(data.items)).catch(() => setErr("Failed to load")).finally(()=>setLoading(false));
    // ------------------------------------------------------------
  }, []); // eslint-disable-line

  const filtered = useMemo(() => {
    const f = (r) => {
      const inFrom = !from || r.date >= from;
      const inTo = !to || r.date <= to;
      const qq = q.trim().toLowerCase();
      const inQ = !qq || r.invoice.toLowerCase().includes(qq) || r.customer.toLowerCase().includes(qq);
      return inFrom && inTo && inQ;
    };
    return rows.filter(f);
  }, [rows, from, to, q]);

  const totals = useMemo(() => {
    const sum = (k) => filtered.reduce((s,r)=>s+Number(r[k]||0),0);
    return {
      invoices: filtered.length,
      items: filtered.reduce((s,r)=>s+Number(r.items||0),0),
      subtotal: sum("subtotal"),
      discount: sum("discount"),
      vat: sum("vat"),
      total: sum("total"),
    };
  }, [filtered]);

  const onExport = () => {
    // TODO: use your backend export if available
    const csv = toCSV(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `sales_${from || "all"}_${to || "all"}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Sales Report</h2>
        <button onClick={onExport} className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="grid gap-3 sm:grid-cols-4">
        <div className="sm:col-span-1">
          <label className="text-sm text-gray-700">From</label>
          <input type="date" value={from} onChange={e=>setFrom(e.target.value)}
                 className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"/>
        </div>
        <div className="sm:col-span-1">
          <label className="text-sm text-gray-700">To</label>
          <input type="date" value={to} onChange={e=>setTo(e.target.value)}
                 className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"/>
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm text-gray-700">Search</label>
          <input placeholder="Invoice or customer…" value={q} onChange={e=>setQ(e.target.value)}
                 className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"/>
        </div>
      </div>

      {/* Stat cards */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded bg-white p-4 shadow"><div className="text-sm text-gray-500">Invoices</div><div className="text-xl font-bold">{totals.invoices}</div></div>
        <div className="rounded bg-white p-4 shadow"><div className="text-sm text-gray-500">Items Sold</div><div className="text-xl font-bold">{totals.items}</div></div>
        <div className="rounded bg-white p-4 shadow"><div className="text-sm text-gray-500">Revenue</div><div className="text-xl font-bold">${totals.total.toFixed(2)}</div></div>
        <div className="rounded bg-white p-4 shadow"><div className="text-sm text-gray-500">Discounts</div><div className="text-xl font-bold">${totals.discount.toFixed(2)}</div></div>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-x-auto rounded border bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Invoice</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Items</th>
              <th className="px-4 py-3 font-medium">Subtotal</th>
              <th className="px-4 py-3 font-medium">Discount</th>
              <th className="px-4 py-3 font-medium">VAT</th>
              <th className="px-4 py-3 font-medium">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((r) => (
              <tr key={r.invoice} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-700">{r.date}</td>
                <td className="px-4 py-3 text-blue-600">{r.invoice}</td>
                <td className="px-4 py-3 text-gray-900 font-medium">{r.customer}</td>
                <td className="px-4 py-3 text-gray-700">{r.items}</td>
                <td className="px-4 py-3 text-gray-700">${r.subtotal.toFixed(2)}</td>
                <td className="px-4 py-3 text-gray-700">-${r.discount.toFixed(2)}</td>
                <td className="px-4 py-3 text-gray-700">${r.vat.toFixed(2)}</td>
                <td className="px-4 py-3 text-gray-900 font-semibold">${r.total.toFixed(2)}</td>
              </tr>
            ))}
            {filtered.length === 0 && !loading && (
              <tr><td className="px-4 py-6 text-center text-gray-500" colSpan={8}>No data.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {loading && <div className="mt-3 text-sm text-gray-600">Loading…</div>}
      {err && <div className="mt-3 text-sm text-rose-600">{err}</div>}
    </div>
  );
}
