import { useState } from "react";
import { Bell, ChevronDown, Menu, User, HospitalIcon } from "lucide-react";
import NotificationDropdown from "@/components/dropdowns/notification-dropdown";

interface HeaderProps {
  selectedDepartment: string;
  onDepartmentClick: () => void;
}

export default function Header({ selectedDepartment, onDepartmentClick }: HeaderProps) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="lg:hidden p-2 rounded-lg hover:bg-slate-100" data-testid="mobile-menu-button">
            <Menu className="text-slate-600" size={20} />
          </button>
          
          {/* Department Selector */}
          <div className="relative">
            <button 
              onClick={onDepartmentClick}
              className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-lg border border-blue-200 transition-all duration-200"
              data-testid="department-selector"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <HospitalIcon className="text-white" size={16} />
              </div>
              <span className="font-medium text-slate-700 max-w-48 truncate">{selectedDepartment}</span>
              <ChevronDown className="text-slate-500" size={16} />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          <div className="relative">
            <button 
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 relative"
              data-testid="notification-button"
            >
              <Bell className="text-slate-600" size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            
            <NotificationDropdown 
              isOpen={isNotificationOpen}
              onClose={() => setIsNotificationOpen(false)}
            />
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
              <User className="text-white" size={16} />
            </div>
            <span className="font-medium text-slate-700">Phòng công nghệ thông tin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
