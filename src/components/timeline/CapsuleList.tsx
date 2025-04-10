
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, Clock, Download } from "lucide-react";

interface Capsule {
  id: number;
  capsule_name: string;
  capsule_time: string;
  updated_at: string;
}

interface CapsuleListProps {
  capsules: Capsule[];
  selectedTimePoint: string;
  onSelectTimePoint: (timestamp: string) => void;
}

export function CapsuleList({ capsules, selectedTimePoint, onSelectTimePoint }: CapsuleListProps) {
  const [activeCapule, setActiveCapule] = useState<number | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  };

  const handleActivate = (capsule: Capsule) => {
    setActiveCapule(capsule.id);
    onSelectTimePoint(capsule.capsule_time);
    
    toast({
      title: "Capsule Activated",
      description: `"${capsule.capsule_name}" is now active`,
    });
  };

  const handleRestore = (capsule: Capsule) => {
    toast({
      title: "Starting Restoration",
      description: `Restoring system state from "${capsule.capsule_name}"`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Chrono Capsules</h2>
          <p className="text-sm text-muted-foreground">Preserved system states across time</p>
        </div>
        <Button className="gap-2">
          <Clock className="h-4 w-4" />
          <span>Create New Capsule</span>
        </Button>
      </div>

      <Card className="overflow-hidden border-primary/20">
        <CardHeader className="bg-primary/5 py-3">
          <CardTitle className="text-lg font-medium">Available Capsules</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Name</TableHead>
                <TableHead>Capture Time</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {capsules.map((capsule) => (
                <TableRow key={capsule.id} className={selectedTimePoint === capsule.capsule_time ? "bg-primary/5" : ""}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {activeCapule === capsule.id && <CheckCircle className="h-4 w-4 text-green-500" />}
                      {capsule.capsule_name}
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(capsule.capsule_time)}</TableCell>
                  <TableCell>{formatDate(capsule.updated_at)}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className={activeCapule === capsule.id ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
                      onClick={() => handleActivate(capsule)}
                    >
                      {activeCapule === capsule.id ? "Active" : "Activate"}
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => handleRestore(capsule)}>
                      <Download className="h-4 w-4 mr-1" /> Restore
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="p-4 border rounded-lg bg-muted/40">
        <h3 className="font-medium mb-2">What are Chrono Capsules?</h3>
        <p className="text-sm text-muted-foreground">
          Chrono Capsules preserve your entire system state at a specific point in time. 
          Unlike individual file versioning, capsules allow you to restore your complete 
          environment, including all files, configurations, and application states.
        </p>
      </div>
    </div>
  );
}
