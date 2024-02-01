import React from "react";
import "./adminPage.css";
import { NavBar, AdminPanel } from "../../organisms";

const AdminPage = () => {
  return (
    <div className="adminpage-container">
      <NavBar />
      <AdminPanel />
    </div>
  );
};

export default AdminPage;
