import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import Button from "../components/Button";

export default function AuthPage() {
  const { login, register } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) await login(email, password);
    else await register(email, password);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-500 dark:bg-amber-800">
      <form onSubmit={handleSubmit} className="bg-white  p-8 rounded-2xl shadow-md space-y-4 w-80">
        <h2 className="text-xl font-bold text-center">{isLogin ? "Login" : "Register"}</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" className="w-full">
          {isLogin ? "Login" : "Register"}
        </Button>
        <p
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-500 text-center cursor-pointer"
        >
          {isLogin ? "Create an account" : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
}
