// app/admin/dashboard/page.js
import AdminLayout from "@/components/AdminLayout";
import AdminAuthWrapper from "@/components/AdminAuthWrapper";

function OrderManagement() {
  return (
    <AdminAuthWrapper>
      <AdminLayout>
        <h1 className="text-3xl font-bold py-16">Order Management</h1>
        <p>Welcome to the Order Management</p>
      </AdminLayout>
    </AdminAuthWrapper>
  );
}

export default OrderManagement;
