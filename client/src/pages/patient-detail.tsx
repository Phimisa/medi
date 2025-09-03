import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronRight,
  User,
  Calendar,
  Phone,
  MapPin,
  FileText,
  Heart,
  Activity,
  Pill,
  TestTube,
  Stethoscope,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Download,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

// Mock data cho bệnh nhân
const patientData = {
  id: "24024302",
  name: "HUỲNH VĂN THỦY",
  gender: "Nam",
  birthYear: 1963,
  address: "Thành phố Huế, Tỉnh Thừa Thiên Huế",
  patientCode: "24024302",
  medicalRecordNumber: "0005395/25",
  insuranceNumber: "25083007270413089",
  department: "Trẻ em dưới 6 tuổi",
  room: "/",
  bedNumber: "",
  allergies: "",
  medications: ""
};

// Mock data cho các tab
const medicalHistory = [
  {
    id: 1,
    date: "15/08/2025",
    type: "Khám tổng quát",
    doctor: "BS. Nguyễn Văn A",
    diagnosis: "Viêm họng cấp",
    status: "Hoàn thành"
  },
  {
    id: 2,
    date: "10/08/2025",
    type: "Xét nghiệm máu",
    doctor: "BS. Trần Thị B",
    diagnosis: "Thiếu máu nhẹ",
    status: "Đang theo dõi"
  }
];

const appointments = [
  {
    id: 1,
    date: "20/08/2025",
    time: "09:00",
    type: "Tái khám",
    doctor: "BS. Nguyễn Văn A",
    status: "Đã đặt"
  },
  {
    id: 2,
    date: "25/08/2025",
    time: "14:30",
    type: "Xét nghiệm",
    doctor: "BS. Lê Thị C",
    status: "Chờ xác nhận"
  }
];

const testResults = [
  {
    id: 1,
    name: "Xét nghiệm máu tổng quát",
    date: "10/08/2025",
    result: "Bình thường",
    status: "Hoàn thành"
  },
  {
    id: 2,
    name: "Siêu âm ổ bụng",
    date: "12/08/2025",
    result: "Không phát hiện bất thường",
    status: "Hoàn thành"
  }
];

const medications = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    dosage: "1 viên x 3 lần/ngày",
    duration: "7 ngày",
    status: "Đang dùng"
  },
  {
    id: 2,
    name: "Amoxicillin 250mg",
    dosage: "1 viên x 2 lần/ngày",
    duration: "5 ngày",
    status: "Đã hoàn thành"
  }
];

