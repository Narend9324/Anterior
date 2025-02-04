// app/admin/dashboard/page.js
import AdminLayout from "@/components/AdminLayout";
import AdminAuthWrapper from "@/components/AdminAuthWrapper";

function ProductList() {
  return (
    <AdminAuthWrapper>
      <AdminLayout>
        <h1 className="text-3xl font-bold py-16">Product List</h1>
        <p>Welcome to the Product List</p>
      </AdminLayout>
    </AdminAuthWrapper>
  );
}

export default ProductList;
