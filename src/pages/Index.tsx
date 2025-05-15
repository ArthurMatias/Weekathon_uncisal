
import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle 
} from 'lucide-react';

import HealthUnitFilter from '@/components/HealthUnitFilter';
import TimeframeSelector from '@/components/TimeframeSelector';
import StatCard from '@/components/StatCard';
import ServiceChart from '@/components/ServiceChart';
import QueueStatus from '@/components/QueueStatus';

import { 
  getDailyServiceData, 
  getWeeklyServiceData, 
  getMonthlyServiceData, 
  getYearlyServiceData, 
  getQueueStatusData, 
  getSummaryStats 
} from '@/data/mockData';

const Index = () => {
  const [selectedUnit, setSelectedUnit] = useState('all');
  const [timeframe, setTimeframe] = useState('day');

  // Get the appropriate data based on selected timeframe
  const getServiceData = () => {
    switch (timeframe) {
      case 'day': return getDailyServiceData(selectedUnit);
      case 'week': return getWeeklyServiceData(selectedUnit);
      case 'month': return getMonthlyServiceData(selectedUnit);
      case 'year': return getYearlyServiceData(selectedUnit);
      default: return getDailyServiceData(selectedUnit);
    }
  };

  const queueData = getQueueStatusData(selectedUnit);
  const summaryData = getSummaryStats(timeframe, selectedUnit);
  
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Health Unit Insights</h1>
          <p className="text-gray-500 mt-2">
            Monitor health service metrics and regulation queue across health units
          </p>
        </div>
        
        {/* Filter and Timeframe Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <HealthUnitFilter onFilterChange={setSelectedUnit} />
          <TimeframeSelector value={timeframe} onValueChange={setTimeframe} />
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Patients Served"
            value={summaryData.patientsServed.value}
            description={`vs previous ${timeframe}`}
            icon={<Users className="h-5 w-5" />}
            trend={{
              value: summaryData.patientsServed.trend,
              isPositive: summaryData.patientsServed.trend > 0
            }}
          />
          <StatCard 
            title="Average Wait Time"
            value={`${summaryData.averageWaitTime.value} min`}
            description={`vs previous ${timeframe}`}
            icon={<Clock className="h-5 w-5" />}
            trend={{
              value: summaryData.averageWaitTime.trend,
              isPositive: summaryData.averageWaitTime.trend < 0 // Lower wait time is better
            }}
          />
          <StatCard 
            title="Completed Visits"
            value={summaryData.completedVisits.value}
            description={`vs previous ${timeframe}`}
            icon={<CheckCircle className="h-5 w-5" />}
            trend={{
              value: summaryData.completedVisits.trend,
              isPositive: summaryData.completedVisits.trend > 0
            }}
          />
          <StatCard 
            title="Cancelled Appointments"
            value={summaryData.cancelledAppointments.value}
            description={`vs previous ${timeframe}`}
            icon={<XCircle className="h-5 w-5" />}
            trend={{
              value: summaryData.cancelledAppointments.trend,
              isPositive: summaryData.cancelledAppointments.trend < 0 // Lower cancellations is better
            }}
          />
        </div>
        
        {/* Charts and Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <ServiceChart 
            data={getServiceData()} 
            timeframe={timeframe} 
            unit={selectedUnit}  
          />
          <QueueStatus data={queueData} unit={selectedUnit} />
        </div>
      </div>
    </div>
  );
};

export default Index;
