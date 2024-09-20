import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // use react-router-dom
import ErrorPage from './errorpage';
import  Home from './pages/Home';
//import Login from './pages/LoginPage';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import AdminSignUp from './pages/AdminSignUp';
import WomenProducts from './pages/WomenProduct';
import MenProducts from './pages/MenProduct';
import KidsProducts from './pages/kidsProductpage';
import ProductPage from './pages/ProductPage';

import AdminPage from './pages/Admin/adminDashboard';
import Analytics from './pages/Admin/Analytics';
import ProductManagement from './pages/Admin/ProductManagement';
import './index.css'
import UserManagement from './pages/Admin/UserManagement';
import OrderManagement from './pages/Admin/OrderManagement';
import ApprovalManagement from './pages/Admin/ProductApproval';
import SellerLogin from './pages/seller/sellerlogin';
import SellerRegister from './pages/seller/sellerSignup';
import VerifyEmail from './pages/Admin/AdminVerifyEmail';
import VerifyEmailSeller from './pages/seller/VerifyEmail';
import AddProduct from './pages/seller/Addproduct';
import ViewApprovedProducts from './pages/seller/ApprovedProducts';
import SellerDashboard from './pages/seller/SellerDashboard';
import Logout from './Components/sellerlogout';
import AdminLogout from './Components/AdminLogout';
import CustomerLogin from './pages/Customer/customerlogin';
import CustomerSignUp from './pages/Customer/customersignup';
import CustomerVerifyEmail from './pages/Customer/CustomerVerifyEmail';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';
import Order from './pages/order';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />, 
  },
  
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/adminlogin",
    element: <AdminLogin/>,
  },
  {
    path: "/adminsignup",
    element: <AdminSignUp/>,
  },
  {
    path: "/women",
    element: <WomenProducts/>,
  },
  {
    path: "/men",
    element: <MenProducts/>,
  },
  {
    path: "/kids",
    element: <KidsProducts/>,
  },
  {
    path: "/product/:id",
    element: <ProductPage/>,
  },
  {
    path: "/cart",
    element: <CartPage/>,
  },
  {
    path: "/admin/*",
    element: <AdminPage/>,
  },
  {
    path: "/admin/analytics",
    element: <Analytics/>,
  },
  {
    path: "/admin/products",
    element: <ProductManagement/>,
  },
  {
    path: "/admin/users",
    element: <UserManagement/>,
  },
  {
    path: "/admin/orders",
    element: <OrderManagement/>,
  },
  {
    path: "/admin/pendingapproval",
    element: <ApprovalManagement/>,
  },
  {
    path: "/sellerlogin",
    element:<SellerLogin/>,
  },
  {
    path: "/sellersignup",
    element: <SellerRegister/>,
  },
  {
    path: "/seller/*",
    element: <SellerDashboard/>,
  },
  {
    path: "/admin/verify/:token",
    element: <VerifyEmail/>,
  },
  {
    path: "/seller/verify/:token",
    element: <VerifyEmailSeller/>,
  },
  {
    path: "/seller/addproduct",
    element: <AddProduct/>,
  },
  {
    path: "/seller/approvedproduct",
    element: <ViewApprovedProducts/>,
  },

  {
    path: "/seller/logout",
    element: <Logout/>,
  },
  {
    path: "/admin/logout",
    element: <AdminLogout/>,
  },
  {
    path: "/customer/signin",
    element: <CustomerLogin/>,
  },
  {
    path: "/customer/*",
    element: <Home/>,
  },
  {
    path: "/customer/signup",
    element: <CustomerSignUp/>,
  },
  {
    path: "/customer/verify/:token",
    element: <CustomerVerifyEmail/>,
  },
  {
    path: "/customer/cart",
    element: <CartPage/>,
  },
  {
    path: "/order",
    element: <Order/>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <CartProvider>
      <RouterProvider router={router} />
      </CartProvider>
  </StrictMode>,
)
