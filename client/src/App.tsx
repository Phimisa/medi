import { Switch, Route } from "wouter";
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

function Router() {
  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("Siêu Âm Trăng Đen + Điện Tim");
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

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
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          selectedDepartment={selectedDepartment}
          onDepartmentClick={() => setIsDepartmentModalOpen(true)}
        />
        <main className="flex-1 overflow-auto">
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/patient-management" component={PatientManagement} />
            <Route 
              path="/patient-list" 
              component={() => (
                <PatientList 
                  onViewPatient={openPatientDetails}
                  onEditPatient={editPatient}
                />
              )} 
            />
            <Route component={NotFound} />
          </Switch>
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
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
