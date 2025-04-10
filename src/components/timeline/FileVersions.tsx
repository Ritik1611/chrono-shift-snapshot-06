
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "@/hooks/use-toast";
import { Check, FileText, RotateCcw, Clock } from "lucide-react";

interface FileVersion {
  time_mark: string;
  version: string;
  base: boolean;
}

interface FileData {
  filename: string;
  versions: FileVersion[];
}

interface FileVersionsProps {
  files: FileData[];
  selectedTimePoint: string;
  onSelectTimePoint: (timestamp: string) => void;
}

export function FileVersions({ files, selectedTimePoint, onSelectTimePoint }: FileVersionsProps) {
  const [expandedFile, setExpandedFile] = useState<string | null>(null);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  };
  
  const handleCompare = (filename: string, time1: string, time2: string) => {
    toast({
      title: "Comparing Versions",
      description: `Comparing ${filename} between ${formatDate(time1)} and ${formatDate(time2)}`,
    });
  };
  
  const handleTimeJump = (filename: string, timestamp: string, version: string) => {
    onSelectTimePoint(timestamp);
    toast({
      title: "Time Jump",
      description: `Jumped to ${filename} version ${version} (${formatDate(timestamp)})`,
    });
  };

  const getFileIcon = (filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase();
    
    return <FileText className="h-5 w-5" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">File Timeline</h2>
          <p className="text-sm text-muted-foreground">View and restore file versions across time</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Clock className="h-4 w-4" />
          <span>Upload New File</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {files.map((file) => (
          <Card key={file.filename} className="overflow-hidden border hover:border-primary/50 transition-all">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value={file.filename} className="border-0">
                <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/30">
                  <div className="flex items-center gap-3">
                    {getFileIcon(file.filename)}
                    <span className="font-medium">{file.filename}</span>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      {file.versions.length} versions
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-1 p-4 pt-0">
                    <div className="relative">
                      <div className="absolute left-[1.7rem] top-0 bottom-0 w-0.5 bg-muted"></div>
                      
                      {file.versions.map((version, index) => (
                        <div 
                          key={version.time_mark} 
                          className={`relative pl-10 py-3 flex justify-between items-center
                          ${selectedTimePoint === version.time_mark ? 'bg-primary/5 rounded-md' : ''}
                          ${index !== file.versions.length - 1 ? 'mb-2' : ''}`}
                        >
                          <div className="absolute left-7 w-3 h-3 rounded-full bg-primary-foreground border-2 border-primary"></div>
                          
                          <div className="flex flex-col">
                            <div className="flex items-center gap-3">
                              <span className="font-medium">{version.version}</span>
                              {version.base && (
                                <span className="text-xs text-primary-foreground bg-primary px-2 py-0.5 rounded">Base</span>
                              )}
                            </div>
                            <span className="text-sm text-muted-foreground">{formatDate(version.time_mark)}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleCompare(file.filename, version.time_mark, file.versions[0].time_mark)}
                            >
                              Compare
                            </Button>
                            <Button 
                              variant={selectedTimePoint === version.time_mark ? "default" : "secondary"} 
                              size="sm" 
                              className="gap-1"
                              onClick={() => handleTimeJump(file.filename, version.time_mark, version.version)}
                            >
                              {selectedTimePoint === version.time_mark ? (
                                <>
                                  <Check className="h-4 w-4" /> Current
                                </>
                              ) : (
                                <>
                                  <RotateCcw className="h-4 w-4" /> Rewind
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        ))}
      </div>
      
      {files.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No files in the timeline yet.</p>
        </Card>
      )}
    </div>
  );
}
