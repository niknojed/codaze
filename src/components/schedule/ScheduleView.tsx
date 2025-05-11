'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { ActivityCard } from './ActivityCard';
import { ActivityModal } from './ActivityModal';
import { AvailableTimeSlots } from './AvailableTimeSlots';
import { Activity } from '@/lib/types/activity';
import { HOUR_WIDTH, TIMELINE_START_HOUR, TOTAL_HOURS, generateTimeSlots } from '@/lib/utils/time';

export function ScheduleView() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [activities, setActivities] = useState<Activity[]>([
    { 
      id: 1, 
      title: "Client Meeting", 
      startTime: "1:00 PM", 
      endTime: "2:00 PM", 
      partner: 'me', 
      notes: "Discuss project requirements",
      color: 'bg-teal-200' 
    },
    { 
      id: 2, 
      title: "Gym", 
      startTime: "3:00 PM", 
      endTime: "4:00 PM", 
      partner: 'me', 
      notes: "Leg day",
      color: 'bg-red-300' 
    },
    { 
      id: 3, 
      title: "School Pickup", 
      startTime: "2:00 PM", 
      endTime: "2:30 PM", 
      partner: 'both', 
      notes: "Don't forget snacks",
      color: 'bg-blue-300' 
    },
    { 
      id: 4, 
      title: "Pilates", 
      startTime: "4:00 PM", 
      endTime: "5:00 PM", 
      partner: 'you', 
      notes: "",
      color: 'bg-gray-100' 
    }
  ]);
  const scheduleRef = useRef<HTMLDivElement>(null);

  const timeSlots = generateTimeSlots();

  // Scroll to current time on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scheduleRef.current) {
        const now = new Date();
        const currentHour = now.getHours();
        
        if (currentHour >= TIMELINE_START_HOUR) {
          const hoursFromStart = currentHour - TIMELINE_START_HOUR;
          const scrollPosition = hoursFromStart * HOUR_WIDTH - 100;
          scheduleRef.current.scrollLeft = Math.max(0, scrollPosition);
        }
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const handleDateChange = (direction: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + direction);
    setSelectedDate(newDate);
  };

  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity);
    setShowActivityModal(true);
  };

  const handleActivitySave = (formData: Partial<Activity>) => {
    if (selectedActivity) {
      // Update existing activity
      setActivities(activities.map(a => 
        a.id === selectedActivity.id ? { 
          ...a, 
          ...formData,
          color: formData.partner === 'both' ? 'bg-blue-300' : 
                 formData.partner === 'me' ? 'bg-teal-200' : 'bg-gray-100'
        } : a
      ));
    } else {
      // Add new activity
      const newActivity: Activity = {
        ...formData as Activity,
        id: Date.now(),
        color: formData.partner === 'both' ? 'bg-blue-300' : 
               formData.partner === 'me' ? 'bg-teal-200' : 'bg-gray-100'
      };
      setActivities([...activities, newActivity]);
    }
    setShowActivityModal(false);
    setSelectedActivity(null);
  };

  const handleActivityDelete = () => {
    if (selectedActivity) {
      setActivities(activities.filter(a => a.id !== selectedActivity.id));
      setShowActivityModal(false);
      setSelectedActivity(null);
    }
  };

  return (
    <>
      {/* Control Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleDateChange(-1)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="font-medium">
            {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
          <button
            onClick={() => handleDateChange(1)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <button
          onClick={() => {
            setSelectedActivity(null);
            setShowActivityModal(true);
          }}
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Schedule View */}
      <div className="bg-white overflow-hidden relative" style={{ height: '220px' }}>
        {/* Fixed Partner Labels */}
        <div className="absolute left-4 top-12 z-30 pointer-events-none">
          <div className="h-20 flex items-center">
            <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
              ME
            </div>
          </div>
          <div className="h-20 flex items-center">
            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
              YOU
            </div>
          </div>
        </div>

        <div className="h-full overflow-x-auto overflow-y-hidden" ref={scheduleRef}>
          <div className="relative" style={{ width: `${TOTAL_HOURS * HOUR_WIDTH}px`, height: '100%' }}>
            {/* Time markers */}
            <div className="absolute top-4 left-0 right-0 h-8">
              {timeSlots.map((time, index) => (
                <div
                  key={index}
                  className="absolute text-sm text-gray-500"
                  style={{ left: `${index * HOUR_WIDTH}px` }}
                >
                  {time}
                </div>
              ))}
            </div>

            {/* Partner lanes */}
            <div className="absolute top-12 left-0 right-0" style={{ height: 'calc(100% - 48px)' }}>
              {/* ME lane */}
              <div className="relative h-20 border-b border-gray-100">
                <div className="absolute top-2 left-0 right-0 h-16">
                  {activities
                    .filter(activity => activity.partner === 'me' || activity.partner === 'both')
                    .map(activity => (
                      <ActivityCard
                        key={activity.id}
                        activity={activity}
                        onClick={() => handleActivityClick(activity)}
                      />
                    ))}
                </div>
              </div>

              {/* YOU lane */}
              <div className="relative h-20">
                <div className="absolute top-2 left-0 right-0 h-16">
                  {activities
                    .filter(activity => activity.partner === 'you' || activity.partner === 'both')
                    .map(activity => (
                      <ActivityCard
                        key={activity.id}
                        activity={activity}
                        onClick={() => handleActivityClick(activity)}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Time Together */}
      <AvailableTimeSlots 
        activities={activities}
        onTimeSlotClick={() => {
          setSelectedActivity(null);
          setShowActivityModal(true);
        }}
      />

      {/* Activity Modal */}
      {showActivityModal && (
        <ActivityModal
          activity={selectedActivity}
          onClose={() => {
            setShowActivityModal(false);
            setSelectedActivity(null);
          }}
          onSave={handleActivitySave}
          onDelete={handleActivityDelete}
        />
      )}
    </>
  );
}
