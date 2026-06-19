import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import Homepage from "./pages/Homepage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { Loader } from "lucide-react";
import Navbar from "./components/Navbar";
import Setting from "./pages/Setting";
function App() {
  const [count, setCount] = useState(0);

  const { authUser, checkAuth, ischeckAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!ischeckAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <BrowserRouter>
       <Navbar />
       

        <Routes>
          <Route
            path="/"
            element={authUser ? <Homepage /> : <Navigate to="/login" />}
          />

             <Route
            path="/setting"
            element={<Setting />}
          />

          <Route
            path="/signup"
            element={authUser ? <Homepage /> : <SignUpPage />}
          />

          <Route
            path="/login"
            element={authUser ? <Homepage /> : <LoginPage />}
          />

          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
