import React  from 'react';
import { Link, Route, Routes  } from 'react-router-dom';
import AdminLogout from './AdminLogout';
import UserManagement from '../pages/Admin/UserManagement';
import ProductManagement from '../pages/Admin/ProductManagement';
import OrderManagement from '../pages/Admin/OrderManagement';
import Analytics from '../pages/Admin/Analytics';
import ApprovalManagement from '../pages/Admin/ProductApproval';

const AdminNavBar = () => {
return (
    <>
     
      <div className="container mx-auto py-8">
      <div className="flex">
          {/* Sidebar */}
          <aside className="w-1/4 bg-gray-200 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
            <nav>
              <ul className="space-y-2">
                <li><Link to="/admin/users" className="block text-blue-600">User Management</Link></li>
                <li><Link to="/admin/products" className="block text-blue-600">Product Management</Link></li>
                <li><Link to="/admin/orders" className="block text-blue-600">Order Management</Link></li>
                <li><Link to="/admin/analytics" className="block text-blue-600">Analytics</Link></li>
                <li><Link to="/admin/pendingapproval" className="block text-blue-600">Approval Awaiting Products</Link></li>
                <li><AdminLogout /></li>
              </ul>
            </nav>
          </aside>
          </div>
          <main className="flex-grow p-4">
          <Routes>
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/products" element={<ProductManagement />} />
              <Route path="/admin/orders" element={<OrderManagement />} />
              <Route path="/admin/analytics" element={<Analytics />} />
              <Route path="/admin/pendingapproval" element={<ApprovalManagement />} />
            </Routes>
            </main>
            </div>
          </>
          )
        }

          export default AdminNavBar