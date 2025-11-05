import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

function App() {
  const { user, checkAuth} = useAuthStore();

  useEffect(() => {
    checkAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        /> */}

        <Route path="/" element={user ? <HomePage /> : <AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
