// src/services/auth.js
import client from "./client";

// register
export async function registerUser(payload) {
  // payload: { name, email, password, role }
  const res = await client.post("/auth/register", payload);
  return res.data; // backend shape: { success, message, data }
}

// login
export async function loginUser(payload) {
  // payload: { email, password }
  const res = await client.post("/auth/login", payload);
  return res.data;
}

// forgot password
export async function forgotPassword(payload) {
  // payload: { email }
  const res = await client.post("/auth/forgot-password", payload);
  return res.data;
}

// get roles list
export async function fetchRoles() {
  const res = await client.get("/roles");
  return res.data; // expected { success, roles: [...] }
}
