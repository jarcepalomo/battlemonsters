import React from 'react';
import { Download, Share2, RotateCcw, Trophy, Sparkles } from 'lucide-react';

interface PostBattleControlsProps {
  onDownload: () => void;
  onShare: () => void;
  onRestart: () => void;
  panelCount: number;
}

export function PostBattleControls({ onDownload, onShare, onRestart, panelCount }: PostBattleControlsProps) {
  return (
    <div className="bg-gray-900/95 backdrop-blur-sm border-t border-purple-500/30 shadow-2xl">
      <div className="p-6">
        {/* Victory Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-gradient-to-r from-yellow-900/50 to-red-900/50 backdrop-blur-sm border border-yellow-500/20">
            <Trophy className="w-8 h-8 text-yellow-400" />
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent mb-2">
            Epic Battle Complete!
          </h3>
          <div className="flex items-center justify-center gap-2 text-purple-300 mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">
              {panelCount} panel{panelCount !== 1 ? 's' : ''} of legendary combat created
            </span>
            <Sparkles className="w-4 h-4" />
          </div>
          <p className="text-purple-200 leading-relaxed">
            Your epic battle story is complete! Share your masterpiece or start a new adventure.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Download Comic */}
          <button
            onClick={onDownload}
            className="group relative p-6 rounded-xl border-2 bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-green-500/40 hover:border-green-400/60 text-white hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-4 p-3 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 group-hover:from-green-500 group-hover:to-emerald-500">
                <Download className="w-6 h-6" />
              </div>
              <h5 className="font-bold text-lg mb-2">Download Comic</h5>
              <p className="text-sm opacity-80 leading-relaxed">
                Save your epic battle story as a high-quality image collection
              </p>
            </div>
          </button>

          {/* Share Comic */}
          <button
            onClick={onShare}
            className="group relative p-6 rounded-xl border-2 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-500/40 hover:border-blue-400/60 text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-4 p-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 group-hover:from-blue-500 group-hover:to-cyan-500">
                <Share2 className="w-6 h-6" />
              </div>
              <h5 className="font-bold text-lg mb-2">Share Comic</h5>
              <p className="text-sm opacity-80 leading-relaxed">
                Share your legendary battle with friends and fellow warriors
              </p>
            </div>
          </button>

          {/* Restart */}
          <button
            onClick={onRestart}
            className="group relative p-6 rounded-xl border-2 bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/40 hover:border-purple-400/60 text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-4 p-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 group-hover:from-purple-500 group-hover:to-pink-500">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h5 className="font-bold text-lg mb-2">New Adventure</h5>
              <p className="text-sm opacity-80 leading-relaxed">
                Start fresh with new characters and create another epic tale
              </p>
            </div>
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg">
          <p className="text-purple-300 text-sm text-center leading-relaxed">
            <strong>Tip:</strong> Each battle tells a unique story. Create multiple comics to build your own legendary universe!
          </p>
        </div>
      </div>
    </div>
  );
}