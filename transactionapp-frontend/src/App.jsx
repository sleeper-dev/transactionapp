import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";
import { AuthProvider } from "./context/AuthContext";
import PublicRoute from "./components/PublicRoute";
import Send from "./pages/Send";
import Transactions from "./pages/Transactions";
import TransactionSingle from "./pages/TransactionSingle";
import Account from "./pages/Account";
import Modal from "./components/Modal";

function App() {
  return (
    <AuthProvider>
      <Modal>
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <PublicRoute>
                  <Outlet />
                </PublicRoute>
              }
            >
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Home />} />
              <Route path="send" element={<Send />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="account" element={<Account />} />
              <Route
                path="transactions/:transactionId"
                element={<TransactionSingle />}
              />
            </Route>
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 5000 },
            style: {
              background: "#363636",
              color: "#fff",
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
            },
          }}
        />
      </Modal>
    </AuthProvider>
  );
}

export default App;
