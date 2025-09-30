import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import client from "../../services/client"; // axios instance

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "", // new field
  });
  const [roles, setRoles] = useState(["Admin", "Staff", "Manager"]); // static for now
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [msg, setMsg] = useState(null);

  // later you’ll fetch roles from backend
  useEffect(() => {
    const loadRoles = async () => {
      try {
        // ------------------------------------------------------------
        // TODO: when backend is ready
        // const { data } = await client.get("/roles");
        // setRoles(data.roles);
        // ------------------------------------------------------------
      } catch (error) {
        console.error("Failed to fetch roles", error);
      }
    };
    loadRoles();
  }, []);

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    setMsg(null);

    if (form.password !== form.confirmPassword) {
      setErr("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      // ------------------------------------------------------------
      // TODO: replace endpoint/fields to match your backend
      // const { data } = await client.post("/auth/register", form);
      // setMsg(data?.message || "Registration successful.");
      // ------------------------------------------------------------
    } catch (error) {
      console.error(error);
      const apiMsg = error?.response?.data?.message || "Registration failed.";
      setErr(apiMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-xl px-4 py-12 sm:px-6">
        <h1 className="text-center text-2xl font-semibold text-gray-900">
          Register
        </h1>

        <form
          onSubmit={onSubmit}
          className="mx-auto mt-8 w-full max-w-md space-y-4"
        >
          {/* Admin Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-800">
              Admin Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Enter your name"
              required
              className="w-full rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-800">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="Enter your email"
              required
              className="w-full rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-800">
              Role
            </label>
            <select
              name="role"
              value={form.role}
              onChange={onChange}
              required
              className="w-full rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            >
              <option value="" disabled>
                Select role
              </option>
              {roles.map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-800">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              placeholder="Enter your password"
              required
              className="w-full rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-800">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={onChange}
              placeholder="Confirm your password"
              required
              className="w-full rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {/* Feedback */}
          {msg && (
            <div className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">
              {msg}
            </div>
          )}
          {err && (
            <div className="rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {err}
            </div>
          )}

          {/* Bottom link */}
          <div className="text-center text-xs text-gray-600">
            Already have an account?{" "}
            <Link
              to="/loguser" // keeping your route name
              className="font-medium text-blue-600 hover:underline"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
