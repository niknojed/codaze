import React from 'react';
import { Clock } from 'lucide-react';
import { Activity } from '@/lib/types/activity';

interface AvailableTimeSlotsProps {
  activities: Activity[];
  onTimeSlotClick: () => void;
}

const mockSlots = [
  { id: 1, time: "10:00 - 11:00 AM", description: "Both partners free" },
  { id: 2, time: "6:00 - 7:00 PM", description: "Evening window" },
  { id: 3, time: "After 8:00 PM", description: "Evening planning time" }
];

export function AvailableTimeSlots({ activities, onTimeSlotClick }: AvailableTimeSlotsProps) {
  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <h3 className="text-base font-semibold mb-3 flex items-center">
        <Clock className="mr-2" size={18} />
        Available Time Together
      </h3>
      <div className="space-y-2">
        {mockSlots.map((slot) => (
          <div key={slot.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <Clock className="inline mr-2 text-gray-400" size={14} />
              <span className="font-medium text-sm">{slot.time}</span>
              <p className="text-xs text-gray-500 ml-6">{slot.description}</p>
            </div>
            <button
              onClick={onTimeSlotClick}
              className="bg-gray-900 text-white text-sm px-4 py-1.5 rounded-md hover:bg-gray-800"
            >
              Team Up
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}