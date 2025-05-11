import { Header } from '@/components/ui/Header';
import { ScheduleView } from '@/components/schedule/ScheduleView';

export default function Home() {
  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <Header />
      <ScheduleView />
    </div>
  );
}