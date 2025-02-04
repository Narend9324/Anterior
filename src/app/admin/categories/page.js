// app/admin/dashboard/page.js
import AdminLayout from "@/components/AdminLayout";
import AdminAuthWrapper from "@/components/AdminAuthWrapper";

function CategoryList() {
  return (
    <AdminAuthWrapper>
      <AdminLayout>
        <h1 className="text-3xl font-bold py-16">Category List</h1>
        <p>Welcome to the Category List</p>
      </AdminLayout>
    </AdminAuthWrapper>
  );
}

export default CategoryList;
