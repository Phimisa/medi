import { useState, useEffect } from "react";

export default function CalendarWidget() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN');
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('vi-VN', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const generateCalendarDays = () => {
    const today = new Date();
    const currentDate = today.getDate();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const days = [];

    for (let i = 1; i <= daysInMonth && i <= 14; i++) {
      days.push(i);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const today = new Date().getDate();

  return (
    <div className="glass-morphism rounded-xl text-center card-hover bg-white  p-6 shadow-lg border border-slate-200" data-testid="calendar-widget">
      <p className="text-sm text-slate-600 mb-1">Chào buổi sáng</p>
      <p className="text-2xl font-bold text-slate-900 mb-1" data-testid="current-time">
        {formatTime(currentTime)}
      </p>
      {/* <p className="text-sm text-slate-600 mt-1 mb-4" data-testid="current-date">
        {formatDate(currentTime)}
      </p>
       */}
      {/* Mini Calendar */}
      {/* <div className="mt-4 grid grid-cols-7 gap-1 text-xs">
        {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => (
          <div key={day} className="text-slate-400 p-1">{day}</div>
        ))}
        
        {calendarDays.map((day) => (
          <div 
            key={day}
            className={`p-1 hover:bg-blue-100 rounded cursor-pointer transition-colors ${
              day === today ? "bg-blue-600 text-white font-semibold" : ""
            }`}
            data-testid={`calendar-day-${day}`}
          >
            {day.toString().padStart(2, '0')}
          </div>
        ))}
      </div> */}
    </div>
  );
}
