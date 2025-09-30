import client from "./client";

// add a product
export async function addProduct(payload) {
  // payload = { name, category, price, stock, description }
  const { data } = await client.post("/products", payload);
  return data;
}

// fetch product list
export async function getProducts() {
  const { data } = await client.get("/products");
  return data;
}
