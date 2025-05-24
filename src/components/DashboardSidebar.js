import { useState } from "react";
import { FaHome, FaBox, FaClipboardList,  FaStar, FaTags, FaPlus } from "react-icons/fa";
import {  FaUsers,  FaChartBar, FaCog, FaUserShield } from "react-icons/fa";

import { Link } from "react-router-dom";

const primaryColor = "#f43f5e";
const VendorSidebar = () => {
  const [active, setActive] = useState("products");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <FaHome /> },
    { id: "products", label: "Products", icon: <FaBox /> },
    { id: "orders", label: "Orders", icon: <FaClipboardList /> },
    { id: "settings", label: "Settings", icon: <FaCog /> },
    { id: "ratings", label: "Ratings", icon: <FaStar /> },
    { id: "coupons", label: "Coupons", icon: <FaTags /> },
  ];

  return (
    <div className="d-flex flex-column bg-white p-3 shadow-sm" style={{ width: "250px", minHeight: "100vh" }}>
      <button className="btn mb-4 fw-bold w-100 " style={{ color: primaryColor }}>
        <FaHome className="me-2" />
        View Store
      </button>

      <ul className="nav flex-column mb-4">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={`nav-item mb-2 ${active === item.id ? "text-white rounded px-2 py-2" : "text-dark"}`}
            style={active === item.id ? { backgroundColor: primaryColor } : { cursor: "pointer" }}

            onClick={() => setActive(item.id)}
          >
            <div className="d-flex align-items-center">
              <span className="me-2 fs-5">{item.icon}</span>
              <span className="fw-semibold">{item.label}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="d-flex gap-2">
        <button
          className="btn w-50"
          style={{
            color: primaryColor,
            border: `1px solid ${primaryColor}`,
            backgroundColor: "transparent",
          }}
        >
          <FaPlus className="me-1" />
          Product
        </button>
        <button className="btn btn-outline-success w-50">Add Coupon</button>
      </div>
    </div>
  );
};

export default VendorSidebar;



export const AdminSidebar = () => {
  const [active, setActive] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <FaHome /> },
    { id: "users", label: "Users", icon: <FaUsers /> },
    { id: "orders", label: "Orders", icon: <FaClipboardList /> },
    { id: "reports", label: "Reports", icon: <FaChartBar /> },
    { id: "settings", label: "Settings", icon: <FaCog /> },
    { id: "admins", label: "Admins", icon: <FaUserShield /> },
  ];

  return (
    <div className="d-flex flex-column bg-white p-3 shadow-sm" style={{ width: "250px", minHeight: "100vh" }}>
      <button className="btn mb-4 fw-bold w-100" style={{ color: primaryColor }}>
        <FaHome className="me-2" />
        Admin Panel
      </button>

      <ul className="nav flex-column mb-4">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={`nav-item mb-2 ${active === item.id ? "text-white rounded px-2 py-2" : "text-dark"}`}
            style={active === item.id ? { backgroundColor: primaryColor } : { cursor: "pointer" }}
            onClick={() => setActive(item.id)}
          >
            <div className="d-flex align-items-center">
              <span className="me-2 fs-5">{item.icon}</span>
              <span className="fw-semibold">{item.label}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="d-flex gap-2">
        <button
          className="btn w-50"
          style={{
            color: primaryColor,
            border: `1px solid ${primaryColor}`,
            backgroundColor: "transparent",
          }}
        >
          <FaPlus className="me-1" />
          User
        </button>
        <button className="btn btn-outline-success w-50">Report</button>
      </div>
    </div>
  );
};

