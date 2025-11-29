import { useState } from 'react';
import { AlertTriangle, CheckCircle, HelpCircle, Download, Eye, EyeOff } from 'lucide-react';
import { ImageAnalysisResult } from '../types';
import HeatmapOverlay from './HeatmapOverlay';
import { generateImageReport, downloadReport } from '../utils/reportGenerator';

interface ImageResultsProps {
  result: ImageAnalysisResult;
  imageUrl: string;
  fileName: string;
}

export default function ImageResults({ result, imageUrl, fileName }: ImageResultsProps) {
  const [showHeatmap, setShowHeatmap] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-red-600';
    if (score <= 30) return 'text-green-600';
    return 'text-yellow-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 70) return 'bg-red-50 border-red-200';
    if (score <= 30) return 'bg-green-50 border-green-200';
    return 'bg-yellow-50 border-yellow-200';
  };

  const getIcon = () => {
    if (result.score >= 70) return <AlertTriangle className="w-8 h-8 text-red-600" />;
    if (result.score <= 30) return <CheckCircle className="w-8 h-8 text-green-600" />;
    return <HelpCircle className="w-8 h-8 text-yellow-600" />;
  };

  const handleDownload = () => {
    const report = generateImageReport(result, fileName);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    downloadReport(report, `image-analysis-${timestamp}.json`);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className={`border-2 rounded-xl p-8 ${getScoreBgColor(result.score)}`}>
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            {getIcon()}
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{result.label}</h3>
              <p className="text-sm text-gray-600 mt-1">
                Confidence: {result.confidence}%
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-5xl font-bold ${getScoreColor(result.score)}`}>
              {result.score}%
            </div>
            <p className="text-xs text-gray-500 mt-1">AI Probability</p>
          </div>
        </div>

        <div className="bg-white bg-opacity-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">Authenticity Score</span>
            <span className="text-sm font-bold text-gray-900">{result.score}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ${
                result.score >= 70
                  ? 'bg-gradient-to-r from-red-500 to-red-600'
                  : result.score <= 30
                  ? 'bg-gradient-to-r from-green-500 to-green-600'
                  : 'bg-gradient-to-r from-yellow-500 to-yellow-600'
              }`}
              style={{ width: `${result.score}%` }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h4 className="font-semibold text-gray-900">Visual Analysis</h4>
          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              showHeatmap
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {showHeatmap ? (
              <>
                <EyeOff className="w-4 h-4" />
                <span>Hide Heatmap</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                <span>Show Heatmap</span>
              </>
            )}
          </button>
        </div>
        <div className="p-6">
          {result.heatmapData && (
            <HeatmapOverlay
              imageUrl={imageUrl}
              heatmapData={result.heatmapData}
              visible={showHeatmap}
            />
          )}
          {showHeatmap && (
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Heatmap Legend:</strong> Red areas indicate regions with higher probability of AI generation. Intensity represents confidence level.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Detection Factors</h4>
        <div className="space-y-3">
          {result.explanations.map((explanation, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              <p className="text-sm text-gray-700 flex-1">{explanation}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Analysis Metadata</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1">Model</p>
            <p className="text-sm font-medium text-gray-900">{result.metadata.modelName}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1">Version</p>
            <p className="text-sm font-medium text-gray-900">{result.metadata.version}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1">Processing Time</p>
            <p className="text-sm font-medium text-gray-900">{result.metadata.processingTime}ms</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1">Image Size</p>
            <p className="text-sm font-medium text-gray-900">{result.metadata.imageSize}</p>
          </div>
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        <Download className="w-5 h-5" />
        <span>Download Analysis Report</span>
      </button>
    </div>
  );
}
