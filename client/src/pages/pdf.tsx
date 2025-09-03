import React, { useState } from "react";
import {
    FileText,
    Search,
    ChevronRight,
    Download,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    PDFViewer,
    PDFDownloadLink,
    Font,
} from "@react-pdf/renderer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// =============== Data model (Giữ nguyên) ===============
interface MedicalRecord {
    id: string;
    patientId: string;
    recordNumber: string;
    patientName: string;
    gender: "Nam" | "Nữ";
    birthYear: number;
    diagnosis: string;
    admissionDate: string;
    department: string;
    status: "active" | "completed";
}

Font.register({
    family: "Roboto",
    src: "/src/assets/fonts/roboto-regular.ttf",
});

// =============== PDF Style (Giữ nguyên) ===============
const pdfStyles = StyleSheet.create({
    page: {
        size: "A4",
        padding: 40,
        fontSize: 14,
        lineHeight: 1.6,
        position: "relative",
        fontFamily: "Roboto",
    },
    header: {
        textAlign: "center",
        marginBottom: 20,
        fontSize: 18,
        fontWeight: "bold"
    },
    section: { marginBottom: 12 },
    bold: { fontWeight: "bold" },
    row: { flexDirection: "row", marginBottom: 6, flexWrap: "wrap" },
    checkbox: { marginRight: 8 },
    watermark: {
        position: "absolute",
        top: "40%",
        left: "10%",
        fontSize: 50,
        color: "teal",
        opacity: 0.1,
        transform: "rotate(-30deg)",
    },
});

