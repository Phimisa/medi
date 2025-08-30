import { useState } from "react";
import { X, Edit, Save, Phone, MapPin, Calendar, FileText, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PatientDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: string | null;
  isEditMode: boolean;
  onToggleEditMode: () => void;
}

// Mock patient data - in real app this would come from API
const getPatientData = (id: string) => ({
  id: "25070675",
  recordId: "0005199/25",
  fullName: "Tran Minh Thuan",
  gender: "Male",
  birthYear: "2002",
  phone: "0901234567",
  address: "Ho Chi Minh City",
  lastVisit: "August 26, 2025",
  lastUpdate: "August 29, 2025",
  notes: "Patient requires follow-up examination within the next 2 weeks. Monitor blood pressure and review current medications."
});

export default function PatientDetailsModal({ 
  isOpen, 
  onClose, 
  patientId, 
  isEditMode, 
  onToggleEditMode 
}: PatientDetailsModalProps) {
  const [formData, setFormData] = useState(getPatientData(patientId || ""));

  if (!isOpen || !patientId) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSave = () => {
    // TODO: Implement save logic
    console.log('Saving patient data:', formData);
    onToggleEditMode();
  };

  const handleCancel = () => {
    setFormData(getPatientData(patientId));
    onToggleEditMode();
  };

  return (
    <div 
      className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      data-testid="patient-details-modal"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="text-blue-600" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Patient Details</h2>
              <p className="text-slate-600">ID: {formData.id} • Record: {formData.recordId}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!isEditMode ? (
              <Button 
                onClick={onToggleEditMode}
                className="btn-primary text-white"
                data-testid="edit-patient-button"
              >
                <Edit size={16} className="mr-2" />
                Edit
              </Button>
            ) : (
              <Button 
                onClick={handleCancel}
                variant="outline"
                data-testid="cancel-edit-button"
              >
                Cancel
              </Button>
            )}
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              data-testid="close-patient-modal"
            >
              <X className="text-slate-500" size={20} />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-6">Basic Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  {isEditMode ? (
                    <Input 
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      data-testid="input-full-name"
                    />
                  ) : (
                    <p className="text-slate-900 font-medium" data-testid="display-full-name">
                      {formData.fullName}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Gender</label>
                    {isEditMode ? (
                      <Select 
                        value={formData.gender} 
                        onValueChange={(value) => setFormData({...formData, gender: value})}
                      >
                        <SelectTrigger data-testid="select-gender">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-slate-900" data-testid="display-gender">{formData.gender}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Birth Year</label>
                    {isEditMode ? (
                      <Input 
                        type="number"
                        value={formData.birthYear}
                        onChange={(e) => setFormData({...formData, birthYear: e.target.value})}
                        data-testid="input-birth-year"
                      />
                    ) : (
                      <p className="text-slate-900" data-testid="display-birth-year">{formData.birthYear}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                  {isEditMode ? (
                    <Input 
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      data-testid="input-phone"
                    />
                  ) : (
                    <p className="text-slate-900 flex items-center space-x-2">
                      <Phone className="text-slate-400" size={16} />
                      <span data-testid="display-phone">{formData.phone}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
                  {isEditMode ? (
                    <Textarea 
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      rows={3}
                      data-testid="input-address"
                    />
                  ) : (
                    <p className="text-slate-900 flex items-center space-x-2">
                      <MapPin className="text-slate-400" size={16} />
                      <span data-testid="display-address">{formData.address}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Medical Information */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-6">Medical Information</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-blue-800 mb-1">Patient ID</p>
                  <p className="text-lg font-bold text-blue-900" data-testid="patient-id">{formData.id}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-green-800 mb-1">Record ID</p>
                  <p className="text-lg font-bold text-green-900" data-testid="record-id">{formData.recordId}</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="mb-6">
                <h4 className="font-semibold text-slate-900 mb-4">Recent Activity</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                    <Calendar className="text-blue-600" size={20} />
                    <div>
                      <p className="font-medium text-slate-900">Last Visit</p>
                      <p className="text-sm text-slate-600" data-testid="last-visit">{formData.lastVisit}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                    <FileText className="text-green-600" size={20} />
                    <div>
                      <p className="font-medium text-slate-900">Medical Record Updated</p>
                      <p className="text-sm text-slate-600" data-testid="last-update">{formData.lastUpdate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medical Notes */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Medical Notes</label>
                {isEditMode ? (
                  <Textarea 
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows={4}
                    className="bg-yellow-50"
                    placeholder="Enter medical notes..."
                    data-testid="input-medical-notes"
                  />
                ) : (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-amber-800 mb-2">Medical Notes</h4>
                    <p className="text-sm text-amber-700" data-testid="display-medical-notes">{formData.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer - Only show when in edit mode */}
        {isEditMode && (
          <div className="p-6 border-t border-slate-200 flex justify-end space-x-4">
            <Button 
              onClick={handleCancel}
              variant="outline"
              data-testid="cancel-changes-button"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white"
              data-testid="save-changes-button"
            >
              <Save size={16} className="mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
