// app/admin/dashboard/page.js
import AdminLayout from "@/components/AdminLayout";
import AdminAuthWrapper from "@/components/AdminAuthWrapper";

function UserList() {
  return (
    <AdminAuthWrapper>
      <AdminLayout>
        <h1 className="text-3xl font-bold py-16">User List</h1>
        <p>Welcome to the User List</p>
      </AdminLayout>
    </AdminAuthWrapper>
  );
}

export default UserList;
