import React, { useState, useRef, useEffect } from 'react';
import { Send, Wand2 } from 'lucide-react';
import { useGame } from '../context/GameContext';

interface PromptInputProps {
  selectedPrompt?: string;
}

export function PromptInput({ selectedPrompt }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');
  const { dispatch } = useGame();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Update input when a prompt is selected from examples
  useEffect(() => {
    if (selectedPrompt) {
      setPrompt(selectedPrompt);
    }
  }, [selectedPrompt]);

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = 'auto';
      
      // Calculate the number of lines
      const lineHeight = 24; // Approximate line height in pixels
      const padding = 32; // Top and bottom padding (16px each)
      const minHeight = lineHeight + padding; // Minimum height for 1 line
      const maxHeight = (lineHeight * 5) + padding; // Maximum height for 5 lines
      
      // Set height based on content, with min/max constraints
      const scrollHeight = textarea.scrollHeight;
      const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
      
      textarea.style.height = `${newHeight}px`;
      
      // Enable/disable scrolling based on content
      if (scrollHeight > maxHeight) {
        textarea.style.overflowY = 'auto';
      } else {
        textarea.style.overflowY = 'hidden';
      }
    }
  }, [prompt]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    dispatch({ type: 'SET_ERROR', payload: null });
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/character-creation`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: prompt.trim() }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create character');
      }

      const character = await response.json();
      dispatch({ type: 'SET_CHARACTER', payload: character });
      setPrompt('');
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Submit on Ctrl/Cmd + Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative">
          <div className="absolute left-3 top-4 text-purple-400 z-10">
            <Wand2 className="w-5 h-5" />
          </div>
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your legendary character..."
            className="w-full pl-12 pr-14 py-4 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm resize-none leading-6"
            style={{ 
              minHeight: '56px', // Minimum height for single line + padding
              maxHeight: '152px' // Maximum height for 5 lines + padding
            }}
            rows={1}
          />
          <button
            type="submit"
            disabled={!prompt.trim()}
            className="absolute right-2 top-4 p-2.5 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-500 hover:to-pink-500 transition-all duration-200 shadow-lg hover:shadow-purple-500/25 z-10"
            title="Submit (Ctrl/Cmd + Enter)"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
      
      {/* Helpful hint */}
      <div className="text-xs text-purple-400/70 text-center">
        <span className="inline-flex items-center gap-1">
          💡 Pro tip: Press <kbd className="px-1.5 py-0.5 bg-gray-700/50 rounded text-purple-300 font-mono text-xs">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-gray-700/50 rounded text-purple-300 font-mono text-xs">Enter</kbd> to submit
        </span>
      </div>
    </div>
  );
}