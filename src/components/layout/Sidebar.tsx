import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `block px-3 py-2 rounded ${
    isActive ? "bg-blue-600 text-white" : "hover:bg-gray-100"
  }`;

const Sidebar = () => {
  return (
    <aside className="hidden md:block w-64 bg-white shadow">
      <div className="p-4 text-xl font-bold">Admin</div>

      <nav className="flex flex-col gap-2 p-4">
        <NavLink to="/" end className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/blogs" className={linkClass}>
          Blogs
        </NavLink>

        <NavLink to="/create" className={linkClass}>
          Create Blog
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
