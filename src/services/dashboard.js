import client from "./client";

/**
 * Get dashboard summary KPIs
 * Example response (adjust to your backend):
 * {
 *   totalStockValue: 250000,
 *   todaySales: 5000,
 *   monthSales: 75000,
 *   lowStockCount: 15,
 *   deltas: { total:"+10%", today:"+5%", month:"+12%", low:"-3%" }
 * }
 */
export async function getDashboardSummary() {
  // TODO: update endpoint when backend gives you the route
  const { data } = await client.get("/dashboard/summary");
  return data;
}

/**
 * Get sales by day (e.g. last 30 days)
 * Expected shape: [{ day: 1, value: 1200 }, { day: 2, value: 900 }, ...]
 */
export async function getSalesByDay(params = { lastDays: 30 }) {
  const { data } = await client.get("/dashboard/sales-by-day", { params });
  return data;
}

/**
 * Get top products by sales
 * Expected shape: [{ label:"Product A", value: 100 }, ...]
 */
export async function getTopProducts(params = { limit: 5 }) {
  const { data } = await client.get("/dashboard/top-products", { params });
  return data;
}
