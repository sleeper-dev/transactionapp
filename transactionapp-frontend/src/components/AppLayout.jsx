import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow bg-slate-50 px-[16rem] py-5">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
