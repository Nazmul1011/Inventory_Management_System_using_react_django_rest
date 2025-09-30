import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
// TODO: when backend is ready
// import { getCustomers } from "../../services/customer";

function PaymentBadge({ status }) {
  const paid = String(status).toLowerCase() === "paid";
  const cls = paid
    ? "bg-emerald-50 text-emerald-700"
    : "bg-rose-50 text-rose-700";
  const label = paid ? "Paid" : "Unpaid";
  return (
    <span className={`inline-flex items-center rounded px-2 py-1 text-xs font-medium ${cls}`}>
      {label}
    </span>
  );
}

function ActiveBadge({ active }) {
  return active ? (
    <span className="inline-flex items-center rounded border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
      Active
    </span>
  ) : (
    <span className="inline-flex items-center rounded border border-gray-200 bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600">
      Inactive
    </span>
  );
}

export default function CustomerList() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [query, setQuery] = useState("");
  const [filterPaid, setFilterPaid] = useState("All");
  const [filterActive, setFilterActive] = useState("All");

  const [customers, setCustomers] = useState([
    { id: 2001, name: "Alice Johnson", mobile: "555-0123", email: "alice@example.com", due: 0, paymentStatus: "Paid", active: true },
    { id: 2002, name: "Brian Kim", mobile: "555-0456", email: "brian@example.com", due: 120.5, paymentStatus: "Unpaid", active: true },
    { id: 2003, name: "Carla Mendes", mobile: "555-0789", email: "carla@example.com", due: 45, paymentStatus: "Unpaid", active: false },
    { id: 2004, name: "Deepak Rao", mobile: "555-1011", email: "deepak@example.com", due: 0, paymentStatus: "Paid", active: true },
  ]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        // TODO: fetch customers from backend
        // const data = await getCustomers();
        // if (mounted) setCustomers(data.items);
      } catch (e) {
        if (mounted) setErr("Failed to load customers.");
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return customers.filter((c) => {
      const matchesQ =
        q === "" ||
        String(c.id).includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.mobile.toLowerCase().includes(q) ||
        (c.email ?? "").toLowerCase().includes(q);

      const matchesPaid =
        filterPaid === "All" ||
        String(c.paymentStatus).toLowerCase() === filterPaid.toLowerCase();

      const matchesActive =
        filterActive === "All" ||
        (filterActive === "Active" ? c.active : !c.active);

      return matchesQ && matchesPaid && matchesActive;
    });
  }, [customers, query, filterPaid, filterActive]);

  const totalDue = useMemo(
    () => filtered.reduce((sum, c) => sum + Number(c.due || 0), 0),
    [filtered]
  );

  return (
    <div>
      {/* header */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Customers</h2>
        
        {/* Add Customer Button */}
        <Link
          to="/dashboard/customeradd"
          className="inline-flex items-center justify-center rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Add Customer
        </Link>
      </div>

      {/* actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* search */}
        <div className="relative w-full sm:max-w-md">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, mobile, email, or ID…"
            className="w-full rounded-md border border-gray-200 bg-gray-100 pl-9 pr-3 py-2 text-sm outline-none placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
          <svg className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none">
            <path d="M21 21l-4.3-4.3M10 18a8 8 0 100-16 8 8 0 000 16z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>

        {/* filters */}
        <div className="flex gap-2">
          <select
            value={filterPaid}
            onChange={(e) => setFilterPaid(e.target.value)}
            className="rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          >
            {["All", "Paid", "Unpaid"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            value={filterActive}
            onChange={(e) => setFilterActive(e.target.value)}
            className="rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          >
            {["All", "Active", "Inactive"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* feedback */}
      {loading && (
        <div className="mt-4 rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-700 animate-pulse">
          Loading customers…
        </div>
      )}
      {err && (
        <div className="mt-4 rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {err}
        </div>
      )}

      {/* totals */}
      <div className="mt-4 text-sm text-gray-600">
        Showing <span className="font-medium">{filtered.length}</span> customers.{" "}
        Total Due: <span className="font-semibold text-gray-900">${totalDue.toFixed(2)}</span>
      </div>

      {/* MOBILE view (cards) */}
      <div className="mt-3 grid gap-3 md:hidden">
        {filtered.map((c) => (
          <div key={c.id} className="rounded-lg border bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm text-gray-500">#{c.id}</div>
                <div className="text-base font-semibold text-gray-900">{c.name}</div>
                <div className="text-sm text-gray-800">{c.mobile}</div>
                <div className="text-xs text-gray-500">{c.email}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-700">Due</div>
                <div className="text-base font-semibold text-gray-900">
                  ${Number(c.due || 0).toFixed(2)}
                </div>
                <div className="mt-1"><PaymentBadge status={c.paymentStatus} /></div>
                <div className="mt-1"><ActiveBadge active={c.active} /></div>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && !loading && (
          <div className="rounded-lg border bg-white p-6 text-center text-gray-500">
            No customers found.
          </div>
        )}
      </div>

      {/* DESKTOP view (table) */}
      <div className="mt-3 overflow-x-auto rounded-lg border bg-white hidden md:block">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 font-medium">Customer ID</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Mobile</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Due</th>
              <th className="px-4 py-3 font-medium">Payment</th>
              <th className="px-4 py-3 font-medium">Active</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-700">{c.id}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{c.name}</td>
                <td className="px-4 py-3 text-gray-900">{c.mobile}</td>
                <td className="px-4 py-3 text-gray-700">{c.email}</td>
                <td className="px-4 py-3 text-gray-900">${Number(c.due || 0).toFixed(2)}</td>
                <td className="px-4 py-3"><PaymentBadge status={c.paymentStatus} /></td>
                <td className="px-4 py-3"><ActiveBadge active={c.active} /></td>
              </tr>
            ))}
            {filtered.length === 0 && !loading && (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={7}>
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
