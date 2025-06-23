import React, { useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { BattleStoryScreen } from './BattleStoryScreen';
import { CharacterCard } from './ui/CharacterCard';
import { PowersList } from './ui/PowersList';
import { BattleHeader } from './ui/BattleHeader';
import { VSSection } from './ui/VSSection';
import { getRandomOpponent } from '../data/opponents';
import { DEMO_TIME_MANIPULATOR } from '../data/demoCharacters';

export function BattleScreen() {
  const { state, dispatch } = useGame();
  const { character, opponent, isGeneratingImage, imageGenerationError, selectedPower, demoMode } = state;
  const imageGenerationAttempted = useRef(false);
  const opponentSelected = useRef(false);

  // Select opponent when character is created
  useEffect(() => {
    if (character && !opponent && !opponentSelected.current) {
      opponentSelected.current = true;
      
      if (demoMode) {
        // Use demo opponent
        dispatch({ type: 'SET_OPPONENT', payload: DEMO_TIME_MANIPULATOR });
      } else {
        // Use random opponent
        const randomOpponent = getRandomOpponent();
        dispatch({ type: 'SET_OPPONENT', payload: randomOpponent });
      }
    }
  }, [character, opponent, demoMode, dispatch]);

  // Image generation effect - Skip for demo mode
  useEffect(() => {
    if (demoMode) return; // Skip image generation in demo mode
    
    if (character && !character.image_url && !isGeneratingImage && !imageGenerationError && !imageGenerationAttempted.current) {
      imageGenerationAttempted.current = true;
      const generateImage = async () => {
        dispatch({ type: 'SET_GENERATING_IMAGE', payload: true });
        try {
          const response = await fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/character-image`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ prompt: character.image_prompt }),
            }
          );

          if (!response.ok) {
            throw new Error('Failed to generate image');
          }

          const data = await response.json();
          if (data.url) {
            dispatch({ type: 'SET_CHARACTER_IMAGE', payload: data.url });
          } else {
            throw new Error('No image URL returned');
          }
        } catch (error) {
          console.error('Failed to generate character image:', error);
          dispatch({ type: 'SET_IMAGE_GENERATION_ERROR', payload: true });
        } finally {
          dispatch({ type: 'SET_GENERATING_IMAGE', payload: false });
        }
      };

      generateImage();
    }
  }, [character, isGeneratingImage, imageGenerationError, demoMode, dispatch]);

  // If a power is selected, show the battle story screen
  if (selectedPower !== undefined) {
    return <BattleStoryScreen />;
  }

  if (!character || !opponent) return null;

  const handleAttackSelect = (powerIndex: number) => {
    dispatch({ type: 'SELECT_POWER', payload: powerIndex });
  };

  const handleRetryImageGeneration = () => {
    imageGenerationAttempted.current = false;
    dispatch({ type: 'SET_IMAGE_GENERATION_ERROR', payload: false });
  };

  const getBattleTitle = () => {
    if (demoMode) {
      return "Demo Battle Arena";
    }
    return "Battle Arena";
  };

  const getBattleSubtitle = () => {
    if (demoMode) {
      return "Experience the epic clash between Phoenix Warrior and Time Manipulator!";
    }
    return "Choose your attack to begin the battle!";
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <BattleHeader 
        title={getBattleTitle()} 
        subtitle={getBattleSubtitle()} 
      />

      {demoMode && (
        <div className="mb-6 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg text-center">
          <p className="text-purple-300">
            <strong>Demo Mode:</strong> Showcasing predefined characters with preset abilities and images
          </p>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Player Character */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-purple-200 text-center">Your Character</h3>
          <CharacterCard 
            character={character}
            isPlayer={true}
            isGeneratingImage={!demoMode && isGeneratingImage}
            imageGenerationError={!demoMode && imageGenerationError}
            onRetryImageGeneration={handleRetryImageGeneration}
          />
        </div>

        {/* VS Divider & Powers */}
        <div className="space-y-6">
          <VSSection />
          <PowersList 
            powers={character.powers}
            onPowerSelect={handleAttackSelect}
          />
        </div>

        {/* Opponent Character */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-red-200 text-center">Opponent</h3>
          <CharacterCard character={opponent} />
        </div>
      </div>
    </div>
  );
}