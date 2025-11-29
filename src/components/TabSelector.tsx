import { Image, FileText } from 'lucide-react';
import { AnalysisType } from '../types';

interface TabSelectorProps {
  activeTab: AnalysisType;
  onTabChange: (tab: AnalysisType) => void;
}

export default function TabSelector({ activeTab, onTabChange }: TabSelectorProps) {
  return (
    <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
      <button
        onClick={() => onTabChange('image')}
        className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-md font-medium transition-all duration-200 ${
          activeTab === 'image'
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <Image className="w-5 h-5" />
        <span>Image Analyzer</span>
      </button>
      <button
        onClick={() => onTabChange('text')}
        className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-md font-medium transition-all duration-200 ${
          activeTab === 'text'
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <FileText className="w-5 h-5" />
        <span>Text Analyzer</span>
      </button>
    </div>
  );
}
