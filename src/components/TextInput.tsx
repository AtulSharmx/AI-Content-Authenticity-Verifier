import { FileText } from 'lucide-react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function TextInput({ value, onChange, disabled = false }: TextInputProps) {
  return (
    <div className="w-full">
      <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-blue-400 transition-colors duration-200">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center space-x-2">
          <FileText className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">
            Text Content
          </span>
        </div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Paste your text here to analyze if it was AI-generated or written by a human..."
          className="w-full h-64 p-4 text-gray-900 placeholder-gray-400 resize-none focus:outline-none disabled:bg-gray-50 disabled:cursor-not-allowed"
        />
        <div className="bg-gray-50 px-4 py-2 border-t border-gray-200 flex justify-between items-center">
          <span className="text-xs text-gray-500">
            {value.length} characters • {value.trim().split(/\s+/).filter(w => w.length > 0).length} words
          </span>
          {value && (
            <button
              onClick={() => onChange('')}
              disabled={disabled}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
