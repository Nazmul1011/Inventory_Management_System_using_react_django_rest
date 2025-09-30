import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

// TODO: when backend is ready:
// import { getInvoiceById } from "../../services/invoices";

function Money({ children }) {
  return <span>${Number(children || 0).toFixed(2)}</span>;
}

export default function InvoicePage() {
  const { invoiceId } = useParams();
  const location = useLocation();

  // if navigated from POS, data will be in location.state
  const navData = location.state;

  const [data, setData] = useState(
    navData || {
      // fallback demo if user refreshes without API
      id: invoiceId,
      date: new Date().toISOString(),
      company: { name: "StockWise Ltd.", address: "123 Market St, City", phone: "+1 (555) 000-1234", email: "hello@stockwise.com" },
      customer: { name: "Walk-in Customer", phone: "—", email: "—" },
      items: [
        { id: 1, name: "Eco-Friendly Water Bottle", price: 15, qty: 2 },
        { id: 2, name: "Organic Cotton T-Shirt", price: 25, qty: 1 },
      ],
      discount: 0,
      vat: 0,
      note: "Thanks for your purchase!",
      status: "Paid",
    }
  );

  useEffect(() => {
    if (navData) return; // already have data
    (async () => {
      // ------------------------------------------------------------
      // TODO: fetch by invoiceId if no navData
      // const remote = await getInvoiceById(invoiceId);
      // setData(remote);
      // ------------------------------------------------------------
    })();
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
  const handleDownload = () => {
    // ------------------------------------------------------------
    // TODO: generate PDF (e.g. server endpoint or client lib)
    // Example: await downloadInvoicePDF(data.id)
    // ------------------------------------------------------------
    alert("Download PDF (todo) — plug your API or a PDF library.");
  };

  return (
    <div className="mx-auto max-w-4xl bg-white rounded-lg shadow p-6 print:shadow-none print:p-0">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoice</h1>
          <div className="mt-1 text-sm text-gray-500">#{data.id}</div>
          <div className="text-sm text-gray-500">
            {new Date(data.date).toLocaleString()}
          </div>
        </div>

        <div className="text-right">
          <div className="text-lg font-semibold text-gray-900">{data.company?.name}</div>
          <div className="text-sm text-gray-600">{data.company?.address}</div>
          <div className="text-sm text-gray-600">{data.company?.phone}</div>
          <div className="text-sm text-gray-600">{data.company?.email}</div>
        </div>
      </div>

      {/* Parties */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded border p-4">
          <div className="text-sm font-semibold text-gray-700">Billed To</div>
          <div className="mt-2 text-gray-900 font-medium">{data.customer?.name}</div>
          <div className="text-sm text-gray-600">{data.customer?.phone}</div>
          <div className="text-sm text-gray-600">{data.customer?.email}</div>
        </div>
        <div className="rounded border p-4">
          <div className="text-sm font-semibold text-gray-700">Status</div>
          <div className="mt-2">
            <span className={`inline-flex items-center rounded px-2 py-1 text-xs font-medium
              ${String(data.status).toLowerCase() === "paid" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
              {data.status || "Unpaid"}
            </span>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-600">Item</th>
              <th className="px-4 py-2 text-left font-medium text-gray-600">Price</th>
              <th className="px-4 py-2 text-left font-medium text-gray-600">Qty</th>
              <th className="px-4 py-2 text-left font-medium text-gray-600">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {(data.items || []).map((it) => (
              <tr key={it.id}>
                <td className="px-4 py-2 text-gray-900">{it.name}</td>
                <td className="px-4 py-2 text-gray-700"><Money>{it.price}</Money></td>
                <td className="px-4 py-2 text-gray-700">{it.qty}</td>
                <td className="px-4 py-2 text-gray-900"><Money>{it.price * it.qty}</Money></td>
              </tr>
            ))}
            {(!data.items || data.items.length === 0) && (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={4}>
                  No items.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="text-sm text-gray-600">
          <div className="font-semibold text-gray-700">Notes</div>
          <p className="mt-1 whitespace-pre-wrap">{data.note || "—"}</p>
        </div>

        <div className="rounded border p-4">
          <div className="flex justify-between text-sm"><span>Subtotal</span><span><Money>{subTotal}</Money></span></div>
          <div className="flex justify-between text-sm"><span>Discount</span><span>-<Money>{data.discount}</Money></span></div>
          <div className="flex justify-between text-sm"><span>VAT</span><span><Money>{data.vat}</Money></span></div>
          <div className="mt-2 border-t pt-2 flex justify-between font-semibold text-gray-900">
            <span>Grand Total</span><span><Money>{total}</Money></span>
          </div>
        </div>
      </div>

      {/* Footer actions (hidden in print) */}
      <div className="mt-6 flex justify-end gap-3 print:hidden">
        <button
          onClick={handlePrint}
          className="rounded border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Print
        </button>
        <button
          onClick={handleDownload}
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          @page { size: A4; margin: 16mm; }
          body { background: white; }
        }
      `}</style>
    </div>
  );
}