const sampleRecords: MedicalRecord[] = [
    // ... (Your sample data)
    { id: "1", patientId: "25090119343372", recordNumber: "25024659", patientName: "Lê Quốc An", gender: "Nam", birthYear: 2001, diagnosis: "Phiếu nhận định tình trạng người bệnh nhập viện nội trú", admissionDate: "31/08/2025", department: "Khoa Nội Tổng Hợp", status: "active" },
    { id: "2", patientId: "25090119343373", recordNumber: "25024660", patientName: "Trần Thị Bích", gender: "Nữ", birthYear: 1995, diagnosis: "Phiếu khám bệnh", admissionDate: "01/09/2025", department: "Khoa Nhi", status: "completed" },
    { id: "3", patientId: "25090119343374", recordNumber: "25024661", patientName: "Nguyễn Văn Cảnh", gender: "Nam", birthYear: 1980, diagnosis: "Bệnh án nội khoa", admissionDate: "02/09/2025", department: "Khoa Hồi Sức Tích Cực", status: "active" },
    { id: "4", patientId: "25090119343375", recordNumber: "25024662", patientName: "Phạm Thị Dung", gender: "Nữ", birthYear: 1988, diagnosis: "Phiếu phẫu thuật", admissionDate: "01/09/2025", department: "Khoa Ngoại Tổng Quát", status: "completed" },
    { id: "5", patientId: "25090119343376", recordNumber: "25024663", patientName: "Hoàng Văn E", gender: "Nam", birthYear: 1975, diagnosis: "Khám sức khỏe định kỳ", admissionDate: "30/08/2025", department: "Khoa Khám Bệnh", status: "active" },
    { id: "6", patientId: "25090119343377", recordNumber: "25024664", patientName: "Đặng Thị F", gender: "Nữ", birthYear: 1992, diagnosis: "Bệnh án sản khoa", admissionDate: "01/09/2025", department: "Khoa Sản", status: "completed" },
    { id: "7", patientId: "25090119343378", recordNumber: "25024665", patientName: "Ngô Văn G", gender: "Nam", birthYear: 1969, diagnosis: "Phiếu chẩn đoán hình ảnh", admissionDate: "29/08/2025", department: "Khoa Chẩn Đoán Hình Ảnh", status: "active" },
    { id: "8", patientId: "25090119343379", recordNumber: "25024666", patientName: "Bùi Thị H", gender: "Nữ", birthYear: 1985, diagnosis: "Phiếu xét nghiệm sinh hóa", admissionDate: "31/08/2025", department: "Khoa Xét Nghiệm", status: "completed" },
    { id: "9", patientId: "25090119343380", recordNumber: "25024667", patientName: "Lý Văn I", gender: "Nam", birthYear: 1990, diagnosis: "Bệnh án tâm thần", admissionDate: "02/09/2025", department: "Khoa Tâm Thần", status: "active" },
    { id: "10", patientId: "25090119343381", recordNumber: "25024668", patientName: "Mai Thị J", gender: "Nữ", birthYear: 2000, diagnosis: "Phiếu điều trị vật lý trị liệu", admissionDate: "01/09/2025", department: "Khoa Phục Hồi Chức Năng", status: "completed" },
    { id: "11", patientId: "25090119343382", recordNumber: "25024669", patientName: "Võ Văn K", gender: "Nam", birthYear: 1982, diagnosis: "Bệnh án ngoại khoa", admissionDate: "03/09/2025", department: "Khoa Ngoại Thần Kinh", status: "active" },
    { id: "12", patientId: "25090119343383", recordNumber: "25024670", patientName: "Nguyễn Thị L", gender: "Nữ", birthYear: 1978, diagnosis: "Phiếu theo dõi thai kỳ", admissionDate: "31/08/2025", department: "Khoa Sản", status: "completed" },
    { id: "13", patientId: "25090119343384", recordNumber: "25024671", patientName: "Trương Văn M", gender: "Nam", birthYear: 1965, diagnosis: "Phiếu phẫu thuật tim mạch", admissionDate: "28/08/2025", department: "Khoa Tim Mạch", status: "active" },
    { id: "14", patientId: "25090119343385", recordNumber: "25024672", patientName: "Đỗ Thị N", gender: "Nữ", birthYear: 1999, diagnosis: "Phiếu khám định kỳ", admissionDate: "02/09/2025", department: "Khoa Nội Tổng Hợp", status: "completed" },
    { id: "15", patientId: "25090119343386", recordNumber: "25024673", patientName: "Lương Văn O", gender: "Nam", birthYear: 1970, diagnosis: "Bệnh án tiêu hóa", admissionDate: "01/09/2025", department: "Khoa Tiêu Hóa", status: "active" },
    { id: "16", patientId: "25090119343387", recordNumber: "25024674", patientName: "Tạ Thị P", gender: "Nữ", birthYear: 1987, diagnosis: "Phiếu siêu âm", admissionDate: "30/08/2025", department: "Khoa Siêu Âm", status: "completed" },
    { id: "17", patientId: "25090119343388", recordNumber: "25024675", patientName: "Nguyễn Văn Q", gender: "Nam", birthYear: 1993, diagnosis: "Phiếu điều trị nội trú", admissionDate: "02/09/2025", department: "Khoa Nội Tổng Hợp", status: "active" },
    { id: "18", patientId: "25090119343389", recordNumber: "25024676", patientName: "Phan Thị R", gender: "Nữ", birthYear: 1984, diagnosis: "Bệnh án ung bướu", admissionDate: "01/09/2025", department: "Khoa Ung Bướu", status: "completed" },
    { id: "19", patientId: "25090119343390", recordNumber: "25024677", patientName: "Nguyễn Văn S", gender: "Nam", birthYear: 1977, diagnosis: "Phiếu theo dõi sau mổ", admissionDate: "03/09/2025", department: "Khoa Hồi Sức", status: "active" },
    { id: "20", patientId: "25090119343391", recordNumber: "25024678", patientName: "Vũ Thị T", gender: "Nữ", birthYear: 1991, diagnosis: "Phiếu chăm sóc điều dưỡng", admissionDate: "31/08/2025", department: "Khoa Điều Dưỡng", status: "completed" },
];

// =============== Checkbox Component (Giữ nguyên) ===============
const Checkbox = ({ checked }: { checked?: boolean }) => (
    <Text style={pdfStyles.checkbox}>{checked ? "☑" : "☐"}</Text>
);

