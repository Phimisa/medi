import {
  HashRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import Dashboard from "@/pages/dashboard";
import PatientManagement from "@/pages/patient-management";
import PatientList from "@/pages/patient-list";
import DepartmentModal from "@/components/modals/department-modal";
import PatientDetailsModal from "@/components/modals/patient-details-modal";
import NotFound from "@/pages/not-found";
import PDFFormPage from "@/pages/pdf";
import SettingsPage from "@/pages/setting";




// Component chính chứa các route
function AppRoutes() {
  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("Siêu Âm Trăng Đen + Điện Tim");
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  const openPatientDetails = (patientId: string) => {
    setSelectedPatientId(patientId);
    setIsPatientModalOpen(true);
    setIsEditMode(false);
  };

  const editPatient = (patientId: string) => {
    setSelectedPatientId(patientId);
    setIsPatientModalOpen(true);
    setIsEditMode(true);
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
      {isSidebarOpen && <Sidebar />}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          selectedDepartment={selectedDepartment}
          onDepartmentClick={() => setIsDepartmentModalOpen(true)}
          onSidebarToggle={handleSidebarToggle}
          isSidebarOpen={isSidebarOpen}
        />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patient-management" element={<PatientManagement />} />
            <Route path="/pdf" element={<PDFFormPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route
              path="/patient-list"
              element={
                <PatientList
                  onViewPatient={openPatientDetails}
                  onEditPatient={editPatient}
                />
              }
            />
            {/* Sử dụng path="*" để bắt tất cả các đường dẫn không khớp */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>

      <DepartmentModal
        isOpen={isDepartmentModalOpen}
        onClose={() => setIsDepartmentModalOpen(false)}
        selectedDepartment={selectedDepartment}
        onSelectDepartment={(department) => {
          setSelectedDepartment(department);
          setIsDepartmentModalOpen(false);
        }}
      />

      <PatientDetailsModal
        isOpen={isPatientModalOpen}
        onClose={() => {
          setIsPatientModalOpen(false);
          setSelectedPatientId(null);
          setIsEditMode(false);
        }}
        patientId={selectedPatientId}
        isEditMode={isEditMode}
        onToggleEditMode={() => setIsEditMode(!isEditMode)}
      />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {/* Bọc toàn bộ ứng dụng bằng HashRouter */}
        <Router>
          <AppRoutes />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;