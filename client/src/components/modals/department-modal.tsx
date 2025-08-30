import { useState } from "react";
import { X, Search, Hospital, Heart, Brain, Bone, Baby, Ambulance, ScissorsIcon, Monitor } from "lucide-react";

interface DepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDepartment: string;
  onSelectDepartment: (department: string) => void;
}

const departments = [
  {
    id: "general-medicine",
    name: "General Medicine",
    description: "Primary care and general consultations",
    icon: Hospital,
    iconColor: "from-blue-500 to-blue-600",
    current: true
  },
  {
    id: "cardiology",
    name: "Cardiology",
    description: "Heart and cardiovascular care",
    icon: Heart,
    iconColor: "from-red-500 to-red-600"
  },
  {
    id: "neurology",
    name: "Neurology",
    description: "Brain and nervous system care",
    icon: Brain,
    iconColor: "from-purple-500 to-purple-600"
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    description: "Bone and joint treatment",
    icon: Bone,
    iconColor: "from-teal-500 to-teal-600"
  },
  {
    id: "pediatrics",
    name: "Pediatrics",
    description: "Children and adolescent care",
    icon: Baby,
    iconColor: "from-pink-500 to-pink-600"
  },
  {
    id: "emergency",
    name: "Emergency Department",
    description: "Critical and urgent care",
    icon: Ambulance,
    iconColor: "from-orange-500 to-orange-600"
  },
  {
    id: "surgery",
    name: "Surgery",
    description: "Surgical procedures and operations",
    icon: ScissorsIcon,
    iconColor: "from-gray-500 to-gray-600"
  },
  {
    id: "icu",
    name: "Intensive Care Unit",
    description: "Critical care monitoring",
    icon: Monitor,
    iconColor: "from-indigo-500 to-indigo-600"
  }
];

export default function DepartmentModal({ isOpen, onClose, selectedDepartment, onSelectDepartment }: DepartmentModalProps) {
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      data-testid="department-modal"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden animate-scale-in">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Select Department</h2>
            <p className="text-slate-600 mt-1">Choose your working department</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            data-testid="close-department-modal"
          >
            <X className="text-slate-500" size={20} />
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="p-6 border-b border-slate-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              data-testid="department-search"
            />
          </div>
        </div>

        {/* Department Grid */}
        <div className="p-6 max-h-96 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDepartments.map((dept) => {
              const Icon = dept.icon;
              const isCurrent = dept.current;
              
              return (
                <div 
                  key={dept.id}
                  onClick={() => onSelectDepartment(dept.name)}
                  className={`card-hover rounded-xl p-4 cursor-pointer border transition-all ${
                    isCurrent
                      ? "bg-blue-50 border-2 border-blue-200"
                      : "bg-white border border-slate-200"
                  }`}
                  data-testid={`department-${dept.id}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${dept.iconColor} rounded-xl flex items-center justify-center`}>
                      <Icon className="text-white" size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">{dept.name}</h3>
                      <p className="text-sm text-slate-600">{dept.description}</p>
                      {isCurrent && (
                        <span className="inline-block mt-2 text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
