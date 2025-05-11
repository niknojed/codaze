import React from 'react';
import { Activity } from '@/lib/types/activity';
import { getTimePosition, getActivityDuration } from '@/lib/utils/time';

interface ActivityCardProps {
  activity: Activity;
  onClick: () => void;
}

export function ActivityCard({ activity, onClick }: ActivityCardProps) {
  const left = getTimePosition(activity.startTime);
  const width = getActivityDuration(activity.startTime, activity.endTime);

  if (activity.partner === 'both') {
    return (
      <div
        className={`absolute ${activity.color} rounded-lg p-3 cursor-pointer hover:shadow-lg transition-shadow`}
        style={{
          left: `${left}px`,
          width: `${width}px`,
          minWidth: '160px',
          top: '50%',
          transform: 'translateY(-50%)',
          height: '100px',
          zIndex: 20
        }}
        onClick={onClick}
      >
        <div className="font-medium text-sm">{activity.title}</div>
        <div className="text-xs text-gray-600">
          {activity.startTime} - {activity.endTime}
        </div>
        {activity.notes && (
          <div className="text-xs text-gray-500 mt-1 truncate">{activity.notes}</div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`absolute ${activity.color} rounded-lg p-3 cursor-pointer hover:shadow-lg transition-shadow`}
      style={{
        left: `${left}px`,
        width: `${width}px`,
        minWidth: '160px'
      }}
      onClick={onClick}
    >
      <div className="font-medium text-sm">{activity.title}</div>
      <div className="text-xs text-gray-600">{activity.startTime}</div>
      {activity.notes && (
        <div className="text-xs text-gray-500 mt-1 truncate">{activity.notes}</div>
      )}
    </div>
  );
}