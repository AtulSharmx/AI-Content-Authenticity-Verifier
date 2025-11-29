import { useState } from 'react';
import { Sparkles, HelpCircle } from 'lucide-react';
import { AnalysisType, ImageAnalysisResult, TextAnalysisResult } from './types';
import { analyzeImage, analyzeText } from './services/analysisEngine';
import { sampleTexts, sampleImageUrls } from './utils/sampleData';
import Header from './components/Header';
import TabSelector from './components/TabSelector';
import ImageUploader from './components/ImageUploader';
import TextInput from './components/TextInput';
import LoadingAnimation from './components/LoadingAnimation';
import ImageResults from './components/ImageResults';
import TextResults from './components/TextResults';
import HelpModal from './components/HelpModal';
import SampleSection from './components/SampleSection';
import Footer from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState<AnalysisType>('image');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [textContent, setTextContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [imageResult, setImageResult] = useState<ImageAnalysisResult | null>(null);
  const [textResult, setTextResult] = useState<TextAnalysisResult | null>(null);
  const [showHelp, setShowHelp] = useState(false);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    const url = URL.createObjectURL(file);
    setImagePreviewUrl(url);
    setImageResult(null);
  };

  const handleImageClear = () => {
    setSelectedImage(null);
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
    }
    setImagePreviewUrl(null);
    setImageResult(null);
  };

  const handleTextChange = (value: string) => {
    setTextContent(value);
    setTextResult(null);
  };

  const handleAnalyze = async () => {
    if (activeTab === 'image' && !selectedImage) return;
    if (activeTab === 'text' && !textContent.trim()) return;

    setIsAnalyzing(true);

    try {
      if (activeTab === 'image' && selectedImage) {
        const result = await analyzeImage(selectedImage);
        setImageResult(result);
      } else if (activeTab === 'text') {
        const result = await analyzeText(textContent);
        setTextResult(result);
      }
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSampleSelect = async (type: 'ai' | 'human') => {
    if (activeTab === 'image') {
      try {
        const imageUrl = type === 'ai' ? sampleImageUrls.ai : sampleImageUrls.human;
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], `sample-${type}.jpg`, { type: 'image/jpeg' });
        handleImageSelect(file);
      } catch (error) {
        console.error('Failed to load sample image:', error);
      }
    } else {
      const text = type === 'ai' ? sampleTexts.ai : sampleTexts.human;
      handleTextChange(text);
    }
  };

  const canAnalyze = activeTab === 'image' ? selectedImage !== null : textContent.trim().length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Detect AI-Generated Content
          </h2>
          <p className="text-gray-600">
            Upload images or paste text to analyze authenticity using advanced detection algorithms
          </p>
          <button
            onClick={() => setShowHelp(true)}
            className="mt-4 inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <HelpCircle className="w-5 h-5" />
            <span>How does this work?</span>
          </button>
        </div>

        <div className="mb-6">
          <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {activeTab === 'image' ? 'Upload Image' : 'Input Text'}
              </h3>

              {activeTab === 'image' ? (
                <ImageUploader
                  onImageSelect={handleImageSelect}
                  selectedImage={selectedImage}
                  onClear={handleImageClear}
                  disabled={isAnalyzing}
                />
              ) : (
                <TextInput
                  value={textContent}
                  onChange={handleTextChange}
                  disabled={isAnalyzing}
                />
              )}
            </div>

            <SampleSection
              activeTab={activeTab}
              onSampleSelect={handleSampleSelect}
            />

            <button
              onClick={handleAnalyze}
              disabled={!canAnalyze || isAnalyzing}
              className={`w-full flex items-center justify-center space-x-2 py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
                canAnalyze && !isAnalyzing
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Sparkles className="w-6 h-6" />
              <span>Analyze Content</span>
            </button>
          </div>

          <div>
            {(imageResult || textResult) && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Analysis Results
                </h3>
                {activeTab === 'image' && imageResult && imagePreviewUrl && (
                  <ImageResults
                    result={imageResult}
                    imageUrl={imagePreviewUrl}
                    fileName={selectedImage?.name || 'image.jpg'}
                  />
                )}
                {activeTab === 'text' && textResult && (
                  <TextResults result={textResult} originalText={textContent} />
                )}
              </div>
            )}

            {!imageResult && !textResult && (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Ready to Analyze
                </h3>
                <p className="text-gray-600">
                  {activeTab === 'image'
                    ? 'Upload an image and click "Analyze Content" to see results'
                    : 'Enter text and click "Analyze Content" to see results'}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {isAnalyzing && <LoadingAnimation />}
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </div>
  );
}

export default App;
