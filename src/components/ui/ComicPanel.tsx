import React from 'react';
import { Loader2, AlertCircle, RefreshCw, Zap, Image } from 'lucide-react';

interface BattlePanelData {
  id: string;
  imageUrl?: string;
  isGenerating: boolean;
  error: boolean;
  description: string;
  prompt: string;
  aspectRatio?: string;
  isPlaceholder?: boolean;
}

interface ComicPanelProps {
  panel: BattlePanelData;
  index: number;
  onRetry: () => void;
  width?: string;
  demoMode?: boolean;
}

export function ComicPanel({ panel, index, onRetry, width = 'w-full', demoMode = false }: ComicPanelProps) {
  return (
    <div className={`relative ${width}`}>
      {/* Comic Panel */}
      <div className="bg-gray-800/50 rounded-xl border-4 border-purple-500/30 overflow-hidden shadow-xl aspect-video relative">
        {panel.isPlaceholder ? (
          // Demo Mode Placeholder
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-900/20 to-pink-900/20">
            <Image className="w-16 h-16 text-purple-400 mb-4" />
            <p className="text-purple-300 text-center px-4 font-medium text-lg">
              Demo Panel #{index + 1}
            </p>
            <div className="flex items-center gap-2 mt-2 text-purple-400 text-sm">
              <span>Placeholder Image</span>
            </div>
          </div>
        ) : panel.isGenerating ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-900/20 to-pink-900/20">
            <Loader2 className="w-12 h-12 text-purple-400 animate-spin mb-4" />
            <p className="text-purple-300 text-center px-4 font-medium">
              Generating Epic Scene...
            </p>
            <div className="flex items-center gap-2 mt-2 text-purple-400 text-sm">
              <Zap className="w-4 h-4" />
              <span>Creating Battle Magic</span>
            </div>
          </div>
        ) : panel.error ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-red-900/20 to-orange-900/20">
            <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
            <p className="text-red-300 text-center mb-4 font-medium">
              Failed to Generate Scene
            </p>
            {!demoMode && (
              <button
                onClick={onRetry}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg transition-all duration-200 font-medium"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
            )}
          </div>
        ) : panel.imageUrl ? (
          <>
            <img
              src={panel.imageUrl}
              alt={`Battle scene ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Comic-style border effect */}
            <div className="absolute inset-0 border-4 border-white/20 rounded-lg pointer-events-none"></div>
          </>
        ) : null}
      </div>

      {/* Panel Description */}
      <div className="mt-3 p-3 bg-gray-800/30 rounded-lg border border-purple-500/20">
        <p className="text-purple-200 text-sm text-center font-medium leading-relaxed">
          {panel.description}
        </p>
        {panel.isPlaceholder && (
          <p className="text-purple-400 text-xs text-center mt-1 italic">
            Demo mode - no image generated
          </p>
        )}
      </div>
    </div>
  );
}