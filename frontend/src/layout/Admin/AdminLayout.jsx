import { Outlet } from "react-router-dom";
import AdminTopBar from "./AdminTopBar";

const AdminLayout = () => {
  return (
    <div className="relative h-screen bg-background">
      <AdminTopBar />
      <div className="pt-20 px-6 flex-1 overflow-y-auto bg-muted">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
