import { Link } from "wouter";
import { UserCheck, Calendar, Ambulance, Users, HelpCircle, FileText, ArrowRight } from "lucide-react";
import CalendarWidget from "@/components/widgets/calendar-widget";
import StatsCard from "@/components/cards/stats-card";

const recentActivities = [
  {
    id: 1,
    initials: "VA",
    bgColor: "bg-blue-100",
    textColor: "text-blue-600",
    title: "Bệnh án mới được tạo",
    subtitle: "Nguyễn Văn A • Mã BN: VN03456789",
    status: "Mới",
    statusColor: "status-new"
  },
  {
    id: 2,
    initials: "TB", 
    bgColor: "bg-purple-100",
    textColor: "text-purple-600",
    title: "Cập nhật kết quả nghiệm",
    subtitle: "Trần Thị Bình • Mã BN: VN08963425",
    status: "Đang xử lý",
    statusColor: "status-processing"
  },
  {
    id: 3,
    initials: "LC",
    bgColor: "bg-green-100", 
    textColor: "text-green-600",
    title: "Hoàn thành chuyển khoa",
    subtitle: "Lê Văn Cường • Mã BN: VN06918923",
    status: "Hoàn thành",
    statusColor: "status-completed"
  }
];

export default function Dashboard() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Bảng điều khiển</h1>
          <p className="text-slate-600">Quản lý hệ thống bệnh án điện tử</p>
        </div>
        
        <CalendarWidget />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Bệnh nhân hôm nay"
          value={142}
          subtitle="Bệnh nhân hôm nay"
          icon={UserCheck}
          iconColor="bg-gradient-to-br from-green-500 to-green-600"
          badgeText="Hôm nay"
          badgeColor="text-green-600 bg-green-100"
        />

        <StatsCard
          title="Lịch hẹn hôm nay"
          value={23}
          subtitle="Lịch hẹn hôm nay"
          icon={Calendar}
          iconColor="bg-gradient-to-br from-blue-500 to-blue-600"
          badgeText="Lịch hẹn"
          badgeColor="text-blue-600 bg-blue-100"
        />

        <StatsCard
          title="Cấp cứu"
          value={8}
          subtitle="Cấp cứu"
          icon={Ambulance}
          iconColor="bg-gradient-to-br from-orange-500 to-orange-600"
          badgeText="Khẩn cấp"
          badgeColor="text-orange-600 bg-orange-100"
        />

        <StatsCard
          title="Tổng bệnh nhân"
          value="2,847"
          subtitle="Tổng bệnh nhân"
          icon={Users}
          iconColor="bg-gradient-to-br from-purple-500 to-purple-600"
          badgeText="Tổng số"
          badgeColor="text-purple-600 bg-purple-100"
        />
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="card-hover bg-white rounded-xl p-6 shadow-lg border border-slate-200" data-testid="help-center-card">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <HelpCircle className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Trung tâm trợ giúp</h3>
              <p className="text-sm text-slate-600">Hướng dẫn sử dụng và hỗ trợ kỹ thuật</p>
            </div>
          </div>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-2" data-testid="view-help-center">
            <span>Xem chi tiết</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <Link href="/patient-management" className="block">
          <div className="card-hover bg-white rounded-xl p-6 shadow-lg border border-slate-200" data-testid="patient-records-card">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <FileText className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Bệnh án</h3>
                <p className="text-sm text-slate-600">Quản lý hồ sơ bệnh án điện tử</p>
              </div>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-2" data-testid="access-patient-records">
              <span>Truy cập</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </Link>
      </div>

      {/* Recent Activities */}
      <div className="card-hover bg-white rounded-xl p-6 shadow-lg border border-slate-200" data-testid="recent-activities">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Hoạt động gần đây</h3>
        
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div 
              key={activity.id}
              className="flex items-center space-x-4 p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
              data-testid={`activity-item-${activity.id}`}
            >
              <div className={`w-10 h-10 ${activity.bgColor} rounded-full flex items-center justify-center`}>
                <span className={`font-semibold ${activity.textColor} text-sm`}>{activity.initials}</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">{activity.title}</p>
                <p className="text-sm text-slate-600">{activity.subtitle}</p>
              </div>
              <span className={`status-badge ${activity.statusColor}`}>
                {activity.status}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200">
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm" data-testid="view-all-activities">
            Xem tất cả hoạt động
          </button>
        </div>
      </div>
    </div>
  );
}
