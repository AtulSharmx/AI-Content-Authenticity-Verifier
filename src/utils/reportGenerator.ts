import { ImageAnalysisResult, TextAnalysisResult } from '../types';

export function generateImageReport(result: ImageAnalysisResult, fileName: string): string {
  const report = {
    reportType: 'AI Content Authenticity Analysis - Image',
    timestamp: new Date().toISOString(),
    fileName,
    analysis: {
      authenticityScore: result.score,
      classification: result.label,
      confidence: result.confidence,
      explanations: result.explanations,
    },
    metadata: result.metadata,
    disclaimer: 'This report provides simulated AI analysis for demonstration purposes only.',
  };

  return JSON.stringify(report, null, 2);
}

export function generateTextReport(result: TextAnalysisResult, textPreview: string): string {
  const report = {
    reportType: 'AI Content Authenticity Analysis - Text',
    timestamp: new Date().toISOString(),
    textPreview: textPreview.substring(0, 200) + (textPreview.length > 200 ? '...' : ''),
    analysis: {
      authenticityScore: result.score,
      classification: result.label,
      confidence: result.confidence,
      reasons: result.reasons,
    },
    metadata: result.metadata,
    disclaimer: 'This report provides simulated AI analysis for demonstration purposes only.',
  };

  return JSON.stringify(report, null, 2);
}

export function downloadReport(content: string, fileName: string): void {
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
