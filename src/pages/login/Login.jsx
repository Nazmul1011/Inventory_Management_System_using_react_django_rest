import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    // email: "demo@ims.com",     // dummy prefill so fields aren’t empty
    // password: "123456",
  });
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // ------------------------------------------------------------
      // TODO: Replace with real login API call
      // Example with axios:
      // const res = await client.post("/auth/login", form);
      // Save token/user, redirect to dashboard, etc.
      // ------------------------------------------------------------
      await new Promise((r) => setTimeout(r, 600)); // fake delay
      alert(`Pretend Login ✅\n${JSON.stringify(form, null, 2)}`);
    } catch (err) {
      console.error(err);
      // TODO: show proper toast/message from API error
      alert("Login failed (demo).");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="mx-auto max-w-3xl px-4 pb-20 pt-10 sm:px-6">
        {/* Banner image */}
        <div className="mx-auto max-w-2xl">
          <img
            className="h-40 w-full rounded-xl object-cover"
            src="https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop"
            alt="Login banner"
          />
        </div>

        {/* Title */}
        <h1 className="mt-6 text-center text-xl font-semibold text-gray-900 sm:text-2xl">
          Welcome to Inventory Management System
        </h1>

        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="mx-auto mt-6 w-full max-w-md space-y-4"
        >
          <div>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="Username/Email"
              className="w-full rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          <div className="relative">
            <input
              type={showPwd ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={onChange}
              placeholder="Password"
              className="w-full rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              required
            />
            <button
              type="button"
              onClick={() => setShowPwd((v) => !v)}
              className="absolute inset-y-0 right-2 my-auto text-xs text-gray-600 hover:text-gray-900"
              aria-label="Toggle password visibility"
            >
              {showPwd ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
          <Link to ="/dashboard">
            {loading ? "Logging in..." : "Login"}</Link>
          </button>

          <div className="flex items-center justify-between text-xs">
            {/* Dummy links (routes below) */}
            <Link to="/forgetpass" className="text-gray-600 hover:text-gray-900">
              Forgot Password?
            </Link>
            <div className="text-gray-600">
              Don’t have an account?{" "}
              <Link to="/logRegister" className="font-medium text-blue-600 hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
