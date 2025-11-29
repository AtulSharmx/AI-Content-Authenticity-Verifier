import { Loader2, Shield } from 'lucide-react';

export default function LoadingAnimation() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full animate-ping opacity-20"></div>
            <div className="relative bg-gradient-to-br from-blue-600 to-cyan-500 p-4 rounded-full">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
              <h3 className="text-xl font-bold text-gray-900">Analyzing Content</h3>
            </div>
            <p className="text-sm text-gray-500">
              Running advanced detection algorithms...
            </p>
          </div>
          <div className="w-full space-y-2">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Processing</span>
              <span>Please wait</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full animate-progress"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
