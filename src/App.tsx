import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/authStore";

function App() {
  const { user } = useAuthStore();

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
