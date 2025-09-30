import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
// TODO: when backend is ready, use your service:
// import { getProducts } from "../../services/product";

function StatusBadge({ current, reorder }) {
  let label = "In Stock";
  let cls = "bg-emerald-50 text-emerald-700";
  if (current <= 0) {
    label = "Out of Stock";
    cls = "bg-rose-50 text-rose-700";
  } else if (current <= reorder) {
    label = "Low Stock";
    cls = "bg-amber-50 text-amber-700";
  }
  return (
    <span className={`inline-flex items-center rounded px-2 py-1 text-xs font-medium ${cls}`}>
      {label}
    </span>
  );
}

export default function ProductList() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [products, setProducts] = useState([
    // ---- DUMMY DATA (replace with API return) ----
    { id: 1001, name: "Organic Gala Apples", sku: "APL-GALA", category: "Produce", unit: "kg", purchasePrice: 2.2, sellPrice: 3.5, reorder: 50, stock: 120, barcode: "123456789012" },
    { id: 1002, name: "Whole Wheat Bread", sku: "BRD-WW", category: "Bakery", unit: "loaf", purchasePrice: 1.5, sellPrice: 2.5, reorder: 25, stock: 15, barcode: "234567890123" },
    { id: 1003, name: "Cheddar Cheese", sku: "CHS-CHED", category: "Dairy", unit: "kg", purchasePrice: 6.5, sellPrice: 9.0, reorder: 30, stock: 80, barcode: "345678901234" },
    { id: 1004, name: "Chicken Breast", sku: "MEAT-CHK-BRST", category: "Meat", unit: "kg", purchasePrice: 7.2, sellPrice: 11.0, reorder: 40, stock: 65, barcode: "456789012345" },
    { id: 1005, name: "Salmon Fillet", sku: "SEA-SLM", category: "Seafood", unit: "kg", purchasePrice: 12.0, sellPrice: 17.0, reorder: 20, stock: 18, barcode: "567890123456" },
    { id: 1006, name: "Basmati Rice", sku: "PNT-RCE-BSM", category: "Pantry", unit: "kg", purchasePrice: 1.8, sellPrice: 2.6, reorder: 60, stock: 90, barcode: "678901234567" },
    { id: 1007, name: "Olive Oil", sku: "PNT-OIL-OLV", category: "Pantry", unit: "ltr", purchasePrice: 5.0, sellPrice: 8.5, reorder: 25, stock: 10, barcode: "789012345678" },
    { id: 1008, name: "Milk", sku: "DRY-MLK", category: "Dairy", unit: "ltr", purchasePrice: 0.9, sellPrice: 1.5, reorder: 30, stock: 70, barcode: "890123456789" },
    { id: 1009, name: "Ground Beef", sku: "MEAT-GBF", category: "Meat", unit: "kg", purchasePrice: 5.5, sellPrice: 9.0, reorder: 30, stock: 20, barcode: "013245678901" },
  ]);

  // unique categories from data (with "All")
  const categories = useMemo(() => ["All", ...Array.from(new Set(products.map(p => p.category)))], [products]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        // ------------------------------------------------------------
        // TODO: fetch from backend
        // const data = await getProducts();
        // if (!mounted) return;
        // setProducts(data.items); // adapt to your API shape
        // ------------------------------------------------------------
      } catch (e) {
        if (mounted) setErr("Failed to load products.");
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // client-side filter/search (you can move this to API if you prefer)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(p => {
      const matchesCat = category === "All" || p.category === category;
      const matchesQ =
        q === "" ||
        String(p.id).includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.barcode.includes(q);
      return matchesCat && matchesQ;
    });
  }, [products, query, category]);

  return (
    <div>
      {/* header row */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Products</h2>
        <Link
          to="/dashboard/product" // <-- adjust if your add route differs
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Add Product
        </Link>
      </div>

      {/* actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* search */}
        <div className="relative w-full sm:max-w-md">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-md border border-gray-200 bg-gray-100 pl-9 pr-3 py-2 text-sm outline-none placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
          <svg className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none">
            <path d="M21 21l-4.3-4.3M10 18a8 8 0 100-16 8 8 0 000 16z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>

        {/* category filter */}
        <div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* feedback */}
      {loading && (
        <div className="mt-4 rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-700 animate-pulse">
          Loading products…
        </div>
      )}
      {err && (
        <div className="mt-4 rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {err}
        </div>
      )}

      {/* table */}
      <div className="mt-4 overflow-x-auto rounded-lg border bg-white">
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
              <th className="px-4 py-3 font-medium">Reorder Level</th>
              <th className="px-4 py-3 font-medium">Current Stock</th>
              <th className="px-4 py-3 font-medium">Barcode</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-700">{p.id}</td>
                <td className="px-4 py-3 text-gray-900 font-medium">{p.name}</td>
                <td className="px-4 py-3 text-gray-700">{p.sku}</td>
                <td className="px-4 py-3 text-gray-700">{p.category}</td>
                <td className="px-4 py-3 text-gray-700">{p.unit}</td>
                <td className="px-4 py-3 text-gray-700">${p.purchasePrice.toFixed(2)}</td>
                <td className="px-4 py-3 text-gray-700">${p.sellPrice.toFixed(2)}</td>
                <td className="px-4 py-3 text-gray-700">{p.reorder}</td>
                <td className="px-4 py-3 text-gray-700">{p.stock}</td>
                <td className="px-4 py-3 text-blue-600 hover:underline">
                  <a href="#">{p.barcode}</a>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge current={p.stock} reorder={p.reorder} />
                </td>
              </tr>
            ))}

            {filtered.length === 0 && !loading && (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={11}>
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
