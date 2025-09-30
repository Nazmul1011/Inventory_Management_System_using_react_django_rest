// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// // TODO: import when backend is ready
// // import { addProduct } from "../../services/product";

// const CATEGORIES = ["Produce","Bakery","Dairy","Meat","Seafood","Pantry","Beverage","Other"];
// const UNITS = ["kg","ltr","loaf","pcs","box"];

// export default function ProductAdd() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     // align with Product List columns
//     id: "",               // Product ID
//     name: "",
//     sku: "",
//     category: "",
//     unit: "",
//     purchasePrice: "",
//     sellPrice: "",
//     reorder: "",
//     stock: "",
//     barcode: "",
//     // status is derived from stock vs reorder, but allow override if you want:
//     status: "",           // optional (if your API expects it)
//     description: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState(null);

//   const onChange = (e) => {
//     const { name, value } = e.target;
//     setForm((f) => ({ ...f, [name]: value }));
//   };

//   const deriveStatus = (stock, reorder) => {
//     const s = Number(stock), r = Number(reorder);
//     if (isNaN(s) || isNaN(r)) return "In Stock";
//     if (s <= 0) return "Out of Stock";
//     if (s <= r) return "Low Stock";
//     return "In Stock";
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErr(null);

//     // compute status if not set
//     const payload = {
//       ...form,
//       id: String(form.id).trim(),
//       purchasePrice: Number(form.purchasePrice),
//       sellPrice: Number(form.sellPrice),
//       reorder: Number(form.reorder),
//       stock: Number(form.stock),
//       status: form.status || deriveStatus(form.stock, form.reorder),
//     };

//     try {
//       // ------------------------------------------------------------
//       // TODO: call backend API to create product
//       // await addProduct(payload);
//       // ------------------------------------------------------------

//       // demo: log and go to list
//       console.log("Product added:", payload);

//       // redirect to the product list page
//       navigate("/dashboard/product/list");
//     } catch (error) {
//       console.error(error);
//       setErr(error?.response?.data?.message || "Failed to add product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const genSku = () => {
//     // tiny helper to generate a basic SKU from name
//     const base = form.name
//       .trim()
//       .toUpperCase()
//       .replace(/[^A-Z0-9]+/g, "-")
//       .slice(0, 10)
//       .replace(/^-+|-+$/g, "");
//     const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
//     setForm((f) => ({ ...f, sku: `${base || "SKU"}-${rand}` }));
//   };

//   return (
//     <div className="rounded-lg bg-white p-6 shadow">
//       <h2 className="text-xl font-semibold text-gray-900">Add New Product</h2>

//       <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
//         {/* Product ID */}
//         <div>
//           <label className="mb-1 block text-sm font-medium text-gray-700">Product ID</label>
//           <input
//             type="text"
//             name="id"
//             value={form.id}
//             onChange={onChange}
//             placeholder="e.g. 1001"
//             required
//             className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//           />
//         </div>

//         {/* Name */}
//         <div>
//           <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={form.name}
//             onChange={onChange}
//             placeholder="Organic Gala Apples"
//             required
//             className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//           />
//         </div>

//         {/* SKU + generator */}
//         <div className="sm:col-span-2">
//           <label className="mb-1 block text-sm font-medium text-gray-700">SKU</label>
//           <div className="flex gap-2">
//             <input
//               type="text"
//               name="sku"
//               value={form.sku}
//               onChange={onChange}
//               placeholder="APL-GALA-1234"
//               required
//               className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//             />
//             <button type="button" onClick={genSku}
//               className="whitespace-nowrap rounded border px-3 py-2 text-sm hover:bg-gray-50">
//               Generate
//             </button>
//           </div>
//         </div>

//         {/* Category */}
//         <div>
//           <label className="mb-1 block text-sm font-medium text-gray-700">Category</label>
//           <select
//             name="category"
//             value={form.category}
//             onChange={onChange}
//             required
//             className="w-full rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
//           >
//             <option value="" disabled>Select category</option>
//             {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
//           </select>
//         </div>

//         {/* Unit */}
//         <div>
//           <label className="mb-1 block text-sm font-medium text-gray-700">Unit</label>
//           <select
//             name="unit"
//             value={form.unit}
//             onChange={onChange}
//             required
//             className="w-full rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
//           >
//             <option value="" disabled>Select unit</option>
//             {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
//           </select>
//         </div>

//         {/* Purchase Price */}
//         <div>
//           <label className="mb-1 block text-sm font-medium text-gray-700">Purchase Price ($)</label>
//           <input
//             type="number"
//             step="0.01"
//             name="purchasePrice"
//             value={form.purchasePrice}
//             onChange={onChange}
//             placeholder="0.00"
//             required
//             className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//           />
//         </div>

//         {/* Sell Price */}
//         <div>
//           <label className="mb-1 block text-sm font-medium text-gray-700">Sell Price ($)</label>
//           <input
//             type="number"
//             step="0.01"
//             name="sellPrice"
//             value={form.sellPrice}
//             onChange={onChange}
//             placeholder="0.00"
//             required
//             className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//           />
//         </div>

//         {/* Reorder Level */}
//         <div>
//           <label className="mb-1 block text-sm font-medium text-gray-700">Reorder Level</label>
//           <input
//             type="number"
//             name="reorder"
//             value={form.reorder}
//             onChange={onChange}
//             placeholder="e.g. 50"
//             required
//             className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//           />
//         </div>

