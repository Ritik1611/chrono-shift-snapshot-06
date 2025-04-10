
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, Clock, CloudLightning, FileText, History, XCircle, Hourglass, Sparkles } from "lucide-react";
import { TimeAxis } from "@/components/timeline/TimeAxis";
import { CapsuleList } from "@/components/timeline/CapsuleList";
import { FileVersions } from "@/components/timeline/FileVersions";
import { toast } from "@/hooks/use-toast";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

// Mock data for timeline events
const timelineEvents = [
  { 
    id: 1, 
    type: "snapshot", 
    status: "successful", 
    timestamp: "2025-04-10T09:30:00", 
    message: "Instance snapshot created", 
    details: "EC2-i-87654 • 2.4 GB" 
  },
  { 
    id: 2, 
    type: "deployment", 
    status: "successful", 
    timestamp: "2025-04-09T18:45:00", 
    message: "Production deployment", 
    details: "Release v2.4.0" 
  },
  { 
    id: 3, 
    type: "config", 
    status: "successful", 
    timestamp: "2025-04-09T16:20:00", 
    message: "Configuration updated", 
    details: "Changed memory allocation" 
  },
  { 
    id: 4, 
    type: "snapshot", 
    status: "successful", 
    timestamp: "2025-04-09T14:15:00", 
    message: "Instance snapshot created", 
    details: "EC2-i-87654 • 2.3 GB" 
  },
  { 
    id: 5, 
    type: "snapshot", 
    status: "successful", 
    timestamp: "2025-04-08T11:45:00", 
    message: "Instance snapshot created", 
    details: "EC2-i-87654 • 2.3 GB" 
  },
  { 
    id: 6, 
    type: "deployment", 
    status: "failed", 
    timestamp: "2025-04-08T10:30:00", 
    message: "Deployment failed", 
    details: "Missing dependencies" 
  },
  { 
    id: 7, 
    type: "snapshot", 
    status: "failed", 
    timestamp: "2025-04-07T16:20:00", 
    message: "Snapshot creation failed", 
    details: "Insufficient permissions" 
  },
  { 
    id: 8, 
    type: "config", 
    status: "successful", 
    timestamp: "2025-04-07T13:10:00", 
    message: "Security group updated", 
    details: "Added new inbound rule" 
  },
  { 
    id: 9, 
    type: "snapshot", 
    status: "successful", 
    timestamp: "2025-04-06T08:10:00", 
    message: "Instance snapshot created", 
    details: "EC2-i-87654 • 2.2 GB" 
  },
];

// Mock data for capsules
const capsules = [
  {
    id: 1,
    capsule_name: "Production v1.0.0",
    capsule_time: "2025-04-10T09:30:00",
    updated_at: "2025-04-10T09:35:00"
  },
  {
    id: 2,
    capsule_name: "Development Branch",
    capsule_time: "2025-04-09T16:20:00",
    updated_at: "2025-04-09T16:25:00"
  },
  {
    id: 3,
    capsule_name: "Feature X Stable",
    capsule_time: "2025-04-08T11:45:00",
    updated_at: "2025-04-08T11:50:00"
  }
];

// Mock data for file versions
const fileVersions = [
  {
    filename: "server.py",
    versions: [
      { 
        time_mark: "2025-04-10T09:30:00", 
        version: "v1.2.0",
        base: false 
      },
      { 
        time_mark: "2025-04-09T16:20:00", 
        version: "v1.1.0",
        base: false 
      },
      { 
        time_mark: "2025-04-08T11:45:00",

        version: "v1.0.0",
        base: true 
      }
    ]
  },
  {
    filename: "config.json",
    versions: [
      { 
        time_mark: "2025-04-09T18:45:00", 
        version: "v2.0.0",
        base: false 
      },
      { 
        time_mark: "2025-04-08T10:30:00", 
        version: "v1.0.0",
        base: true 
      }
    ]
  },
  {
    filename: "app.js",
    versions: [
      { 
        time_mark: "2025-04-10T09:30:00", 
        version: "v3.0.0",
        base: false 
      },
      { 
        time_mark: "2025-04-09T16:20:00", 
        version: "v2.0.0",
        base: false 
      },
      { 
        time_mark: "2025-04-08T11:45:00", 
        version: "v1.0.0",
        base: true 
      }
    ]
  }
];

