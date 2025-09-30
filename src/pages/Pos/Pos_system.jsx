// src/pages/Dash_board/PointOfSale.jsx
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// TODO: import real APIs when backend is ready
// import { getProducts, processPayment } from "../../services/pos";

export default function PointOfSale() {
  const navigate = useNavigate();

  /* ---------------- LEFT: product catalog (dummy for now) ---------------- */
  const [query, setQuery] = useState("");
  const [products] = useState([
    { id: 1, name: "Eco-Friendly Water Bottle", price: 15 },
    { id: 2, name: "Organic Cotton T-Shirt", price: 25 },
    { id: 3, name: "Reusable Shopping Bag", price: 5 },
    { id: 4, name: "Bamboo Toothbrush", price: 3.5 },
    { id: 5, name: "LED Desk Lamp", price: 29.99 },
  ]);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        String(p.price).includes(q) ||
        String(p.id).includes(q)
    );
  }, [products, query]);

  /* ---------------- RIGHT: order form + cart ---------------- */
  const [customer, setCustomer] = useState("");
  const [discount, setDiscount] = useState(0);   // flat amount ($)
  const [vatAmount, setVatAmount] = useState(0); // FIXED VAT AMOUNT ($)
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((c) => {
      const idx = c.findIndex((i) => i.id === product.id);
      if (idx > -1) {
        const next = [...c];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...c, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, qty) => {
    const q = Math.max(1, Number(qty) || 1);
    setCart((c) => c.map((i) => (i.id === id ? { ...i, qty: q } : i)));
  };

  const removeLine = (id) => setCart((c) => c.filter((i) => i.id !== id));

  // totals
  const subTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const vat = Number(vatAmount || 0); // stays constant even if qty changes
  const total = Math.max(0, subTotal - Number(discount || 0) + vat);

  const onClear = () => {
    setCart([]);
    setCustomer("");
    setDiscount(0);
    setVatAmount(0);
  };

  const onPay = async () => {
    
    // ------------------------------------------------------------
    // TODO: call backend to create sale & get invoice id
    // const res = await processPayment({ customer, cart, subTotal, discount, vatAmount, total });
    // const invoiceId = res.invoiceId;
    // const invoiceData = res.invoice; // if backend returns a full invoice payload
    // ------------------------------------------------------------

    // DEMO payload (replace with backend response)
    const invoiceId = `INV-${Math.floor(Math.random() * 90000 + 10000)}`;
    const invoiceData = {
      id: invoiceId,
      date: new Date().toISOString(),
      company: {
        name: "StockWise Ltd.",
        address: "123 Market St, City",
        phone: "+1 (555) 000-1234",
        email: "hello@stockwise.com",
      },
      customer: {
        name: customer || "Walk-in Customer",
        phone: "",
        email: "",
      },
      items: cart.map((i) => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
      discount: Number(discount || 0),
      vat: Number(vatAmount || 0),
      note: "Thanks for your purchase!",
      status: "Paid",
    };
    
    // Navigate to invoice page with data in state
    navigate(`/dashboard/invoice ${invoiceId}`, { state: invoiceData });
  };

  return (
    <div className="mx-auto max-w-6xl rounded-lg bg-white p-4 sm:p-6 shadow">
      <h2 className="text-xl font-semibold text-gray-900">Point of Sale</h2>

      <div className="mt-4 grid gap-6 lg:grid-cols-2">
        {/* ================= LEFT: Products ================= */}
        <div className="rounded-lg border">
          <div className="flex items-center justify-between border-b p-3">
            <div className="text-sm font-medium text-gray-700">Products</div>
            <div className="relative w-1/2 min-w-[180px]">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products…"
                className="w-full rounded-md border border-gray-200 bg-gray-100 pl-9 pr-3 py-2 text-sm outline-none placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
              <svg className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none">
                <path d="M21 21l-4.3-4.3M10 18a8 8 0 100-16 8 8 0 000 16z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          <div className="max-h-[420px] overflow-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="sticky top-0 bg-gray-50">
                <tr>
                  <th className="px-4 py-2 font-medium text-gray-600">Name</th>
                  <th className="px-4 py-2 font-medium text-gray-600">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredProducts.map((p) => (
                  <tr
                    key={p.id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => addToCart(p)}
                    title="Click to add to cart"
                  >
                    <td className="px-4 py-2 text-gray-900 font-medium">{p.name}</td>
                    <td className="px-4 py-2 text-gray-700">${p.price.toFixed(2)}</td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td className="px-4 py-6 text-center text-gray-500" colSpan={2}>
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= RIGHT: Order Form ================= */}
        <div className="rounded-lg border p-4">
          {/* Customer */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Customer</label>
            <input
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              placeholder="Select or enter customer"
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            {/* TODO: swap to a searchable dropdown when API is ready */}
          </div>

          {/* Cart Lines */}
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 font-medium text-gray-600">Product</th>
                  <th className="px-3 py-2 font-medium text-gray-600">Price</th>
                  <th className="px-3 py-2 font-medium text-gray-600">Qty</th>
                  <th className="px-3 py-2 font-medium text-gray-600">Line Total</th>
                  <th className="px-3 py-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {cart.map((line) => (
                  <tr key={line.id}>
                    <td className="px-3 py-2 text-gray-900">{line.name}</td>
                    <td className="px-3 py-2 text-gray-700">${line.price.toFixed(2)}</td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        min="1"
                        value={line.qty}
                        onChange={(e) => updateQty(line.id, e.target.value)}
                        className="w-16 rounded border border-gray-300 px-2 py-1 text-sm"
                      />
                    </td>
                    <td className="px-3 py-2 text-gray-900">
                      ${(line.qty * line.price).toFixed(2)}
                    </td>
                    <td className="px-3 py-2 text-right">
                      <button
                        onClick={() => removeLine(line.id)}
                        className="rounded border px-2 py-1 text-xs text-gray-600 hover:bg-gray-100"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
                {cart.length === 0 && (
                  <tr>
                    <td className="px-3 py-6 text-center text-gray-500" colSpan={5}>
                      No items in cart. Click a product on the left to add.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Discounts & VAT (fixed amount) */}
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Discount ($)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">VAT ($)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={vatAmount}
                onChange={(e) => setVatAmount(e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Summary */}
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>${subTotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Discount</span><span>-${Number(discount || 0).toFixed(2)}</span></div>
            <div className="flex justify-between"><span>VAT</span><span>${vat.toFixed(2)}</span></div>
            <div className="flex justify-between font-semibold text-gray-900"><span>Total</span><span>${total.toFixed(2)}</span></div>
          </div>

          {/* Actions */}
          <div className="mt-5 flex justify-end gap-3">
            <button onClick={onClear} className="rounded border px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
              Clear
            </button>
            <button
              disabled={cart.length === 0}
              onClick={onPay}
              className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
            >
              Process Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
