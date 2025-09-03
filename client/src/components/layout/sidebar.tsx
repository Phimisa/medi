// Thay đổi import từ "wouter" sang "react-router-dom"
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Tag,
  Printer,
  Settings,
  LogOut,
  UserRound,
  FileText,
  Users
} from "lucide-react";

export default function Sidebar() {
  // sử dụng hook useLocation từ react-router-dom
  const location = useLocation();

const menuItems = [
  { href: "/", label: "Trang chủ", icon: Home },
  { href: "/patient-management", label: "Bệnh án", icon: FileText },
  { href: "/patient-list", label: "Danh sách bệnh nhân", icon: Users },
  { href: "/pdf", label: "In tập tin dữ liệu", icon: Printer },
  { href: "/settings", label: "Cài đặt", icon: Settings },
  { href: "/logout", label: "Đăng xuất", icon: LogOut },
];

  return (
    <div className="w-72 bg-white shadow-2xl border-r border-slate-200 flex flex-col">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
            <UserRound className="text-white" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">EMR</h3>
            <p className="text-sm text-slate-600">Phòng công nghệ thông tin</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          // So sánh pathname của location với href của item
          const isActive = location.pathname === item.href;
          const Icon = item.icon;

          return (
            // Thay thế prop "href" bằng "to"
            <Link
              key={item.href}
              to={item.href}
              className={`sidebar-item flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${isActive
                  ? "text-blue-600 bg-blue-50"
                  : "text-slate-700 hover:text-blue-600"
                }`}
              data-testid={`sidebar-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}