// app/admin/page.js
import { redirect } from "next/navigation";

export default function AdminRootRedirect() {
  // Redirect to /admin/dashboard
  redirect("/admin/dashboard");
}
