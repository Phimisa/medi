import { useEffect, useRef } from "react";
import { UserPlus, AlertTriangle, CheckCircle } from "lucide-react";

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const notifications = [
  {
    id: 1,
    icon: UserPlus,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
    title: "Bệnh nhân mới",
    description: "Nguyễn Văn A đã được thêm vào hệ thống",
    time: "5 phút trước"
  },
  {
    id: 2,
    icon: AlertTriangle,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100",
    title: "Cảnh báo hệ thống",
    description: "Cần cập nhật kết quả xét nghiệm",
    time: "15 phút trước"
  },
  {
    id: 3,
    icon: CheckCircle,
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
    title: "Hoàn thành khám",
    description: "Bệnh án VN04589923 đã hoàn thành",
    time: "1 giờ trước"
  }
];

export default function NotificationDropdown({ isOpen, onClose }: NotificationDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 dropdown-menu z-50 animate-scale-in"
      data-testid="notification-dropdown"
    >
      <div className="p-4 border-b border-slate-200">
        <h3 className="font-semibold text-slate-900">Thông báo</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <div 
              key={notification.id}
              className="p-3 hover:bg-slate-50 border-b border-slate-100 cursor-pointer transition-colors"
              data-testid={`notification-item-${notification.id}`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 ${notification.iconBg} rounded-full flex items-center justify-center`}>
                  <Icon className={notification.iconColor} size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{notification.title}</p>
                  <p className="text-xs text-slate-600">{notification.description}</p>
                  <p className="text-xs text-slate-400 mt-1">{notification.time}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-3 border-t border-slate-200">
        <button 
          className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium"
          data-testid="view-all-notifications"
        >
          Xem tất cả
        </button>
      </div>
    </div>
  );
}
