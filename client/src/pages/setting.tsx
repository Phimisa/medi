import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Hospital,
  MapPin,
  Phone,
  Mail,
  User,
  Pencil,
  FileText,
  Save,
  Ban,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  const [hospitalInfo, setHospitalInfo] = useState({
    name: "Bệnh viện Đa khoa Tân Định",
    address: "227 Nguyễn Văn Linh, P. Tân Thuận Đông, Quận 7, TP. HCM",
    phone: "028 3872 1354",
    email: "info@tan-dinh-hospital.vn",
  });
  const [reportSettings, setReportSettings] = useState({
    header: "SỞ Y TẾ TP HỒ CHÍ MINH",
    footer: "Bệnh viện Đa khoa Tân Định - Cảm ơn sự hợp tác của quý vị!",
  });
  const [account, setAccount] = useState({
    username: "Nguyễn Văn Tuấn",
    role: "Quản trị viên",
  });

  const handleSave = () => {
    console.log("Saving settings...", {
      hospitalInfo,
      reportSettings,
      account,
    });
    // Implement API call to save data here
    alert("Cài đặt đã được lưu thành công!");
  };

  const handleCancel = () => {
    // Reset form or navigate back
    console.log("Canceled changes.");
    alert("Các thay đổi đã bị hủy.");
  };

  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-sm text-slate-500 mb-6">
        <Link to="/" className="hover:text-blue-600">
          Trang chủ
        </Link>
        <ChevronRight size={14} />
        <span className="text-slate-800">
          Cài đặt hệ thống
        </span>
      </div>

      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Cài đặt hệ thống
          </h1>
          <p className="text-slate-600">
            Quản lý và điều chỉnh các thông tin chung của ứng dụng.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            onClick={handleCancel}
            variant="outline"
            className="border-slate-300 hover:bg-slate-50"
          >
            <Ban size={16} className="mr-2" />
            Hủy bỏ
          </Button>
          <Button
            onClick={handleSave}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Save size={16} className="mr-2" />
            Lưu thay đổi
          </Button>
        </div>
      </div>

      {/* Main Settings Cards */}
      <div className="space-y-6">
        {/* General Information Card */}
        <Card className="rounded-xl shadow-lg border border-slate-200">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-900">Thông tin chung</CardTitle>
            <CardDescription className="text-sm text-slate-600">Cập nhật tên, địa chỉ và thông tin liên hệ của bệnh viện.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="hospital-name">Tên bệnh viện</Label>
                <div className="relative">
                  <Hospital className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <Input
                    id="hospital-name"
                    value={hospitalInfo.name}
                    onChange={(e) => setHospitalInfo({ ...hospitalInfo, name: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="address">Địa chỉ</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <Input
                    id="address"
                    value={hospitalInfo.address}
                    onChange={(e) => setHospitalInfo({ ...hospitalInfo, address: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <Input
                    id="phone"
                    value={hospitalInfo.phone}
                    onChange={(e) => setHospitalInfo({ ...hospitalInfo, phone: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="email">Email liên hệ</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <Input
                    id="email"
                    value={hospitalInfo.email}
                    onChange={(e) => setHospitalInfo({ ...hospitalInfo, email: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Settings Card */}
        <Card className="rounded-xl shadow-lg border border-slate-200">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-900">Cài đặt báo cáo</CardTitle>
            <CardDescription className="text-sm text-slate-600">Tùy chỉnh tiêu đề và chân trang mặc định cho các tài liệu.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="report-header">Tiêu đề báo cáo</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <Input
                    id="report-header"
                    value={reportSettings.header}
                    onChange={(e) => setReportSettings({ ...reportSettings, header: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="report-footer">Chân trang báo cáo</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <Input
                    id="report-footer"
                    value={reportSettings.footer}
                    onChange={(e) => setReportSettings({ ...reportSettings, footer: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Settings Card */}
        <Card className="rounded-xl shadow-lg border border-slate-200">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-900">Thông tin tài khoản</CardTitle>
            <CardDescription className="text-sm text-slate-600">Thay đổi tên và vai trò của người dùng.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="username">Tên người dùng</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <Input
                    id="username"
                    value={account.username}
                    onChange={(e) => setAccount({ ...account, username: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="user-role">Vai trò</Label>
                <div className="relative">
                  <Pencil className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <Input
                    id="user-role"
                    value={account.role}
                    onChange={(e) => setAccount({ ...account, role: e.target.value })}
                    className="pl-10"
                    disabled
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}