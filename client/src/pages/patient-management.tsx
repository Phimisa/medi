import { Link } from "react-router-dom";
import { ArrowLeft, List, Heart, Stethoscope, Archive, Edit, LogOut, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const managementModules = [
  {
    id: "patient-list",
    title: "Danh sách người bệnh tại khoa",
    description: "Quản lý danh sách bệnh nhân tại khoa",
    count: 245,
    icon: List,
    iconColor: "bg-gradient-to-br from-green-500 to-green-600",
    buttonText: "Xem danh sách",
    buttonColor: "text-green-600 hover:text-green-700",
    href: "/patient-list"
  },
  {
    id: "vital-signs",
    title: "Chỉ nhận chức năng sống",
    description: "Theo dõi các chỉ số sống",
    count: 89,
    icon: Heart,
    iconColor: "bg-gradient-to-br from-red-500 to-red-600",
    buttonText: "Xem chi tiết",
    buttonColor: "text-red-600 hover:text-red-700",
    href: "/v2"

  },
  {
    id: "specialist-exam",
    title: "Khám chuyên khoa",
    description: "Quản lý khám bệnh chuyên khoa",
    count: 156,
    icon: Stethoscope,
    iconColor: "bg-gradient-to-br from-blue-500 to-blue-600",
    buttonText: "Truy cập",
    buttonColor: "text-blue-600 hover:text-blue-700",
    href: "/v2"

  },
  {
    id: "digital-archive",
    title: "Kho hồ sơ số",
    description: "Lưu trữ và quản lý hồ sơ điện tử",
    count: 1247,
    icon: Archive,
    iconColor: "bg-gradient-to-br from-purple-500 to-purple-600",
    buttonText: "Truy cập kho",
    buttonColor: "text-purple-600 hover:text-purple-700",
    href: "/v2"

  },
  {
    id: "medical-records",
    title: "Hồ sơ bệnh ký",
    description: "Quản lý hồ sơ các ghi chú",
    count: 67,
    icon: Edit,
    iconColor: "bg-gradient-to-br from-orange-500 to-orange-600",
    buttonText: "Xem danh sách",
    buttonColor: "text-orange-600 hover:text-orange-700",
    href: "/pdf",


  },
  {
    id: "discharge-management",
    title: "Quản lý xuất viện",
    description: "Xử lý thủ tục xuất viện",
    count: 34,
    icon: LogOut,
    iconColor: "bg-gradient-to-br from-teal-500 to-teal-600",
    buttonText: "Quản lý",
    buttonColor: "text-teal-600 hover:text-teal-700",
    href: "/v2"

  }
];

export default function PatientManagement() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          {/* Thay đổi Link từ wouter sang react-router-dom, đổi prop "href" thành "to" */}
          <Link to="/" className="hover:text-blue-600" data-testid="breadcrumb-home">
            Trang chủ
          </Link>
          <ChevronRight size={14} />
          {/* Thay đổi Link từ wouter sang react-router-dom, đổi prop "href" thành "to" */}
          <Link to="/patient-management" className="hover:text-blue-600" data-testid="breadcrumb-current">
            Bệnh án
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Quản lý bệnh án</h1>
            <p className="text-slate-600">Hệ thống quản lý bệnh án điện tử chuyên nghiệp</p>
          </div>
        </div>
      </div>

      {/* Management Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {managementModules.map((module) => {
          const Icon = module.icon;
          const content = (
            <div className="card-hover bg-white rounded-xl p-6 shadow-lg border border-slate-200" data-testid={`module-${module.id}`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${module.iconColor} rounded-xl flex items-center justify-center`}>
                  <Icon className="text-white" size={24} />
                </div>
                <span className="text-2xl font-bold text-slate-900">{module.count}</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{module.title}</h3>
              <p className="text-sm text-slate-600 mb-4">{module.description}</p>
              <button className={`font-medium text-sm flex items-center space-x-2 ${module.buttonColor}`} data-testid={`button-${module.id}`}>
                <span>{module.buttonText}</span>
                <ArrowLeft className="rotate-180" size={16} />
              </button>
            </div>
          );

          if (module.href) {
            // Sử dụng Link của react-router-dom với prop "to"
            return (
              <Link key={module.id} to={module.href}>
                {content}
              </Link>
            );
          }

          return (
            <div key={module.id}>
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}