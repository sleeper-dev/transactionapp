import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex w-full flex-grow justify-center bg-slate-50 py-5">
        <div className="flex w-full max-w-5xl flex-col justify-center px-3 lg:px-0">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
