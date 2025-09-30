import { useState } from "react";
import { useNavigate } from "react-router-dom";
// TODO: import { addSupplier } from "../../../services/supplier";

export default function AddSupplier() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    company: "",
    mobile: "",
    email: "",
    address: "",
    active: true,
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      // ----------------------------------------------------
      // TODO: call backend
      // await addSupplier(form);
      // ----------------------------------------------------
      console.log("Supplier added (demo):", form);
      navigate("/dashboard/suppliers");
    } catch (error) {
      console.error(error);
      setErr("Failed to add supplier");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="text-xl font-semibold text-gray-900">Add Supplier</h2>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
            required
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Company */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Company</label>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={onChange}
            required
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Mobile</label>
          <input
            type="text"
            name="mobile"
            value={form.mobile}
            onChange={onChange}
            required
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Address */}
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={onChange}
            rows="3"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          ></textarea>
        </div>

        {/* Active */}
        <div className="sm:col-span-2 flex items-center gap-2">
          <input
            type="checkbox"
            id="active"
            name="active"
            checked={form.active}
            onChange={onChange}
            className="h-4 w-4 rounded border-gray-300"
          />
          <label htmlFor="active" className="text-sm text-gray-700">Active Supplier</label>
        </div>

        {/* Submit */}
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Adding…" : "Add Supplier"}
          </button>
        </div>
      </form>

      {err && <div className="mt-4 rounded bg-rose-50 px-3 py-2 text-sm text-rose-600">{err}</div>}
    </div>
  );
}
