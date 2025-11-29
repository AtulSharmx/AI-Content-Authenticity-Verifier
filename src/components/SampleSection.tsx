import { Sparkles } from 'lucide-react';

interface SampleSectionProps {
  activeTab: 'image' | 'text';
  onSampleSelect: (type: 'ai' | 'human') => void;
}

export default function SampleSection({ activeTab, onSampleSelect }: SampleSectionProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-gray-900">Try Sample Content</h3>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Test the analyzer with pre-loaded {activeTab === 'image' ? 'images' : 'text samples'}
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => onSampleSelect('ai')}
          className="flex-1 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-400 rounded-lg p-4 transition-all duration-200 text-left"
        >
          <div className="font-medium text-gray-900 mb-1">AI-Generated Sample</div>
          <p className="text-xs text-gray-500">
            {activeTab === 'image' ? 'Synthetic image' : 'AI-written text'}
          </p>
        </button>
        <button
          onClick={() => onSampleSelect('human')}
          className="flex-1 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-400 rounded-lg p-4 transition-all duration-200 text-left"
        >
          <div className="font-medium text-gray-900 mb-1">Human-Created Sample</div>
          <p className="text-xs text-gray-500">
            {activeTab === 'image' ? 'Real photograph' : 'Human-written text'}
          </p>
        </button>
      </div>
    </div>
  );
}
