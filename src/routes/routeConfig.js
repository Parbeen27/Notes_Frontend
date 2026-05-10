import Home from "../Pages/user/Home"
import Login from "../Pages/common/Login"
import Signup from "../Pages/common/Signup"
import AdminDashboard from "../Pages/admin/AdminDashboard"
import Users from "../Pages/admin/Users"
import ProfilePage from "../Pages/user/Profile"
export const routes = [
    {
        path: '/',
        element: Home,
        roles: ["user"],
        layout: "user"
    },
    {
        path: '/user/profile',
        element: ProfilePage,
        roles: ["user"],
        layout: "user"
    },
    {
        path: "/login",
        element: Login,
        public: true
    },
    {
        path: '/signup',
        element: Signup,
        public: true
    },
    {
        path: '/admin',
        element: AdminDashboard,
        roles: ["admin"],
        layout: "admin"
    },
    {
        path: '/admin/users',
        element: Users,
        roles: ["admin"],
        layout: "admin"
    },
    
]