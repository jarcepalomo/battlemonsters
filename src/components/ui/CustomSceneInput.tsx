import React from 'react';
import { Send, Wand2 } from 'lucide-react';

interface CustomSceneInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
}

export function CustomSceneInput({ value, onChange, onSubmit, disabled }: CustomSceneInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !disabled) {
      onSubmit();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="relative">
      <div className="text-center mb-3">
        <h5 className="text-white font-semibold flex items-center justify-center gap-2">
          <Wand2 className="w-5 h-5 text-purple-400" />
          Create Custom Scene
        </h5>
        <p className="text-purple-300 text-sm mt-1">Describe your own epic battle moment</p>
      </div>
      
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your custom scene... (e.g., 'unleashes a devastating combo attack while dodging enemy fire')"
            disabled={disabled}
            className={`w-full p-4 pr-14 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm resize-none ${
              disabled 
                ? 'bg-gray-800/30 cursor-not-allowed' 
                : 'bg-gray-800/50'
            }`}
            rows={3}
            style={{ minHeight: '80px' }}
          />
          <button
            type="submit"
            disabled={!value.trim() || disabled}
            className="absolute right-3 bottom-3 p-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-500 hover:to-pink-500 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
            title="Generate Scene (Ctrl/Cmd + Enter)"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}