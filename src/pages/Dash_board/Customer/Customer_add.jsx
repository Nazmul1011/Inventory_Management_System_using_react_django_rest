import { useState } from "react";
import { useNavigate } from "react-router-dom";
// TODO: when backend is ready
// import { addCustomer } from "../../services/customer";

export default function CustomerAdd() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: "",                // Customer ID
    name: "",
    mobile: "",
    email: "",
    due: "0",
    paymentStatus: "Paid", // Paid | Unpaid
    active: true,          // Active toggle
  });

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);

    const payload = {
      ...form,
      id: String(form.id).trim(),
      due: Number(form.due || 0),
      paymentStatus: form.paymentStatus, // "Paid" | "Unpaid"
      active: Boolean(form.active),
    };

    try {
      // ------------------------------------------------------------
      // TODO: call backend API to create customer
      // await addCustomer(payload);
      // ------------------------------------------------------------
      console.log("Customer added:", payload);

      // Redirect to the customer list page (adjust path if yours is different)
      navigate("/dashboard/customers");
    } catch (error) {
      console.error(error);
      setErr(error?.response?.data?.message || "Failed to add customer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="text-xl font-semibold text-gray-900">Add New Customer</h2>

      {/* two-column on large screens; single column on mobile */}
      <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* ID */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Customer ID
          </label>
          <input
            name="id"
            value={form.id}
            onChange={onChange}
            required
            placeholder="e.g. 2005"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Name */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            required
            placeholder="Full name"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Mobile
          </label>
          <input
            name="mobile"
            value={form.mobile}
            onChange={onChange}
            required
            placeholder="e.g. 555-0123"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="name@example.com"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Due */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Due Amount ($)
          </label>
          <input
            type="number"
            step="0.01"
            name="due"
            value={form.due}
            onChange={onChange}
            required
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Payment Status */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Payment Status
          </label>
          <select
            name="paymentStatus"
            value={form.paymentStatus}
            onChange={onChange}
            className="w-full rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          >
            <option>Paid</option>
            <option>Unpaid</option>
          </select>
        </div>

        {/* Active toggle */}
        <div className="flex items-center gap-3">
          <input
            id="active"
            type="checkbox"
            name="active"
            checked={form.active}
            onChange={onChange}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="active" className="text-sm font-medium text-gray-700">
            Active
          </label>
        </div>

        {/* Submit (full width) */}
        <div className="lg:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Adding…" : "Add Customer"}
          </button>
        </div>
      </form>

      {err && (
        <div className="mt-4 rounded bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {err}
        </div>
      )}
    </div>
  );
}
