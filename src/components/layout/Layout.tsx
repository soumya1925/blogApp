import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";


const Layout = () => {
return (
<div className="flex min-h-screen bg-gray-100">
<Sidebar />
<div className="flex-1">
<Navbar />
<main className="p-4">
<Outlet />
</main>
</div>
</div>
);
};


export default Layout;