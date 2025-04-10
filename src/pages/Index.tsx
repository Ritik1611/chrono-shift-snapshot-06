
import AuthForm from "@/components/auth/AuthForm";
import { Clock } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Login/Signup form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <AuthForm />
        </div>
      </div>
      
      {/* Right side - Hero section */}
      <div className="flex-1 bg-chrono-primary text-white flex items-center justify-center p-6">
        <div className="max-w-lg animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
              <Clock className="h-8 w-8 text-chrono-primary animate-rotate-clock" />
            </div>
            <h1 className="text-4xl font-bold">Chrono</h1>
          </div>
          
          <h2 className="text-2xl font-bold mb-4">Time-Based Version Control System</h2>
          
          <p className="text-lg mb-6">
            Chrono provides powerful tools for tracking, managing, and restoring system states over time.
            Take snapshots of your EC2 instances, clone environments, and travel through time with ease.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-chrono-secondary flex items-center justify-center mt-1">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Snapshot Management</h3>
                <p className="text-chrono-tertiary">
                  Create, manage and restore system snapshots with a single command
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-chrono-secondary flex items-center justify-center mt-1">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Time Travel</h3>
                <p className="text-chrono-tertiary">
                  Restore your system to any point in time with complete confidence
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-chrono-secondary flex items-center justify-center mt-1">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Cloud Integration</h3>
                <p className="text-chrono-tertiary">
                  Seamlessly works with AWS EC2, EBS, and other cloud providers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
