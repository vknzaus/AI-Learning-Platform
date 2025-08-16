import { Button, Card } from './ui';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  onTestConnection?: () => void;
  showTestConnection?: boolean;
}

export const ErrorState = ({ 
  title = "Connection Error",
  message, 
  onRetry, 
  onTestConnection,
  showTestConnection = true 
}: ErrorStateProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <div className="p-8 text-center">
          {/* Error Icon */}
          <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <div className="text-3xl text-red-600">⚠️</div>
          </div>

          {/* Error Content */}
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {title}
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {message}
          </p>

          {/* Actions */}
          <div className="space-y-3">
            {onRetry && (
              <Button 
                variant="primary" 
                size="md"
                onClick={onRetry}
                className="w-full"
              >
                Try Again
              </Button>
            )}
            
            {showTestConnection && onTestConnection && (
              <Button 
                variant="outline" 
                size="md"
                onClick={onTestConnection}
                className="w-full"
              >
                Test Connection
              </Button>
            )}
          </div>

          {/* Help Text */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              If the problem persists, check your network connection or contact support.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