export default function Timeline() {
  const [filter, setFilter] = useState("all");
  const [selectedTimePoint, setSelectedTimePoint] = useState("");
  const [activeTab, setActiveTab] = useState("events");
  
  // Format date in a time-focused way
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      weekday: 'short',
      hour: '2-digit', 
      minute: '2-digit' 
    }).format(date);
  };
  
  // Get icon based on event type
  const getEventIcon = (type: string) => {
    switch (type) {
      case "snapshot":
        return <Clock className="h-5 w-5" />;
      case "deployment":
        return <CloudLightning className="h-5 w-5" />;
      case "config":
        return <FileText className="h-5 w-5" />;
      default:
        return <History className="h-5 w-5" />;
    }
  };

  const handleTimePointSelect = (timePoint: string) => {
    setSelectedTimePoint(timePoint);
    toast({
      title: "Time point selected",
      description: `You've selected time point: ${formatDate(timePoint)}`,
    });
  };
  
  // Filter events based on selected tab
  const filteredEvents = filter === "all" 
    ? timelineEvents 
    : timelineEvents.filter(event => event.type === filter);
  
  useEffect(() => {
    // Set the first event's timestamp as default selected time point
    if (timelineEvents.length > 0 && !selectedTimePoint) {
      setSelectedTimePoint(timelineEvents[0].timestamp);
    }
  }, []);

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header with time travel theme */}
        <div className="relative z-10 mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-lg -z-10 blur-xl"></div>
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-primary/20 rounded-full blur-xl opacity-60 time-pulse"></div>
          <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-secondary/20 rounded-full blur-xl opacity-60 time-pulse"></div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text">
                Chrono Timeline
              </h1>
              <p className="text-muted-foreground">
                Navigate through your system's history across time and space
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Calendar className="h-4 w-4" />
                <span>Filter by Date</span>
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="secondary" size="sm" className="gap-2 time-warp">
                    <Hourglass className="h-4 w-4 chrono-spin" />
                    <span>Time Controls</span>
                  </Button>
                </SheetTrigger>
                <SheetContent className="sm:max-w-md">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold time-gradient-text">Chrono Control Panel</h3>
                      <p className="text-sm text-muted-foreground">Manage your time travel operations</p>
                    </div>
                    <div className="space-y-4">
                      <div className="time-shimmer">
                        <h4 className="text-sm font-medium mb-2">Create Time Capsule</h4>
                        <div className="space-y-2">
                          <input 
                            type="text" 
                            placeholder="Capsule Name"
                            className="w-full px-3 py-2 border border-input bg-background rounded-md" 
                          />
                          <Button className="w-full time-warp">Create Capsule at Current Time Point</Button>
                        </div>
                      </div>
                      
                      <div className="time-shimmer">
                        <h4 className="text-sm font-medium mb-2">Jump to Time Point</h4>
                        <div className="space-y-2">
                          <input 
                            type="datetime-local" 
                            className="w-full px-3 py-2 border border-input bg-background rounded-md" 
                          />
                          <Button variant="secondary" className="w-full time-warp">Time Jump</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
        
        {/* Time Axis Visualization */}
        <TimeAxis 
          events={timelineEvents}
          selectedTimePoint={selectedTimePoint}
          onSelectTimePoint={handleTimePointSelect}
        />
        
        {/* Main Content Tabs */}
        <Tabs defaultValue="events" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between">
            <TabsList className="grid grid-cols-3 w-[400px]">
              <TabsTrigger value="events" className="data-[state=active]:time-shimmer">Events</TabsTrigger>
              <TabsTrigger value="capsules" className="data-[state=active]:time-shimmer">Capsules</TabsTrigger>
              <TabsTrigger value="files" className="data-[state=active]:time-shimmer">File Versions</TabsTrigger>
            </TabsList>
          </div>

          {/* Events Tab */}
          <TabsContent value="events" className="mt-6 relative space-y-6">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all" onClick={() => setFilter("all")}>All Events</TabsTrigger>
                <TabsTrigger value="snapshot" onClick={() => setFilter("snapshot")}>Snapshots</TabsTrigger>
                <TabsTrigger value="deployment" onClick={() => setFilter("deployment")}>Deployments</TabsTrigger>
                <TabsTrigger value="config" onClick={() => setFilter("config")}>Configurations</TabsTrigger>
              </TabsList>
            </div>
            
            <div className="timeline-connector -z-10"></div>
            
            <div className="space-y-8">
              {filteredEvents.map((event) => (
                <div key={event.id} className="relative pl-10 animate-fade-in" style={{ animationDelay: `${event.id * 100}ms` }}>
                  <div className="timeline-dot">
                    {selectedTimePoint === event.timestamp && (
                      <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-75"></span>
                    )}
                  </div>
                  
                  <Card 
                    className={`border-l-4 ${
                      event.status === "successful" ? "border-l-green-500" : "border-l-red-500"
                    } hover:shadow-md transition-all ${selectedTimePoint === event.timestamp ? 'ring-2 ring-primary time-shimmer' : ''}`}
                    onClick={() => handleTimePointSelect(event.timestamp)}>
                    <CardHeader className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <span className="p-1 rounded-md bg-muted inline-flex">
                            {getEventIcon(event.type)}
                          </span>
                          {event.message}
                          {event.status === "successful" ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                        </CardTitle>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(event.timestamp)}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2 px-4">
                      <p className="text-sm text-muted-foreground">{event.details}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
            
            {filteredEvents.length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No {filter} events found</p>
              </div>
            )}
            
            <div className="mt-6 text-center">
              <Button variant="outline" className="time-shimmer">Load More</Button>
            </div>
          </TabsContent>
          
          {/* Capsules Tab */}
          <TabsContent value="capsules" className="mt-6">
            <CapsuleList 
              capsules={capsules}
              selectedTimePoint={selectedTimePoint}
              onSelectTimePoint={handleTimePointSelect}
            />
          </TabsContent>
          
          {/* Files Tab */}
          <TabsContent value="files" className="mt-6">
            <FileVersions 
              files={fileVersions}
              selectedTimePoint={selectedTimePoint}
              onSelectTimePoint={handleTimePointSelect}
            />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
