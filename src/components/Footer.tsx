import { AlertTriangle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-yellow-900 mb-1">Disclaimer</p>
            <p className="text-sm text-yellow-800">
              This tool provides simulated AI analysis for demonstration purposes only. Results should not be used as definitive proof of content authenticity in critical applications. Always verify important content through multiple sources and professional tools.
            </p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            AI Content Authenticity Verifier © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
