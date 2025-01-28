// components/AdminStats.js
"use client";

 function AdminStats() {
    return (
      <div className="stats-grid">
        <div className="stat-card">
          <h3 className="text-black">Total Users</h3>
          <p>1,300</p>
        </div>
        <div className="stat-card">
          <h3>Total Products</h3>
          <p>50</p>
        </div>
      </div>
    );
  }
  
  export default AdminStats;