export default function PatientDetail() {
  const { patientId } = useParams();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelectItem = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = (items: any[], checked: boolean) => {
    if (checked) {
      setSelectedItems(items.map(item => item.id.toString()));
    } else {
      setSelectedItems([]);
    }
  };

  return (
    <div className="h-screen flex bg-slate-100">
      {/* Sidebar thông tin bệnh nhân */}
      <div className="w-80 bg-white shadow-lg border-r border-slate-200 flex flex-col">
        {/* Header sidebar */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="text-blue-600" size={24} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">{patientData.name}</h2>
              <p className="text-sm text-slate-600">Nam • {patientData.birthYear}</p>
            </div>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Mã bệnh nhân:</span>
              <span className="font-medium">{patientData.patientCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Số vào viện:</span>
              <span className="font-medium">{patientData.insuranceNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Mã bệnh án:</span>
              <span className="font-medium">{patientData.medicalRecordNumber}</span>
            </div>
          </div>
        </div>

        {/* Thông tin chi tiết */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Thông tin cơ bản</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="text-slate-400" size={16} />
                  <span className="text-slate-600">{patientData.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="text-slate-400" size={16} />
                  <span className="text-slate-600">Đối tượng: {patientData.department}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="text-slate-400" size={16} />
                  <span className="text-slate-600">Phòng/Giường: {patientData.room}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Thông tin y tế</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-slate-600">NCTN:</span>
                  <p className="text-slate-800">{patientData.allergies || "Không có"}</p>
                </div>
                <div>
                  <span className="text-slate-600">CDCS:</span>
                  <p className="text-slate-800">{patientData.medications || "Không có"}</p>
                </div>
                <div>
                  <span className="text-slate-600">Dị ứng:</span>
                  <p className="text-slate-800">Không có</p>
                </div>
                <div>
                  <span className="text-slate-600">Nhóm máu:</span>
                  <p className="text-slate-800">Chưa xác định</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Danh mục dữ liệu */}
        <div className="border-t border-slate-200 p-4">
          <h3 className="font-semibold text-slate-900 mb-3">Danh mục dữ liệu</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="vital-signs" />
              <label htmlFor="vital-signs" className="text-sm text-slate-600">Biểu đồ chức năng sống</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="medical-history" />
              <label htmlFor="medical-history" className="text-sm text-slate-600">Diễn biến bệnh và y lệnh</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="test-results" />
              <label htmlFor="test-results" className="text-sm text-slate-600">Kết quả xét nghiệm</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="diagnosis" />
              <label htmlFor="diagnosis" className="text-sm text-slate-600">Kết quả chẩn đoán hình ảnh</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="consultation" />
              <label htmlFor="consultation" className="text-sm text-slate-600">Kết quả thăm dò chức năng</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="medication" />
              <label htmlFor="medication" className="text-sm text-slate-600">Theo dõi thuốc và dịch truyền</label>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-600">Từ:</span>
              <Input type="date" className="text-xs" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-600">Đến:</span>
              <Input type="date" className="text-xs" />
            </div>
            <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
              <Search size={16} className="mr-2" />
              Tìm kiếm
            </Button>
          </div>
        </div>
      </div>

      {/* Khu vực chính */}
      <div className="flex-1 flex flex-col">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
            <ChevronRight size={14} />
            <Link to="/patient-list" className="hover:text-blue-600">Danh sách bệnh nhân</Link>
            <ChevronRight size={14} />
            <span className="text-slate-800">{patientData.name}</span>
          </div>
        </div>

        {/* Tabs chính */}
        <div className="flex-1 p-6">
          <Tabs defaultValue="medical-history" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="medical-history" className="flex items-center space-x-2">
                <FileText size={16} />
                <span>Lịch sử điều trị</span>
              </TabsTrigger>
              <TabsTrigger value="appointments" className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>Quá trình điều trị</span>
              </TabsTrigger>
              <TabsTrigger value="test-results" className="flex items-center space-x-2">
                <TestTube size={16} />
                <span>Theo dõi & chăm sóc</span>
              </TabsTrigger>
              <TabsTrigger value="medications" className="flex items-center space-x-2">
                <Pill size={16} />
                <span>Kết quả CLS</span>
              </TabsTrigger>
              <TabsTrigger value="vital-signs" className="flex items-center space-x-2">
                <Activity size={16} />
                <span>Hồ sơ bệnh án</span>
              </TabsTrigger>
            </TabsList>

            {/* Tab Content */}
            <div className="flex-1 overflow-hidden">
              <TabsContent value="medical-history" className="h-full">
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Lịch sử điều trị</CardTitle>
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                          <Input 
                            placeholder="Tìm kiếm..." 
                            className="pl-10 w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        <Button variant="outline" size="sm">
                          <Filter size={16} className="mr-2" />
                          Lọc
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Plus size={16} className="mr-2" />
                          Thêm mới
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-y-auto">
                    <div className="space-y-4">
                      {medicalHistory.map((record) => (
                        <div key={record.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <Checkbox 
                                checked={selectedItems.includes(record.id.toString())}
                                onCheckedChange={() => handleSelectItem(record.id.toString())}
                              />
                              <div>
                                <h4 className="font-medium text-slate-900">{record.type}</h4>
                                <p className="text-sm text-slate-600">{record.date} • {record.doctor}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant={record.status === "Hoàn thành" ? "default" : "secondary"}>
                                {record.status}
                              </Badge>
                              <Button variant="ghost" size="sm">
                                <Eye size={16} />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit size={16} />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-slate-700 ml-6">{record.diagnosis}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appointments" className="h-full">
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Quá trình điều trị</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Filter size={16} className="mr-2" />
                          Lọc theo ngày
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <Plus size={16} className="mr-2" />
                          Đặt lịch hẹn
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-y-auto">
                    <div className="space-y-4">
                      {appointments.map((appointment) => (
                        <div key={appointment.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <Calendar className="text-green-600" size={20} />
                              </div>
                              <div>
                                <h4 className="font-medium text-slate-900">{appointment.type}</h4>
                                <p className="text-sm text-slate-600">{appointment.date} • {appointment.time}</p>
                                <p className="text-sm text-slate-600">{appointment.doctor}</p>
                              </div>
                            </div>
                            <Badge variant={appointment.status === "Đã đặt" ? "default" : "secondary"}>
                              {appointment.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="test-results" className="h-full">
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Theo dõi & chăm sóc</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Download size={16} className="mr-2" />
                          Xuất báo cáo
                        </Button>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          <Plus size={16} className="mr-2" />
                          Thêm kết quả
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-y-auto">
                    <div className="space-y-4">
                      {testResults.map((test) => (
                        <div key={test.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                <TestTube className="text-purple-600" size={20} />
                              </div>
                              <div>
                                <h4 className="font-medium text-slate-900">{test.name}</h4>
                                <p className="text-sm text-slate-600">{test.date}</p>
                                <p className="text-sm text-slate-700">{test.result}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="default">{test.status}</Badge>
                              <Button variant="ghost" size="sm">
                                <Eye size={16} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="medications" className="h-full">
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Kết quả CLS</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Filter size={16} className="mr-2" />
                          Lọc theo loại
                        </Button>
                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                          <Plus size={16} className="mr-2" />
                          Thêm thuốc
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-y-auto">
                    <div className="space-y-4">
                      {medications.map((medication) => (
                        <div key={medication.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                <Pill className="text-orange-600" size={20} />
                              </div>
                              <div>
                                <h4 className="font-medium text-slate-900">{medication.name}</h4>
                                <p className="text-sm text-slate-600">{medication.dosage}</p>
                                <p className="text-sm text-slate-600">Thời gian: {medication.duration}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant={medication.status === "Đang dùng" ? "default" : "secondary"}>
                                {medication.status}
                              </Badge>
                              <Button variant="ghost" size="sm">
                                <Edit size={16} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vital-signs" className="h-full">
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Hồ sơ bệnh án</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Download size={16} className="mr-2" />
                          Xuất PDF
                        </Button>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          <Plus size={16} className="mr-2" />
                          Thêm ghi chú
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-y-auto">
                    <div className="text-center py-12">
                      <Activity className="mx-auto text-slate-300 mb-4" size={48} />
                      <p className="text-slate-500">Không có dữ liệu</p>
                      <p className="text-sm text-slate-400 mt-2">Chưa có thông tin về chức năng sống</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}