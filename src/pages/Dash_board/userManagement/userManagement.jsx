import { useMemo, useState } from "react";
// TODO: plug your API later
// import { getUsers, createUser, deleteUser } from "../../../services/users";

function RoleBadge({ role }) {
  const map = {
    Admin: "bg-gray-100 text-gray-800",
    Manager: "bg-blue-50 text-blue-700",
    Staff: "bg-emerald-50 text-emerald-700",
  };
  return (
    <span className={`inline-flex items-center rounded px-2 py-1 text-xs font-medium ${map[role] || "bg-gray-50 text-gray-700"}`}>
      {role}
    </span>
  );
}

export default function UserManagement() {
  // Simulate the currently logged-in user
  // TODO: replace with your auth context/store
  const currentUser = { id: 999, name: "You", role: "Admin" }; // "Admin" | "Manager" | "Staff"
  const isAdmin = currentUser.role === "Admin";

  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([
    // ---- DUMMY DATA (replace via API) ----
    { id: 1, name: "Sophia Clark", email: "sophia.clark@example.com", role: "Admin" },
    { id: 2, name: "Liam Walker",  email: "liam.walker@example.com",  role: "Manager" },
    { id: 3, name: "Olivia Reed",  email: "olivia.reed@example.com",  role: "Staff" },
    { id: 4, name: "Noah Bennett", email: "noah.bennett@example.com", role: "Staff" },
    { id: 5, name: "Ava Carter",   email: "ava.carter@example.com",   role: "Manager" },
  ]);

  const [showAdd, setShowAdd] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Staff" });
  const [err, setErr] = useState(null);
  const [removeErr, setRemoveErr] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
    );
  }, [users, query]);

  const addUser = async (e) => {
    e.preventDefault();
    setAddLoading(true);
    setErr(null);
    try {
      // ------------------------------------------------------------
      // TODO: call backend to create user
      // const created = await createUser(newUser);
      // setUsers((prev) => [...prev, created]);
      // ------------------------------------------------------------
      const fake = { id: Math.floor(Math.random() * 90000) + 10000, ...newUser };
      setUsers((prev) => [...prev, fake]);
      setShowAdd(false);
      setNewUser({ name: "", email: "", role: "Staff" });
    } catch (e2) {
      setErr("Failed to add user.");
      console.error(e2);
    } finally {
      setAddLoading(false);
    }
  };

  const removeUser = async (id) => {
    if (!isAdmin) return; // safeguard
    const target = users.find(u => u.id === id);
    const ok = window.confirm(`Remove user "${target?.name}"?`);
    if (!ok) return;
    try {
      setRemoveErr(null);
      // ------------------------------------------------------------
      // TODO: await deleteUser(id);
      // ------------------------------------------------------------
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (e) {
      console.error(e);
      setRemoveErr("Failed to remove user.");
    }
  };

  return (
    <div>
      {/* header */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">User Management</h2>

        <div className="flex gap-2">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search users..."
              className="w-full sm:w-64 rounded-md border border-gray-200 bg-gray-100 pl-9 pr-3 py-2 text-sm outline-none placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
            <svg className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none">
              <path d="M21 21l-4.3-4.3M10 18a8 8 0 100-16 8 8 0 000 16z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>

          <button
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center justify-center rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Add User
          </button>
        </div>
      </div>

      {removeErr && (
        <div className="mb-3 rounded bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {removeErr}
        </div>
      )}

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded border bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-900 font-medium">{u.name}</td>
                <td className="px-4 py-3 text-blue-600">{u.email}</td>
                <td className="px-4 py-3"><RoleBadge role={u.role} /></td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => removeUser(u.id)}
                    disabled={!isAdmin}
                    title={isAdmin ? "Remove user" : "Only admins can remove users"}
                    className={`rounded px-2 py-1 text-xs font-medium border
                      ${isAdmin ? "text-rose-600 border-rose-200 hover:bg-rose-50" : "text-gray-400 border-gray-200 cursor-not-allowed"}`}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={4}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden grid gap-3">
        {filtered.map((u) => (
          <div key={u.id} className="rounded-lg border bg-white p-4">
            <div className="font-semibold text-gray-900">{u.name}</div>
            <div className="text-blue-600 text-sm">{u.email}</div>
            <div className="mt-1">
              <RoleBadge role={u.role} />
            </div>
            <div className="mt-3 flex justify-end">
              <button
                onClick={() => removeUser(u.id)}
                disabled={!isAdmin}
                title={isAdmin ? "Remove user" : "Only admins can remove users"}
                className={`rounded px-3 py-1 text-xs font-medium border
                  ${isAdmin ? "text-rose-600 border-rose-200 hover:bg-rose-50" : "text-gray-400 border-gray-200 cursor-not-allowed"}`}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="rounded-lg border bg-white p-6 text-center text-gray-500">
            No users found.
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Add User</h3>
              <button onClick={() => setShowAdd(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>

            <form onSubmit={addUser} className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  value={newUser.name}
                  onChange={(e) => setNewUser((n) => ({ ...n, name: e.target.value }))}
                  required
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser((n) => ({ ...n, email: e.target.value }))}
                  required
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium text-gray-700">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser((n) => ({ ...n, role: e.target.value }))}
                  className="w-full rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                >
                  <option>Admin</option>
                  <option>Manager</option>
                  <option>Staff</option>
                </select>
              </div>

              {err && (
                <div className="sm:col-span-2 rounded bg-rose-50 px-3 py-2 text-sm text-rose-600">
                  {err}
                </div>
              )}

              <div className="sm:col-span-2 mt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAdd(false)}
                  className="rounded border px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addLoading}
                  className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {addLoading ? "Saving…" : "Save User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
