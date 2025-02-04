// app/admin/dashboard/page.js
import AdminLayout from "@/components/AdminLayout";
import AdminAuthWrapper from "@/components/AdminAuthWrapper";

function DashboardPage() {
  return (
    <AdminAuthWrapper>
      <AdminLayout>
        <h1 className="text-3xl font-bold py-16">Dashboard</h1>
        <p>Welcome to the admin dashboard.</p>
      </AdminLayout>
    </AdminAuthWrapper>
  );
}

export default DashboardPage;
