import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Blogs from "./pages/Blogs";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import "./App.css"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Dashboard */}
        <Route index element={<Dashboard />} />

        {/* Blogs */}
        <Route path="blogs" element={<Blogs />} />

        {/* Create Blog */}
        <Route path="create" element={<CreateBlog />} />

        {/* Edit Blog */}
        <Route path="edit/:id" element={<EditBlog />} />
      </Route>
    </Routes>
  );
};

export default App;
