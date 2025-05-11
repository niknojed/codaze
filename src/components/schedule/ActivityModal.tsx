import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Activity } from '@/lib/types/activity';
import { generateTimeSlots } from '@/lib/utils/time';

interface ActivityModalProps {
  activity: Activity | null;
  onClose: () => void;
  onSave: (activity: Partial<Activity>) => void;
  onDelete: () => void;
}

export function ActivityModal({ activity, onClose, onSave, onDelete }: ActivityModalProps) {
  const [formData, setFormData] = useState({
    title: activity?.title || '',
    startTime: activity?.startTime || '9:00 AM',
    endTime: activity?.endTime || '10:00 AM',
    partner: activity?.partner || 'me',
    notes: activity?.notes || ''
  });

  const timeSlots = generateTimeSlots();

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {activity ? 'Edit Activity' : 'Add Activity'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Activity Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Enter activity name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Who is this for?</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.partner}
              onChange={(e) => setFormData({...formData, partner: e.target.value as 'me' | 'you' | 'both'})}
            >
              <option value="me">Me</option>
              <option value="you">You</option>
              <option value="both">Both of us</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.startTime}
                onChange={(e) => setFormData({...formData, startTime: e.target.value})}
              >
                {timeSlots.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.endTime}
                onChange={(e) => setFormData({...formData, endTime: e.target.value})}
              >
                {timeSlots.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Add any additional notes..."
            />
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            {activity && (
              <button
                onClick={onDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            )}
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {activity ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}