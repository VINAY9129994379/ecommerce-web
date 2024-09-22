import { Route, Routes } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import AddProduct from "../components/AddProduct";
import ListProduct from "../components/ListProduct";
import './Admin.css';

function Admin() {
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        {/* Use 'path' instead of 'to' */}
        <Route path='/addproduct' element={<AddProduct />} />
        <Route path='/listproduct' element={<ListProduct />} />
      </Routes>
    </div>
  );
}

export default Admin;
