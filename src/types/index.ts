export interface ImageAnalysisResult {
  score: number;
  label: 'Likely AI-Generated' | 'Likely Human-Created' | 'Uncertain';
  confidence: number;
  explanations: string[];
  metadata: {
    processingTime: number;
    modelName: string;
    version: string;
    imageSize: string;
  };
  heatmapData?: number[][];
}

export interface TextAnalysisResult {
  score: number;
  label: 'Likely AI-Generated' | 'Likely Human-Written' | 'Uncertain';
  confidence: number;
  reasons: Array<{
    factor: string;
    description: string;
    confidence: number;
  }>;
  metadata: {
    processingTime: number;
    modelName: string;
    version: string;
    wordCount: number;
    characterCount: number;
  };
}

export type AnalysisType = 'image' | 'text';