//         {/* Current Stock */}
//         <div>
//           <label className="mb-1 block text-sm font-medium text-gray-700">Current Stock</label>
//           <input
//             type="number"
//             name="stock"
//             value={form.stock}
//             onChange={onChange}
//             placeholder="e.g. 120"
//             required
//             className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//           />
//         </div>

//         {/* Barcode */}
//         <div className="sm:col-span-2">
//           <label className="mb-1 block text-sm font-medium text-gray-700">Barcode</label>
//           <input
//             type="text"
//             name="barcode"
//             value={form.barcode}
//             onChange={onChange}
//             placeholder="123456789012"
//             required
//             className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//           />
//         </div>

//         {/* (Optional) Explicit Status select — if your API wants it */}
//         <div className="sm:col-span-2">
//           <label className="mb-1 block text-sm font-medium text-gray-700">
//             Status <span className="text-gray-500 font-normal">(optional — auto-derived)</span>
//           </label>
//           <select
//             name="status"
//             value={form.status}
//             onChange={onChange}
//             className="w-full rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
//           >
//             <option value="">Auto (based on stock)</option>
//             <option value="In Stock">In Stock</option>
//             <option value="Low Stock">Low Stock</option>
//             <option value="Out of Stock">Out of Stock</option>
//           </select>
//         </div>

//         {/* Description */}
//         <div className="sm:col-span-2">
//           <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
//           <textarea
//             name="description"
//             value={form.description}
//             onChange={onChange}
//             rows="3"
//             placeholder="Enter product description"
//             className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//           />
//         </div>

//         {/* Submit */}
//         <div className="sm:col-span-2">
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
//           >
//             {loading ? "Adding..." : "Add Product"}
//           </button>
//         </div>
//       </form>

//       {err && (
//         <div className="mt-4 rounded bg-red-50 px-3 py-2 text-sm text-red-600">
//           {err}
//         </div>
//       )}
//     </div>
//   );
// }





import { useState } from "react";
import { useNavigate } from "react-router-dom";
// TODO: import { addProduct } from "../../services/product";

const CATEGORIES = ["Produce","Bakery","Dairy","Meat","Seafood","Pantry","Beverage","Other"];
const UNITS = ["kg","ltr","loaf","pcs","box"];

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
      // TODO: await addProduct(payload);
      console.log("Product added:", payload);
      navigate("/dashboard/product/list");
    } catch (error) {
      setErr(error?.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Add New Product</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ---- Left: Form ---- */}
        <form onSubmit={onSubmit} className="grid gap-4">
          {/* Row 1: ID + Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Product ID</label>
              <input
                name="id"
                value={form.id}
                onChange={onChange}
                required
                placeholder="1001"
                className="w-full rounded border px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                required
                placeholder="Organic Gala Apples"
                className="w-full rounded border px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* Row 2: SKU + Barcode */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">SKU</label>
              <input
                name="sku"
                value={form.sku}
                onChange={onChange}
                required
                placeholder="APL-GALA-1234"
                className="w-full rounded border px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Barcode</label>
              <input
                name="barcode"
                value={form.barcode}
                onChange={onChange}
                required
                placeholder="123456789012"
                className="w-full rounded border px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* Row 3: Category + Unit */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={onChange}
                required
                className="w-full rounded border px-3 py-2 text-sm"
              >
                <option value="">Select Category</option>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Unit</label>
              <select
                name="unit"
                value={form.unit}
                onChange={onChange}
                required
                className="w-full rounded border px-3 py-2 text-sm"
              >
                <option value="">Select Unit</option>
                {UNITS.map((u) => <option key={u}>{u}</option>)}
              </select>
            </div>
          </div>

          {/* Row 4: Purchase + Sell Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Purchase Price ($)</label>
              <input
                type="number"
                step="0.01"
                name="purchasePrice"
                value={form.purchasePrice}
                onChange={onChange}
                required
                className="w-full rounded border px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Sell Price ($)</label>
              <input
                type="number"
                step="0.01"
                name="sellPrice"
                value={form.sellPrice}
                onChange={onChange}
                required
                className="w-full rounded border px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* Row 5: Reorder + Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Reorder Level</label>
              <input
                type="number"
                name="reorder"
                value={form.reorder}
                onChange={onChange}
                required
                className="w-full rounded border px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Current Stock</label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={onChange}
                required
                className="w-full rounded border px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* Status (optional) */}
          <div>
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={onChange}
              className="w-full rounded border px-3 py-2 text-sm"
            >
              <option value="">Auto (based on stock)</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>

          {/* Description full width */}
          <div className="lg:col-span-2">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={onChange}
              rows="3"
              className="w-full rounded border px-3 py-2 text-sm"
            />
          </div>

          {/* Submit */}
          <div className="lg:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>

        {/* ---- Right: Info / Placeholder ---- */}
        <div className="hidden lg:flex flex-col items-center justify-center text-gray-500 border-l pl-8">
          <p className="text-lg font-semibold mb-2">Product Guidelines</p>
          <ul className="text-sm list-disc list-inside space-y-1">
            <li>Fill all mandatory fields</li>
            <li>SKU should be unique</li>
            <li>Barcode must match system rules</li>
            <li>Status is auto-calculated from stock</li>
          </ul>
        </div>
      </div>

      {err && (
        <div className="mt-4 rounded bg-red-50 px-3 py-2 text-sm text-red-600">
          {err}
        </div>
      )}
    </div>
  );
}
