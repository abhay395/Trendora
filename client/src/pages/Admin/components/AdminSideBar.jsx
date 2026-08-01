import { LayoutDashboard, Package, ShoppingCart, Users, Settings } from "lucide-react";
import { Link } from "react-router-dom";
function AdminSidebar() {
    const menuItems = [
        { name: "Dashboard", icon: <LayoutDashboard size={18} />, route: '' },
        { name: "Products", icon: <Package size={18} />, route: '/admin/products' },
        { name: "Orders", icon: <ShoppingCart size={18} />, route: '/admin/orders' },
        { name: "Users", icon: <Users size={18} />, route: '/admin/users' },
        { name: "Settings", icon: <Settings size={18} />, route: '/admin/settings' },
    ];

    return (
        <aside className="w-64 bg-white shadow-md border-r border-gray-200 p-5 hidden md:flex flex-col justify-between">
            {/* Logo */}
            <div>
                <h2 className="text-2xl font-bold mb-10 tracking-wide text-gray-800">Admin</h2>

                {/* Menu */}
                <nav className="space-y-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.route}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition font-medium"
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Footer */}
            <div className="text-xs text-gray-500 mt-6 border-t border-gray-200 pt-4">
                © 2025 Admin Panel
            </div>
        </aside>
    );
}

export default AdminSidebar;
