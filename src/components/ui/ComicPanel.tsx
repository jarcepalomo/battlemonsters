import React from 'react';
import { Loader2, AlertCircle, RefreshCw, Zap, Image, Sword, Skull } from 'lucide-react';

interface BattlePanelData {
  id: string;
  imageUrl?: string;
  isGenerating: boolean;
  error: boolean;
  description: string;
  prompt: string;
  aspectRatio?: string;
  isPlaceholder?: boolean;
  isVillainAction?: boolean;
}

interface ComicPanelProps {
  panel: BattlePanelData;
  index: number;
  onRetry: () => void;
  demoMode?: boolean;
}

export function ComicPanel({ panel, index, onRetry, demoMode = false }: ComicPanelProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Panel Number Badge */}
      <div className="absolute -top-3 -left-3 z-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 border-white shadow-lg">
        {index + 1}
      </div>

      {/* Comic Panel - Takes most of the height */}
      <div className="flex-1 bg-gray-800/50 rounded-t-xl border-4 border-b-0 border-purple-500/30 overflow-hidden shadow-xl relative">
        {panel.isPlaceholder ? (
          // Demo Mode Placeholder
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-900/20 to-pink-900/20">
            {panel.isVillainAction ? <Skull className="w-16 h-16 text-red-400 mb-4" /> : <Sword className="w-16 h-16 text-purple-400 mb-4" />}
            <p className="text-purple-300 text-center px-4 font-medium text-lg">
              Demo Panel #{index + 1}
            </p>
            <p className="text-purple-400 text-center px-4 text-sm mt-2">
              {panel.isVillainAction ? 'Villain Action' : 'Hero Action'}
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
            <div className="absolute inset-0 border-4 border-white/20 rounded-t-lg pointer-events-none"></div>
            
            {/* Action Type Indicator */}
            {panel.isVillainAction && (
              <div className="absolute top-2 right-2 bg-red-600/80 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Skull className="w-3 h-3" />
                Villain
              </div>
            )}
          </>
        ) : null}
      </div>

      {/* Panel Description - Seamlessly attached to bottom with fixed height */}
      <div className="h-16 p-2 bg-gray-800/30 rounded-b-xl border-4 border-t-0 border-purple-500/20 flex items-center justify-center">
        <p className="text-purple-200 text-xs text-center font-medium leading-tight line-clamp-3 overflow-hidden">
          {panel.description}
        </p>
      </div>
    </div>
  );
}