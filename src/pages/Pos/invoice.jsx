import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FiDownload, FiPrinter } from "react-icons/fi";

function Money({ children }) {
  return <span>${Number(children || 0).toFixed(2)}</span>;
}

export default function InvoicePage() {
  const { invoiceId } = useParams();
  const location = useLocation();

  const navData = location.state;

  const [data, setData] = useState(
    navData || {
      id: invoiceId || "INV-1001",
      date: new Date().toISOString(),
      company: {
        name: "StockWise Ltd.",
        address: "123 Market St, City",
        phone: "+1 (555) 000-1234",
        email: "hello@stockwise.com",
      },
      customer: { name: "Walk-in Customer", phone: "—", email: "—" },
      items: [
        { id: 1, name: "Eco-Friendly Water Bottle", price: 15, qty: 2 },
        { id: 2, name: "Organic Cotton T-Shirt", price: 25, qty: 1 },
      ],
      discount: 0,
      vat: 0,
      note: "Thank you for shopping with us!",
      status: "Paid",
    }
  );

  useEffect(() => {
    if (navData) return;
    // TODO: fetch invoice from API if needed
  }, [invoiceId, navData]);

  const subTotal = useMemo(
    () => (data.items || []).reduce((s, it) => s + it.price * it.qty, 0),
    [data.items]
  );
  const total = useMemo(
    () => Math.max(0, subTotal - Number(data.discount || 0) + Number(data.vat || 0)),
    [subTotal, data.discount, data.vat]
  );

  const handlePrint = () => window.print();
  const handleDownload = () => alert("Download PDF (coming soon)");

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6 sm:p-8 mt-6 mb-10 print:shadow-none print:p-0 transition-all duration-300">
        {/* ---- Header ---- */}
        <div className="flex flex-col sm:flex-row items-start justify-between border-b pb-4">
          <div>
            <img
              src="/logo192.png"
              alt="Company Logo"
              className="h-9 w-auto mb-2"
            />
            <h1 className="text-xl font-bold text-gray-900">Invoice</h1>
            <p className="text-sm text-gray-500 mt-1">#{data.id}</p>
            <p className="text-sm text-gray-500">
              {new Date(data.date).toLocaleString()}
            </p>
          </div>

          <div className="text-right mt-3 sm:mt-0">
            <h2 className="text-base font-semibold text-gray-900">{data.company?.name}</h2>
            <p className="text-sm text-gray-600">{data.company?.address}</p>
            <p className="text-sm text-gray-600">{data.company?.phone}</p>
            <p className="text-sm text-gray-600">{data.company?.email}</p>
          </div>
        </div>

        {/* ---- Billing Details ---- */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-gray-50 p-4 border">
            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
              Billed To
            </h3>
            <p className="mt-1 font-medium text-gray-900">{data.customer?.name}</p>
            <p className="text-sm text-gray-600">{data.customer?.phone}</p>
            <p className="text-sm text-gray-600">{data.customer?.email}</p>
          </div>

          <div className="rounded-lg bg-gray-50 p-4 border">
            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
              Payment Status
            </h3>
            <p className="mt-2">
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                  String(data.status).toLowerCase() === "paid"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-amber-50 text-amber-700 border border-amber-200"
                }`}
              >
                {data.status || "Unpaid"}
              </span>
            </p>
          </div>
        </div>

        {/* ---- Items Table ---- */}
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-sm border rounded-md overflow-hidden">
            <thead className="bg-indigo-50 text-indigo-700">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Item</th>
                <th className="px-4 py-2 text-left font-medium">Price</th>
                <th className="px-4 py-2 text-left font-medium">Qty</th>
                <th className="px-4 py-2 text-left font-medium">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data.items.map((it) => (
                <tr key={it.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-900">{it.name}</td>
                  <td className="px-4 py-2 text-gray-700">
                    <Money>{it.price}</Money>
                  </td>
                  <td className="px-4 py-2 text-gray-700">{it.qty}</td>
                  <td className="px-4 py-2 text-gray-900 font-medium">
                    <Money>{it.price * it.qty}</Money>
                  </td>
                </tr>
              ))}
              {data.items.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-center text-gray-500" colSpan={4}>
                    No items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ---- Totals & Notes ---- */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Notes</h3>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">
              {data.note || "—"}
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 border p-4">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>
                <Money>{subTotal}</Money>
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Discount</span>
              <span>-<Money>{data.discount}</Money></span>
            </div>
            <div className="flex justify-between text-sm">
              <span>VAT</span>
              <span><Money>{data.vat}</Money></span>
            </div>
            <div className="mt-2 border-t pt-2 flex justify-between font-semibold text-gray-900">
              <span>Grand Total</span>
              <span><Money>{total}</Money></span>
            </div>
          </div>
        </div>

        {/* ---- Actions ---- */}
        <div className="mt-6 flex justify-end gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <FiPrinter /> Print
          </button>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            <FiDownload /> Download PDF
          </button>
        </div>

        {/* ---- Print styles ---- */}
        <style>{`
          @media print {
            @page { size: A4; margin: 16mm; }
            body { background: white; }
            .print\\:hidden { display: none !important; }
          }
        `}</style>
      </div>
    </div>
  );
}
