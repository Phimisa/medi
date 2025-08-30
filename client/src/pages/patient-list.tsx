import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft, Plus, UserCheck, Bed, Ambulance, LogOut, Search, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PatientListProps {
  onViewPatient: (patientId: string) => void;
  onEditPatient: (patientId: string) => void;
}

const statsData = [
  {
    title: "Mới nhập viện",
    count: 12,
    icon: UserCheck,
    iconColor: "bg-green-100",
    iconTextColor: "text-green-600"
  },
  {
    title: "Nội trú",
    count: 156,
    icon: Bed,
    iconColor: "bg-blue-100",
    iconTextColor: "text-blue-600"
  },
  {
    title: "Khẩn cấp",
    count: 8,
    icon: Ambulance,
    iconColor: "bg-orange-100",
    iconTextColor: "text-orange-600"
  },
  {
    title: "Xuất viện",
    count: 156,
    icon: LogOut,
    iconColor: "bg-purple-100",
    iconTextColor: "text-purple-600"
  }
];

const patients = [
  {
    id: "25070675",
    name: "Nguyễn Văn A",
    initials: "VA",
    bgColor: "bg-blue-100",
    textColor: "text-blue-600",
    bhyt: "VN03456789",
    birthDate: "15/03/1985",
    gender: "Nam",
    status: "Đang điều trị",
    statusColor: "status-processing",
    admissionDate: "30/08/2025"
  },
  {
    id: "25070726",
    name: "Trần Thị Bình",
    initials: "TB",
    bgColor: "bg-pink-100",
    textColor: "text-pink-600",
    bhyt: "VN08963425",
    birthDate: "22/07/1978",
    gender: "Nữ",
    status: "Chờ khám",
    statusColor: "status-new",
    admissionDate: "29/08/2025"
  },
  {
    id: "25070880",
    name: "Lê Văn Cường",
    initials: "LC",
    bgColor: "bg-green-100",
    textColor: "text-green-600",
    bhyt: "VN06918923",
    birthDate: "10/12/1992",
    gender: "Nam",
    status: "Hoàn thành",
    statusColor: "status-completed",
    admissionDate: "30/08/2025"
  }
];

export default function PatientList({ onViewPatient, onEditPatient }: PatientListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const handleAddPatient = () => {
    onEditPatient("25070675")
    // TODO: Implement add patient functionality
    console.log("Adding new patient...");
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-blue-600" data-testid="breadcrumb-home">
            Trang chủ
          </Link>
          <ChevronRight size={14} />
          <Link href="/patient-management" className="hover:text-blue-600" data-testid="breadcrumb-medical">
            Bệnh án
          </Link>
          <ChevronRight size={14} />
          <span className="text-gray-800" data-testid="breadcrumb-current">
            Danh sách người bệnh tại khoa
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>


            <h1 className="text-3xl font-bold text-slate-900 mb-2">              Danh sách người bệnh tại khoa
            </h1>
            <p className="text-slate-600">              Quản lý bệnh nhân đang điều trị
            </p>
          </div>
          <Button
            onClick={handleAddPatient}
            className="bg-emerald-600 hover:bg-emerald-700"
            data-testid="button-add-new"
          >
            <Plus size={16} className="mr-2" />
            Thêm mới
          </Button>
        </div>
      </div>


      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-4 shadow-lg border border-slate-200" data-testid={`stat-${stat.title.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${stat.iconColor} rounded-full flex items-center justify-center`}>
                  <Icon className={stat.iconTextColor} size={20} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{stat.count}</p>
                  <p className="text-sm text-slate-600">{stat.title}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 mb-6" data-testid="filter-section">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <Input
                type="text"
                placeholder="Tìm theo tên, BHYT..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
                data-testid="search-patients"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48" data-testid="filter-status">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="inpatient">Nội trú</SelectItem>
                <SelectItem value="outpatient">Ngoại trú</SelectItem>
                <SelectItem value="emergency">Cấp cứu</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-4">
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              data-testid="date-from"
            />
            <Input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              data-testid="date-to"
            />
          </div>
        </div>
      </div>

      {/* Patient Table */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden" data-testid="patient-table">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left p-4 font-semibold text-slate-900">BỆNH NHÂN</th>
                <th className="text-left p-4 font-semibold text-slate-900">BHYT</th>
                <th className="text-left p-4 font-semibold text-slate-900">NGÀY SINH</th>
                <th className="text-left p-4 font-semibold text-slate-900">GIỚI TÍNH</th>
                <th className="text-left p-4 font-semibold text-slate-900">TRẠNG THÁI</th>
                <th className="text-left p-4 font-semibold text-slate-900">NGÀY VÀO</th>
                <th className="text-left p-4 font-semibold text-slate-900">THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr
                  key={patient.id}
                  className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                  data-testid={`patient-row-${patient.id}`}
                >
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${patient.bgColor} rounded-full flex items-center justify-center`}>
                        <span className={`font-semibold ${patient.textColor} text-sm`}>{patient.initials}</span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{patient.name}</p>
                        <p className="text-sm text-slate-600">ID: {patient.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600">{patient.bhyt}</td>
                  <td className="p-4 text-slate-600">{patient.birthDate}</td>
                  <td className="p-4 text-slate-600">{patient.gender}</td>
                  <td className="p-4">
                    <span className={`status-badge ${patient.statusColor}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600">{patient.admissionDate}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onViewPatient(patient.id)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        data-testid={`view-patient-${patient.id}`}
                      >
                        Xem
                      </button>
                      <button
                        onClick={() => onEditPatient(patient.id)}
                        className="text-green-600 hover:text-green-700 text-sm font-medium"
                        data-testid={`edit-patient-${patient.id}`}
                      >
                        Sửa
                      </button>
                      <button
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                        data-testid={`delete-patient-${patient.id}`}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between" data-testid="pagination">
          <p className="text-sm text-slate-600">Hiển thị 1 đến 10 trong 245 kết quả</p>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-slate-300 rounded text-sm hover:bg-slate-50 transition-colors" data-testid="page-1">1</button>
            <button className="px-3 py-1 border border-slate-300 rounded text-sm hover:bg-slate-50 transition-colors" data-testid="page-2">2</button>
            <button className="px-3 py-1 border border-slate-300 rounded text-sm hover:bg-slate-50 transition-colors" data-testid="page-3">3</button>
            <button className="px-3 py-1 border border-slate-300 rounded text-sm hover:bg-slate-50 transition-colors" data-testid="next-page">{'>'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
