import React, { useEffect, useState } from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';
import { 
  getRandomCharacterTypes, 
  getRandomPhysicalFeatures, 
  getRandomDistinctiveAttributes,
  getThemeFromCharacterType 
} from '../../data/suggestionData';

interface SuggestionPopupProps {
  isVisible: boolean;
  currentText: string;
  onSuggestionClick: (suggestion: string) => void;
  onClose: () => void;
}

type SuggestionCategory = 'character' | 'features';

interface SuggestionState {
  category: SuggestionCategory;
  suggestions: string[];
  selectedTheme: string;
}

export function SuggestionPopup({ isVisible, currentText, onSuggestionClick, onClose }: SuggestionPopupProps) {
  const [suggestionState, setSuggestionState] = useState<SuggestionState>({
    category: 'character',
    suggestions: [],
    selectedTheme: 'generic'
  });

  // Determine current category and generate appropriate suggestions
  useEffect(() => {
    if (!isVisible) return;

    const text = currentText.toLowerCase().trim();
    
    // Determine which category we should show based on current text
    let newCategory: SuggestionCategory = 'character';
    let newTheme = 'generic';
    
    if (text === '') {
      // Empty text - show character types
      newCategory = 'character';
    } else {
      // Check if we have a character type
      const hasCharacterType = getRandomCharacterTypes(30).some(type => 
        text.includes(type.toLowerCase())
      );
      
      if (hasCharacterType) {
        // Find the character type to determine theme
        const matchedType = getRandomCharacterTypes(30).find(type => 
          text.includes(type.toLowerCase())
        );
        if (matchedType) {
          newTheme = getThemeFromCharacterType(matchedType);
        }
        
        // Show features (mix of physical features and distinctive attributes)
        newCategory = 'features';
      } else {
        // No character type detected, show character types
        newCategory = 'character';
      }
    }

    // Generate suggestions based on category
    let newSuggestions: string[] = [];
    if (newCategory === 'character') {
      newSuggestions = getRandomCharacterTypes(3);
    } else {
      // Mix physical features and distinctive attributes for endless variety
      const physicalFeatures = getRandomPhysicalFeatures(newTheme, 2);
      const distinctiveAttributes = getRandomDistinctiveAttributes(newTheme, 1);
      newSuggestions = [...physicalFeatures, ...distinctiveAttributes].sort(() => 0.5 - Math.random());
    }

    setSuggestionState({
      category: newCategory,
      suggestions: newSuggestions,
      selectedTheme: newTheme
    });
  }, [isVisible, currentText]);

  const handleSuggestionClick = (e: React.MouseEvent, suggestion: string) => {
    // Prevent any form submission or event bubbling
    e.preventDefault();
    e.stopPropagation();
    
    let newText = currentText;
    
    if (suggestionState.category === 'character') {
      // Replace or add character type
      newText = suggestion;
    } else {
      // Add feature (physical or distinctive attribute)
      newText = currentText.trim() + ' ' + suggestion;
    }
    
    onSuggestionClick(newText);
  };

  const getCategoryTitle = () => {
    switch (suggestionState.category) {
      case 'character':
        return 'Choose Character Type';
      case 'features':
        return 'Add More Details';
      default:
        return 'Suggestions';
    }
  };

  const getCategoryIcon = () => {
    switch (suggestionState.category) {
      case 'character':
        return '⚔️';
      case 'features':
        return '✨';
      default:
        return '💡';
    }
  };

  if (!isVisible || suggestionState.suggestions.length === 0) {
    return null;
  }

  return (
    <div className="absolute bottom-full left-0 right-0 mb-2 z-50">
      <div className="bg-gray-900/95 backdrop-blur-sm border border-purple-500/30 rounded-lg shadow-2xl p-4 animate-in slide-in-from-bottom-2 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">{getCategoryIcon()}</span>
            <h3 className="text-sm font-semibold text-purple-200">
              {getCategoryTitle()}
            </h3>
          </div>
          <div className="flex items-center gap-1 text-xs text-purple-400">
            <Sparkles className="w-3 h-3" />
            <span>Enhance</span>
          </div>
        </div>

        {/* Suggestions */}
        <div className="space-y-2">
          {suggestionState.suggestions.map((suggestion, index) => (
            <button
              key={`${suggestionState.category}-${suggestion}-${index}`}
              type="button"
              onClick={(e) => handleSuggestionClick(e, suggestion)}
              className="w-full text-left p-3 bg-gray-800/50 hover:bg-purple-900/30 border border-gray-700/50 hover:border-purple-500/40 rounded-lg transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-purple-200 group-hover:text-purple-100">
                  {suggestion}
                </span>
                <ChevronRight className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}