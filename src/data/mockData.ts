
// Mock data for the Health Unit Dashboard

// Service data by different timeframes
export const getDailyServiceData = (unit: string = 'all') => [
  { name: '08:00', served: 12, waitingTime: 15 },
  { name: '09:00', served: 18, waitingTime: 20 },
  { name: '10:00', served: 25, waitingTime: 25 },
  { name: '11:00', served: 20, waitingTime: 18 },
  { name: '12:00', served: 15, waitingTime: 12 },
  { name: '13:00', served: 10, waitingTime: 10 },
  { name: '14:00', served: 22, waitingTime: 14 },
  { name: '15:00', served: 28, waitingTime: 16 },
  { name: '16:00', served: 23, waitingTime: 22 },
  { name: '17:00', served: 18, waitingTime: 20 },
];

export const getWeeklyServiceData = (unit: string = 'all') => [
  { name: 'Mon', served: 120, waitingTime: 18 },
  { name: 'Tue', served: 132, waitingTime: 20 },
  { name: 'Wed', served: 145, waitingTime: 15 },
  { name: 'Thu', served: 155, waitingTime: 17 },
  { name: 'Fri', served: 170, waitingTime: 22 },
  { name: 'Sat', served: 105, waitingTime: 12 },
  { name: 'Sun', served: 80, waitingTime: 10 },
];

export const getMonthlyServiceData = (unit: string = 'all') => [
  { name: 'Week 1', served: 800, waitingTime: 18 },
  { name: 'Week 2', served: 720, waitingTime: 16 },
  { name: 'Week 3', served: 850, waitingTime: 20 },
  { name: 'Week 4', served: 910, waitingTime: 22 },
];

export const getYearlyServiceData = (unit: string = 'all') => [
  { name: 'Jan', served: 3200 },
  { name: 'Feb', served: 3100 },
  { name: 'Mar', served: 3400 },
  { name: 'Apr', served: 3300 },
  { name: 'May', served: 3700 },
  { name: 'Jun', served: 3800 },
  { name: 'Jul', served: 4000 },
  { name: 'Aug', served: 4200 },
  { name: 'Sep', served: 3900 },
  { name: 'Oct', served: 3600 },
  { name: 'Nov', served: 3500 },
  { name: 'Dec', served: 3300 },
];

// Queue status data for different departments
export const getQueueStatusData = (unit: string = 'all') => [
  { id: 1, department: 'Emergency Department', waiting: 8, total: 20, averageWaitTime: 12 },
  { id: 2, department: 'General Practice', waiting: 15, total: 35, averageWaitTime: 25 },
  { id: 3, department: 'Cardiology', waiting: 5, total: 15, averageWaitTime: 30 },
  { id: 4, department: 'Pediatrics', waiting: 7, total: 20, averageWaitTime: 20 },
  { id: 5, department: 'Gynecology', waiting: 6, total: 12, averageWaitTime: 22 },
];

// Summary statistics
export const getSummaryStats = (timeframe: string, unit: string = 'all') => {
  const baseTrends = {
    day: { served: 5.2, wait: -2.3, complete: 4.5, cancel: -1.2 },
    week: { served: 7.8, wait: -4.1, complete: 6.2, cancel: -3.5 },
    month: { served: 12.4, wait: -8.7, complete: 9.8, cancel: -5.6 },
    year: { served: 15.6, wait: -10.2, complete: 14.3, cancel: -8.9 },
  };

  const baseValues = {
    day: { served: 189, wait: 17, complete: 172, cancel: 12 },
    week: { served: 907, wait: 19, complete: 868, cancel: 39 },
    month: { served: 3280, wait: 21, complete: 3150, cancel: 130 },
    year: { served: 42500, wait: 20, complete: 41200, cancel: 1300 },
  };

  return {
    patientsServed: {
      value: baseValues[timeframe as keyof typeof baseValues].served,
      trend: baseTrends[timeframe as keyof typeof baseTrends].served,
    },
    averageWaitTime: {
      value: baseValues[timeframe as keyof typeof baseValues].wait,
      trend: baseTrends[timeframe as keyof typeof baseTrends].wait,
    },
    completedVisits: {
      value: baseValues[timeframe as keyof typeof baseValues].complete,
      trend: baseTrends[timeframe as keyof typeof baseTrends].complete,
    },
    cancelledAppointments: {
      value: baseValues[timeframe as keyof typeof baseValues].cancel,
      trend: baseTrends[timeframe as keyof typeof baseTrends].cancel,
    }
  };
};
