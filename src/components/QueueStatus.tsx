
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface QueueItem {
  id: number;
  department: string;
  waiting: number;
  total: number;
  averageWaitTime: number;
}

interface QueueStatusProps {
  data: QueueItem[];
  unit: string;
}

const QueueStatus: React.FC<QueueStatusProps> = ({ data, unit }) => {
  // Mock health unit data - should match HealthUnitFilter
  const healthUnits = [
    { value: "all", label: "All Units" },
    { value: "central-hospital", label: "Central Hospital" },
    { value: "north-clinic", label: "North Clinic" },
    { value: "south-medical-center", label: "South Medical Center" },
    { value: "east-health-facility", label: "East Health Facility" },
    { value: "west-community-clinic", label: "West Community Clinic" },
  ];

  const getSubtitle = () => {
    if (unit === 'all') return 'All health units';
    return healthUnits.find(u => u.value === unit)?.label || 'All health units';
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Regulation Queue Status</CardTitle>
        <CardDescription>{getSubtitle()}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((item) => (
          <div key={item.id} className="space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{item.department}</p>
              <span className="text-sm text-gray-500">
                {item.waiting} / {item.total}
              </span>
            </div>
            <Progress value={(item.waiting / item.total) * 100} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Avg. wait time: {item.averageWaitTime} minutes
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default QueueStatus;
