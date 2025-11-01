import { useAuthStore } from "../store/authStore";
import Button from "./Button";

export default function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">MyStore</h1>
      {user ? (
        <div className="flex gap-2 items-center">
          <span>{user.email}</span>
          <Button onClick={logout} className="bg-red-500 hover:bg-red-600">
            Logout
          </Button>
        </div>
      ) : (
        <Button>Login</Button>
      )}
    </nav>
  );
}
