import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  iconColor: string;
  badgeText: string;
  badgeColor: string;
  onClick?: () => void;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor,
  badgeText,
  badgeColor,
  onClick
}: StatsCardProps) {
  return (
    <div 
      className="card-hover bg-white rounded-xl p-6 shadow-lg border border-slate-200"
      onClick={onClick}
      data-testid={`stats-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${iconColor} rounded-xl flex items-center justify-center`}>
          <Icon className="text-white" size={24} />
        </div>
        <span className={`text-xs font-medium ${badgeColor} px-2 py-1 rounded-full`}>
          {badgeText}
        </span>
      </div>
      <h3 className="text-3xl font-bold text-slate-900 mb-1" data-testid="stats-value">
        {value}
      </h3>
      <p className="text-sm text-slate-600">{subtitle}</p>
    </div>
  );
}