// =============== PDF Document (Giữ nguyên) ===============
function MedicalRecordPDF({ record }: { record: MedicalRecord }) {
    return (
        <Document>
            <Page size="A4" style={pdfStyles.page}>
                <Text style={pdfStyles.watermark}>BỆNH VIỆN TÂN ĐỊNH</Text>
                <View style={pdfStyles.header}>
                    <Text>SỞ Y TẾ THÀNH PHỐ HỒ CHÍ MINH</Text>
                    <Text>BỆNH VIỆN ĐA KHOA TÂN ĐỊNH</Text>
                    <Text style={pdfStyles.bold}>PHIẾU NHẬN ĐỊNH BAN ĐẦU</Text>
                    <Text>(Dành cho Điều dưỡng lúc nhập viện/nhập khoa)</Text>
                </View>
                <View style={pdfStyles.section}>
                    <View style={pdfStyles.row}>
                        <Text>Họ tên: {record.patientName}</Text>
                        <Text style={{ marginLeft: 20 }}>Giới tính: {record.gender}</Text>
                        <Text style={{ marginLeft: 20 }}>Năm sinh: {record.birthYear}</Text>
                    </View>
                    <View style={pdfStyles.row}>
                        <Text>Khoa: {record.department}</Text>
                        <Text style={{ marginLeft: 20 }}>Số bệnh án: {record.recordNumber}</Text>
                    </View>
                    <View style={pdfStyles.row}>
                        <Text>Chẩn đoán: {record.diagnosis}</Text>
                    </View>
                </View>
                <View style={pdfStyles.section}>
                    <Text style={pdfStyles.bold}>1. Dị ứng:</Text>
                    <View style={pdfStyles.row}>
                        <Checkbox checked /> <Text>Không</Text>
                        <Checkbox /> <Text>Có, ghi rõ: __________</Text>
                    </View>
                </View>
                <View style={pdfStyles.section}>
                    <Text style={pdfStyles.bold}>2. Đánh giá đau:</Text>
                    <View style={pdfStyles.row}>
                        <Text>Hiện đang đau:</Text>
                        <Checkbox checked /> <Text>Không</Text>
                        <Checkbox /> <Text>Có</Text>
                    </View>
                    <Text>Thang điểm đau: ____ /10</Text>
                </View>
                <View style={pdfStyles.section}>
                    <Text style={pdfStyles.bold}>3. Da, niêm mạc:</Text>
                    <View style={pdfStyles.row}>
                        <Checkbox checked /> <Text>Bình thường</Text>
                        <Checkbox /> <Text>Nhợt nhạt</Text>
                        <Checkbox /> <Text>Vàng da</Text>
                        <Checkbox /> <Text>Đỏ</Text>
                    </View>
                </View>
                <View style={pdfStyles.section}>
                    <Text style={pdfStyles.bold}>4. Hô hấp:</Text>
                    <View style={pdfStyles.row}>
                        <Checkbox checked /> <Text>Bình thường</Text>
                        <Checkbox /> <Text>Khó thở khi nằm</Text>
                        <Checkbox /> <Text>Khò khè</Text>
                    </View>
                </View>
                <View style={pdfStyles.section}>
                    <Text style={pdfStyles.bold}>5. Tim mạch:</Text>
                    <View style={pdfStyles.row}>
                        <Text>Tích chất mạch:</Text>
                        <Checkbox checked /> <Text>Đều</Text>
                        <Checkbox /> <Text>Không đều</Text>
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ textAlign: "right" }}>
                        Ngày lập: {new Date().toLocaleDateString("vi-VN")}
                    </Text>
                </View>
            </Page>
        </Document>
    );
}

