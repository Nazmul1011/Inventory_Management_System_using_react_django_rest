import client from "./client";

// SALES
export async function getSalesReport(params = {}) {
  // params: { from, to, q, page, pageSize, ... }
  const { data } = await client.get("/reports/sales", { params });
  return data; // { items: [...], totals: {...} } (adapt to your API)
}

// STOCK
export async function getStockReport(params = {}) {
  const { data } = await client.get("/reports/stock", { params });
  return data; // { items: [...], totals: {...} }
}

// optional: server-side CSV export
export async function exportSalesCSV(params = {}) {
  const res = await client.get("/reports/sales/export", { params, responseType: "blob" });
  return res.data;
}
