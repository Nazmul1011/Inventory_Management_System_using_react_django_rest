import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiPhone, FiMail, FiCreditCard } from "react-icons/fi";

export default function CustomerAdd() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: "",
    name: "",
    mobile: "",
    email: "",
    due: "0",
    paymentStatus: "Paid",
    active: true,
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
      due: Number(form.due || 0),
      paymentStatus: form.paymentStatus,
      active: Boolean(form.active),
    };

    try {
      console.log("Customer added:", payload);
      navigate("/dashboard/customerlist");
    } catch (error) {
      console.error(error);
      setErr("Failed to add customer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-8 transition-all duration-300 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <FiUser size={22} />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Add New Customer
        </h2>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="grid gap-5">
          <InputField
            label="Customer ID"
            name="id"
            value={form.id}
            onChange={onChange}
            placeholder="e.g. 2005"
            required
          />

          <InputField
            label="Full Name"
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="John Doe"
            icon={<FiUser size={16} />}
            required
          />

          <InputField
            label="Mobile"
            name="mobile"
            value={form.mobile}
            onChange={onChange}
            placeholder="e.g. 555-0123"
            icon={<FiPhone size={16} />}
            required
          />

          <InputField
            type="email"
            label="Email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="name@example.com"
            icon={<FiMail size={16} />}
          />

          <InputField
            type="number"
            step="0.01"
            label="Due Amount ($)"
            name="due"
            value={form.due}
            onChange={onChange}
            icon={<FiCreditCard size={16} />}
            required
          />

          <SelectField
            label="Payment Status"
            name="paymentStatus"
            value={form.paymentStatus}
            onChange={onChange}
            options={["Paid", "Unpaid"]}
          />

          {/* Active toggle */}
          <div className="flex items-center gap-3 mt-2">
            <input
              id="active"
              type="checkbox"
              name="active"
              checked={form.active}
              onChange={onChange}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="active" className="text-sm font-medium text-gray-700">
              Active Customer
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-indigo-600 text-white text-sm font-medium py-2.5 hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {loading ? "Adding…" : "Add Customer"}
          </button>

          {err && (
            <div className="mt-2 rounded bg-red-50 px-3 py-2 text-sm text-red-600">
              {err}
            </div>
          )}
        </div>

        {/* Right: Info Box */}
        <div className="hidden lg:flex flex-col items-center justify-center border-l pl-8 text-gray-600">
          <FiUser size={30} className="text-indigo-400 mb-3" />
          <h3 className="font-semibold text-lg mb-2">Customer Guidelines</h3>
          <ul className="text-sm list-disc list-inside space-y-1 text-gray-500">
            <li>Customer ID must be unique</li>
            <li>Enter valid phone or email</li>
            <li>Set payment status correctly</li>
            <li>Toggle “Active” if currently valid</li>
          </ul>
        </div>
      </form>
    </div>
  );
}

/* ---------- Reusable Fields ---------- */

function InputField({ label, icon, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 mb-1 block">
        {label}
      </label>
      <div className="relative">
        {icon && <span className="absolute left-3 top-2.5 text-gray-400">{icon}</span>}
        <input
          {...props}
          className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-sm 
            ${icon ? "pl-9" : ""}
            focus:ring-2 focus:ring-indigo-400 outline-none transition`}
        />
      </div>
    </div>
  );
}

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 mb-1 block">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none transition"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
