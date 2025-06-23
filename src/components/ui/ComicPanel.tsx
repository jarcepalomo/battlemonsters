import React from 'react';
import { Loader2, AlertCircle, RefreshCw, Zap, Image, Plus } from 'lucide-react';

interface BattlePanelData {
  id: string;
  imageUrl?: string;
  isGenerating: boolean;
  error: boolean;
  description: string;
  prompt: string;
  aspectRatio?: string;
  isPlaceholder?: boolean;
  isSkeleton?: boolean;
}

interface ComicPanelProps {
  panel: BattlePanelData;
  index: number;
  onRetry: () => void;
  demoMode?: boolean;
}

export function ComicPanel({ panel, index, onRetry, demoMode = false }: ComicPanelProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Comic Panel - Takes most of the height */}
      <div className="flex-1 bg-gray-800/50 rounded-xl border-4 border-purple-500/30 overflow-hidden shadow-xl relative">
        {panel.isSkeleton ? (
          // Skeleton placeholder for upcoming panels
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-800/30 to-gray-700/30 border-2 border-dashed border-gray-600/50">
            <Plus className="w-12 h-12 text-gray-500 mb-3" />
            <p className="text-gray-500 text-center px-4 font-medium">
              Panel #{index + 1}
            </p>
            <p className="text-gray-600 text-xs text-center mt-1">
              Coming Soon
            </p>
          </div>
        ) : panel.isPlaceholder ? (
          // Demo Mode Placeholder
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-900/20 to-pink-900/20">
            <Image className="w-16 h-16 text-purple-400 mb-4" />
            <p className="text-purple-300 text-center px-4 font-medium text-lg">
              Demo Panel #{index + 1}
            </p>
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

      {/* Panel Description - Fixed height */}
      {!panel.isSkeleton && (
        <div className="mt-3 p-3 bg-gray-800/30 rounded-lg border border-purple-500/20 h-20 flex items-center">
          <p className="text-purple-200 text-sm text-center font-medium leading-relaxed w-full line-clamp-3">
            {panel.description}
          </p>
        </div>
      )}
    </div>
  );
}