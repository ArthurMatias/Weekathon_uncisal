
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface ServiceChartProps {
  data: Array<{
    name: string;
    served: number;
    waitingTime?: number;
  }>;
  timeframe: string;
  unit: string;
}

const ServiceChart: React.FC<ServiceChartProps> = ({ data, timeframe, unit }) => {
  // Format title based on timeframe
  const getTitle = () => {
    switch (timeframe) {
      case 'day': return 'Patients Served Today';
      case 'week': return 'Patients Served This Week';
      case 'month': return 'Patients Served This Month';
      case 'year': return 'Patients Served This Year';
      default: return 'Patients Served';
    }
  };

  const getSubtitle = () => {
    if (unit === 'all') return 'All health units';
    return healthUnits.find(u => u.value === unit)?.label || 'All health units';
  };

  // Mock data for health unit names - should match HealthUnitFilter
  const healthUnits = [
    { value: "all", label: "All Units" },
    { value: "central-hospital", label: "Central Hospital" },
    { value: "north-clinic", label: "North Clinic" },
    { value: "south-medical-center", label: "South Medical Center" },
    { value: "east-health-facility", label: "East Health Facility" },
    { value: "west-community-clinic", label: "West Community Clinic" },
  ];

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>{getTitle()}</CardTitle>
        <CardDescription>{getSubtitle()}</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorServed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                </linearGradient>
                {data[0]?.waitingTime !== undefined && (
                  <linearGradient id="colorWaiting" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                )}
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="served" 
                name="Patients Served"
                stroke="#0ea5e9" 
                fillOpacity={1} 
                fill="url(#colorServed)" 
              />
              {data[0]?.waitingTime !== undefined && (
                <Area 
                  type="monotone" 
                  dataKey="waitingTime" 
                  name="Avg. Wait Time (min)"
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#colorWaiting)" 
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceChart;
