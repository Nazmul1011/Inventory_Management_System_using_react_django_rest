import { useEffect, useMemo, useState } from "react";
// TODO: import { getSuppliers } from "../../../services/supplier";

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

export default function SupplierList() {
  const [query, setQuery] = useState("");
  const [suppliers, setSuppliers] = useState([
    // ---- DUMMY DATA ----
    { id: 5001, name: "John Supplies", company: "Global Traders", mobile: "555-1234", email: "john@supplies.com", address: "123 Road, City", active: true },
    { id: 5002, name: "Sarah Lee", company: "Fresh Foods Ltd.", mobile: "555-5678", email: "sarah@freshfoods.com", address: "456 Street, City", active: false },
    { id: 5003, name: "Mark Tailor", company: "Tailor Tools", mobile: "555-9999", email: "mark@tailortools.com", address: "789 Avenue, City", active: true },
  ]);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    // ----------------------------------------------------
    // setLoading(true);
    // getSuppliers({ q: query }).then(data => setSuppliers(data.items)).catch(()=>setErr("Failed to load")).finally(()=>setLoading(false));
    // ----------------------------------------------------
  }, []); // eslint-disable-line

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return suppliers.filter(
      (s) =>
        q === "" ||
        String(s.id).includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.company.toLowerCase().includes(q) ||
        s.mobile.includes(q)
    );
  }, [suppliers, query]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Suppliers</h2>
      </div>

      {/* Search */}
      <div className="mb-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search suppliers by name, company, or mobile…"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* ---------- MOBILE (cards) ---------- */}
      <div className="mt-3 grid gap-3 md:hidden">
        {filtered.map((s) => (
          <div key={s.id} className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="font-semibold text-gray-900">{s.name}</div>
            <div className="text-sm text-gray-700">{s.company}</div>
            <div className="text-sm text-gray-700">{s.mobile}</div>
            <div className="text-xs text-gray-500">{s.email}</div>
            <div className="text-xs text-gray-500">{s.address}</div>
            <div className="mt-2"><ActiveBadge active={s.active} /></div>
          </div>
        ))}
        {filtered.length === 0 && !loading && (
          <div className="rounded-lg border bg-white p-6 text-center text-gray-500">No suppliers found.</div>
        )}
      </div>

      {/* ---------- DESKTOP (table) ---------- */}
      <div className="mt-3 overflow-x-auto rounded-lg border bg-white hidden md:block">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Company</th>
              <th className="px-4 py-3 font-medium">Mobile</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Address</th>
              <th className="px-4 py-3 font-medium">Active</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-700">{s.id}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{s.name}</td>
                <td className="px-4 py-3 text-gray-700">{s.company}</td>
                <td className="px-4 py-3 text-gray-700">{s.mobile}</td>
                <td className="px-4 py-3 text-gray-700">{s.email}</td>
                <td className="px-4 py-3 text-gray-700">{s.address}</td>
                <td className="px-4 py-3"><ActiveBadge active={s.active} /></td>
              </tr>
            ))}
            {filtered.length === 0 && !loading && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                  No suppliers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {loading && <div className="mt-4 text-sm text-gray-600">Loading suppliers…</div>}
      {err && <div className="mt-4 text-sm text-rose-600">{err}</div>}
    </div>
  );
}
