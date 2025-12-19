import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="font-semibold">Blog Admin</h1>

      {/* Mobile Navigation */}
      <div className="flex gap-3 md:hidden text-sm">
        <Link to="/">Dashboard</Link>
        <Link to="/blogs">Blogs</Link>
        <Link to="/create">Create</Link>
      </div>
    </header>
  );
};

export default Navbar;
