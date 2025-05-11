export interface Activity {
    id: number;
    title: string;
    startTime: string;
    endTime: string;
    partner: 'me' | 'you' | 'both';
    notes: string;
    color: string;
  }