// =============== Main Page - Final Revamped UI ===============
export default function PDFFormPage() {
    const [selectedRecordId, setSelectedRecordId] = useState<string | null>("1");
    const [searchTerm, setSearchTerm] = useState("");

    const handleSelectRecord = (recordId: string) => {
        // Nếu người dùng click vào cùng một record, nó sẽ bị deselect (null)
        // Ngược lại, nó sẽ chọn record mới
        setSelectedRecordId(selectedRecordId === recordId ? null : recordId);
    };

    const selectedRecord = sampleRecords.find((r) => r.id === selectedRecordId);

    const filteredRecords = sampleRecords.filter(
        (record) =>
            record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.recordNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 bg-slate-100 min-h-screen">
            {/* Breadcrumbs */}
            <div className="flex items-center space-x-2 text-sm text-slate-500 mb-6">
                <Link to="/" className="hover:text-blue-600">
                    Trang chủ
                </Link>
                <ChevronRight size={14} />
                <Link to="/patient-management" className="hover:text-blue-600">
                    Bệnh án
                </Link>
                <ChevronRight size={14} />
                <span className="text-slate-800">
                    Biểu mẫu PDF
                </span>
            </div>

            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                        Xem và In Biểu Mẫu Y Tế
                    </h1>
                    <p className="text-slate-600">
                        Quản lý và xem trước các biểu mẫu bệnh án dưới dạng PDF
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* Left Panel - Patient List */}
                <Card className="md:col-span-2 lg:col-span-2 max-h-[100vh] flex flex-col shadow-lg border border-slate-200">
                    <CardContent className="p-4 flex flex-col h-full">
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                            <Input
                                type="text"
                                placeholder="Tìm kiếm bệnh nhân..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Separator />
                        <ScrollArea className="flex-1 overflow-y-auto mt-4">
                            {filteredRecords.length > 0 ? (
                                filteredRecords.map((record) => (
                                    <div
                                        key={record.id}
                                        onClick={() => handleSelectRecord(record.id)}
                                        className={`p-3 rounded-lg mb-2 cursor-pointer transition-all duration-200 ease-in-out
                                            ${selectedRecordId === record.id
                                                ? "bg-emerald-100 border-l-4 border-emerald-500 font-semibold"
                                                : "bg-white hover:bg-slate-50 border border-slate-200"
                                            }
                                        `}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <FileText size={18} className="text-slate-500" />
                                            <span className="text-sm text-slate-800">
                                                {record.patientName}
                                            </span>
                                        </div>
                                        <div className="text-xs text-slate-500 mt-1 flex items-center space-x-1 pl-6">
                                            <span className="font-mono">#{record.recordNumber}</span>
                                            <span className="mx-1">•</span>
                                            <span>{record.admissionDate}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-slate-500 py-8 text-sm">
                                    Không tìm thấy bệnh nhân nào.
                                </div>
                            )}
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* Right Panel - PDF Viewer & Actions */}
                <Card className="md:col-span-2 lg:col-span-2 max-h-[100vh] flex flex-col shadow-lg border border-slate-200">
                    <CardContent className="flex-1 flex flex-col p-4">
                        {selectedRecord ? (
                            <div className="flex-1 flex flex-col">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-bold text-slate-900">
                                        Xem trước biểu mẫu
                                    </h2>
                                    <PDFDownloadLink
                                        document={<MedicalRecordPDF record={selectedRecord} />}
                                        fileName={`${selectedRecord.patientName}_${selectedRecord.recordNumber}.pdf`}
                                    >
                                        {({ loading }) => (
                                            <Button
                                                variant="default"
                                                className="bg-emerald-600 hover:bg-emerald-700"
                                            >
                                                <Download size={16} className="mr-2" />
                                                {loading ? "Đang tạo..." : "Tải xuống"}
                                            </Button>
                                        )}
                                    </PDFDownloadLink>
                                </div>
                                <div className="flex-1 border border-slate-200 rounded-lg overflow-hidden bg-slate-200">
                                    <PDFViewer width="100%" height="100%" showToolbar={true} >
                                        <MedicalRecordPDF record={selectedRecord} />
                                    </PDFViewer>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-center text-slate-500">
                                <div className="flex flex-col items-center">
                                    <FileText size={48} className="text-slate-300 mb-4" />
                                    <p className="text-base">Vui lòng chọn một bệnh nhân để xem biểu mẫu PDF.</p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}