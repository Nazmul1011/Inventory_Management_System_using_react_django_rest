import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiBox, FiTag, FiDollarSign } from "react-icons/fi";

const CATEGORIES = ["Produce", "Bakery", "Dairy", "Meat", "Seafood", "Pantry", "Beverage", "Other"];
const UNITS = ["kg", "ltr", "loaf", "pcs", "box"];

export default function ProductAdd() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: "",
    name: "",
    sku: "",
    category: "",
    unit: "",
    purchasePrice: "",
    sellPrice: "",
    reorder: "",
    stock: "",
    barcode: "",
    status: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const deriveStatus = (stock, reorder) => {
    const s = Number(stock), r = Number(reorder);
    if (isNaN(s) || isNaN(r)) return "In Stock";
    if (s <= 0) return "Out of Stock";
    if (s <= r) return "Low Stock";
    return "In Stock";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);

    const payload = {
      ...form,
      purchasePrice: Number(form.purchasePrice),
      sellPrice: Number(form.sellPrice),
      reorder: Number(form.reorder),
      stock: Number(form.stock),
      status: form.status || deriveStatus(form.stock, form.reorder),
    };

    try {
      console.log("Product added:", payload);
      navigate("/dashboard/productlist");
    } catch (error) {
      setErr("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-8 transition-all duration-300 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <FiBox size={22} />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Add New Product
        </h2>
      </div>

      <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side */}
        <div className="grid gap-5">
          {/* Product ID + Name */}
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Product ID" name="id" value={form.id} onChange={onChange} placeholder="1001" required />
            <InputField label="Product Name" name="name" value={form.name} onChange={onChange} placeholder="Organic Apples" required />
          </div>

          {/* SKU + Barcode */}
          <div className="grid grid-cols-2 gap-4">
            <InputField label="SKU" name="sku" value={form.sku} onChange={onChange} placeholder="APL-GALA-1234" required />
            <InputField label="Barcode" name="barcode" value={form.barcode} onChange={onChange} placeholder="123456789012" required />
          </div>

          {/* Category + Unit */}
          <div className="grid grid-cols-2 gap-4">
            <SelectField label="Category" name="category" value={form.category} onChange={onChange} options={CATEGORIES} />
            <SelectField label="Unit" name="unit" value={form.unit} onChange={onChange} options={UNITS} />
          </div>

          {/* Prices */}
          <div className="grid grid-cols-2 gap-4">
            <InputField type="number" step="0.01" label="Purchase Price ($)" name="purchasePrice" value={form.purchasePrice} onChange={onChange} required />
            <InputField type="number" step="0.01" label="Sell Price ($)" name="sellPrice" value={form.sellPrice} onChange={onChange} required />
          </div>

          {/* Reorder + Stock */}
          <div className="grid grid-cols-2 gap-4">
            <InputField type="number" label="Reorder Level" name="reorder" value={form.reorder} onChange={onChange} required />
            <InputField type="number" label="Current Stock" name="stock" value={form.stock} onChange={onChange} required />
          </div>

          {/* Status */}
          <SelectField
            label="Status"
            name="status"
            value={form.status}
            onChange={onChange}
            options={["Auto (based on stock)", "In Stock", "Low Stock", "Out of Stock"]}
          />

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={onChange}
              rows="3"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-lg bg-indigo-600 text-white text-sm font-medium py-2.5 hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>

          {err && (
            <div className="mt-2 rounded bg-red-50 px-3 py-2 text-sm text-red-600">
              {err}
            </div>
          )}
        </div>

        {/* Right Side Info Panel */}
        <div className="hidden lg:flex flex-col items-center justify-center border-l pl-8 text-gray-600">
          <FiTag size={30} className="text-indigo-400 mb-3" />
          <h3 className="font-semibold text-lg mb-2">Product Guidelines</h3>
          <ul className="text-sm list-disc list-inside space-y-1 text-gray-500">
            <li>Fill all mandatory fields</li>
            <li>SKU should be unique</li>
            <li>Use valid barcode format</li>
            <li>Status auto-calculates from stock</li>
          </ul>
        </div>
      </form>
    </div>
  );
}

/* ---------- Reusable Input Components ---------- */

function InputField({ label, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 mb-1 block">{label}</label>
      <input
        {...props}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none transition"
      />
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
        <option value="">Select {label}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

