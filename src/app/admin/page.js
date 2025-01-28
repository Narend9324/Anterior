import Sidebar from '../../components/AdminSidebar';
import AdminStats from '../../components/AdminStats';

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard flex flex-row">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Admin Dashboard</h1>
        <AdminStats />
      </div>
    </div>
  );
}
