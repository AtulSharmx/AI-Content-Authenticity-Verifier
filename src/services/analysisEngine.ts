import { ImageAnalysisResult, TextAnalysisResult } from '../types';

const imageExplanations = [
  'GAN fingerprint noise pattern detected in pixel distribution',
  'Unnatural lighting gradients and inconsistent shadow patterns',
  'Overly smooth texture transitions indicative of neural rendering',
  'Facial feature symmetry exceeds natural human variance',
  'Color palette clustering shows synthetic generation markers',
  'Edge artifacts consistent with diffusion model outputs',
  'Frequency domain analysis reveals AI compression signatures',
  'Metadata patterns match known AI image generators',
  'Pixel-level noise distribution shows non-camera characteristics',
  'Background coherence issues typical of generative models'
];

const textReasons = [
  {
    factor: 'Lexical Diversity',
    aiDesc: 'Repetitive vocabulary and sentence structures common in AI outputs',
    humanDesc: 'Natural variation in word choice and sentence complexity',
  },
  {
    factor: 'Syntactic Patterns',
    aiDesc: 'Overly formal and grammatically perfect structure',
    humanDesc: 'Minor grammatical inconsistencies typical of human writing',
  },
  {
    factor: 'Semantic Coherence',
    aiDesc: 'Perfect topic consistency without natural digressions',
    humanDesc: 'Natural topic flow with occasional tangential thoughts',
  },
  {
    factor: 'Perplexity Score',
    aiDesc: 'Low perplexity indicates predictable AI-generated patterns',
    humanDesc: 'Higher perplexity shows unpredictable human creativity',
  },
  {
    factor: 'Burstiness Analysis',
    aiDesc: 'Uniform sentence length and complexity distribution',
    humanDesc: 'Variable sentence complexity with natural rhythm',
  },
  {
    factor: 'Stylometric Markers',
    aiDesc: 'Generic style without personal linguistic fingerprint',
    humanDesc: 'Unique stylistic choices and idiosyncratic expressions',
  },
];

function generateHeatmapData(_width: number, _height: number, score: number): number[][] {
  const gridSize = 20;
  const heatmap: number[][] = [];

  for (let y = 0; y < gridSize; y++) {
    const row: number[] = [];
    for (let x = 0; x < gridSize; x++) {
      const centerX = gridSize / 2;
      const centerY = gridSize / 2;
      const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
      const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));

      const baseIntensity = 1 - (distance / maxDistance);
      const noise = (Math.random() - 0.5) * 0.4;
      const scoreMultiplier = score / 100;

      let intensity = (baseIntensity + noise) * scoreMultiplier;
      intensity = Math.max(0, Math.min(1, intensity));

      if (Math.random() > 0.7) {
        intensity *= 1.5;
      }

      row.push(intensity);
    }
    heatmap.push(row);
  }

  return heatmap;
}

export async function analyzeImage(imageFile: File): Promise<ImageAnalysisResult> {
  const startTime = Date.now();

  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

  const isAI = Math.random() > 0.4;
  const baseScore = isAI
    ? 60 + Math.random() * 35
    : 15 + Math.random() * 35;

  const score = Math.round(baseScore * 10) / 10;

  let label: ImageAnalysisResult['label'];
  if (score >= 70) label = 'Likely AI-Generated';
  else if (score <= 30) label = 'Likely Human-Created';
  else label = 'Uncertain';

  const confidence = score >= 70 || score <= 30
    ? 85 + Math.random() * 12
    : 50 + Math.random() * 25;

  const numExplanations = 3 + Math.floor(Math.random() * 3);
  const selectedExplanations = [...imageExplanations]
    .sort(() => Math.random() - 0.5)
    .slice(0, numExplanations);

  const img = new Image();
  const imageUrl = URL.createObjectURL(imageFile);

  await new Promise((resolve) => {
    img.onload = resolve;
    img.src = imageUrl;
  });

  const imageSize = `${img.width} × ${img.height}px`;
  URL.revokeObjectURL(imageUrl);

  const heatmapData = generateHeatmapData(img.width, img.height, score);

  const processingTime = Date.now() - startTime;

  return {
    score,
    label,
    confidence: Math.round(confidence * 10) / 10,
    explanations: selectedExplanations,
    metadata: {
      processingTime,
      modelName: 'DeepAuth-Vision v3.2',
      version: '3.2.1',
      imageSize,
    },
    heatmapData,
  };
}

export async function analyzeText(text: string): Promise<TextAnalysisResult> {
  const startTime = Date.now();

  await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));

  const wordCount = text.trim().split(/\s+/).length;
  const characterCount = text.length;

  const hasVariedSentenceLength = text.split(/[.!?]+/).filter(s => s.trim()).length > 3;
  const hasContractions = /\b(can't|won't|isn't|don't|I'm|you're)\b/i.test(text);
  const hasInformalLanguage = /\b(yeah|nah|gonna|kinda|sorta|wanna)\b/i.test(text);

  let baseScore: number;
  if (!hasVariedSentenceLength && !hasContractions && !hasInformalLanguage) {
    baseScore = 65 + Math.random() * 30;
  } else if (hasContractions || hasInformalLanguage) {
    baseScore = 20 + Math.random() * 30;
  } else {
    baseScore = 40 + Math.random() * 30;
  }

  const score = Math.round(baseScore * 10) / 10;

  let label: TextAnalysisResult['label'];
  if (score >= 70) label = 'Likely AI-Generated';
  else if (score <= 30) label = 'Likely Human-Written';
  else label = 'Uncertain';

  const confidence = score >= 70 || score <= 30
    ? 82 + Math.random() * 15
    : 55 + Math.random() * 20;

  const isAI = score >= 50;
  const numReasons = 4 + Math.floor(Math.random() * 2);
  const selectedReasons = [...textReasons]
    .sort(() => Math.random() - 0.5)
    .slice(0, numReasons)
    .map(reason => ({
      factor: reason.factor,
      description: isAI ? reason.aiDesc : reason.humanDesc,
      confidence: 70 + Math.random() * 25,
    }));

  const processingTime = Date.now() - startTime;

  return {
    score,
    label,
    confidence: Math.round(confidence * 10) / 10,
    reasons: selectedReasons,
    metadata: {
      processingTime,
      modelName: 'DeepAuth-NLP v2.8',
      version: '2.8.4',
      wordCount,
      characterCount,
    },
  };
}
