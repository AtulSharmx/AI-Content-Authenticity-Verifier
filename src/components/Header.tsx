import { Shield } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                AI Content Authenticity Verifier
              </h1>
              <p className="text-xs text-gray-500">
                Advanced Detection for Images & Text
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
