import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { CharacterPortrait } from './ui/CharacterPortrait';
import { ComicPanel } from './ui/ComicPanel';
import { ActionButton } from './ui/ActionButton';
import { CustomSceneInput } from './ui/CustomSceneInput';
import { FinalizeButton } from './ui/FinalizeButton';

interface BattlePanel {
  id: string;
  imageUrl?: string;
  isGenerating: boolean;
  error: boolean;
  description: string;
  prompt: string;
  aspectRatio?: string;
}

export function ComicBattleInterface() {
  const { state } = useGame();
  const { character, opponent } = state;
  
  const [battlePanels, setBattlePanels] = useState<BattlePanel[]>([]);
  const [customScene, setCustomScene] = useState('');
  const [isGeneratingPanel, setIsGeneratingPanel] = useState(false);

  // Suggested actions based on character powers
  const getSuggestedActions = () => {
    if (!character?.powers) return [];
    return character.powers.slice(0, 3).map(power => ({
      label: power.name,
      description: power.description
    }));
  };

  const generateBattlePanel = async (actionDescription: string, isCustom: boolean = false) => {
    if (!character || !opponent || isGeneratingPanel) return;

    setIsGeneratingPanel(true);
    const panelIndex = battlePanels.length;
    const panelId = `panel-${panelIndex}`;

    // Create detailed battle prompt
    const prompt = `Epic fantasy battle comic panel: ${character.character_name} (${character.image_prompt}) ${actionDescription} against ${opponent.character_name} (${opponent.image_prompt}). 
    
    Action: ${actionDescription}. Dynamic combat scene with explosive magical effects, dramatic lighting with sparks and energy, debris flying through the air, fierce expressions, dynamic action poses mid-combat, cinematic battle photography, high contrast lighting, magical effects, destruction and chaos, epic confrontation, comic book art style with vibrant colors.`;

    // Add new panel with loading state
    const newPanel: BattlePanel = {
      id: panelId,
      isGenerating: true,
      error: false,
      description: actionDescription,
      prompt
    };

    setBattlePanels(prev => [...prev, newPanel]);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/character-image`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate battle panel');
      }

      const data = await response.json();
      
      setBattlePanels(prev => {
        const newPanels = [...prev];
        const targetIndex = newPanels.findIndex(p => p.id === panelId);
        if (targetIndex !== -1) {
          newPanels[targetIndex] = {
            ...newPanels[targetIndex],
            imageUrl: data.url,
            aspectRatio: data.aspect_ratio,
            isGenerating: false,
            error: false
          };
        }
        return newPanels;
      });

    } catch (error) {
      console.error('Failed to generate battle panel:', error);
      setBattlePanels(prev => {
        const newPanels = [...prev];
        const targetIndex = newPanels.findIndex(p => p.id === panelId);
        if (targetIndex !== -1) {
          newPanels[targetIndex] = {
            ...newPanels[targetIndex],
            isGenerating: false,
            error: true
          };
        }
        return newPanels;
      });
    } finally {
      setIsGeneratingPanel(false);
      if (isCustom) {
        setCustomScene('');
      }
    }
  };

  const handleActionClick = (action: { label: string; description: string }) => {
    generateBattlePanel(action.description);
  };

  const handleCustomScene = () => {
    if (customScene.trim()) {
      generateBattlePanel(customScene.trim(), true);
    }
  };

  const handleRetryPanel = (panelIndex: number) => {
    const panel = battlePanels[panelIndex];
    if (panel) {
      generateBattlePanel(panel.description);
    }
  };

  const handleFinalizeBattle = () => {
    // Generate final victory/defeat panel
    const finalDescription = "delivers the final decisive blow in an epic conclusion";
    generateBattlePanel(finalDescription);
  };

  if (!character || !opponent) return null;

  const suggestedActions = getSuggestedActions();

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col">
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidepanel - Hero */}
        <div className="w-80 bg-gray-900/50 backdrop-blur-sm border-r border-purple-500/20 p-6 flex flex-col">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="w-48 h-48 rounded-xl overflow-hidden border-4 border-purple-500/50 shadow-2xl">
                {character.image_url ? (
                  <img
                    src={character.image_url}
                    alt={character.character_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
                    <div className="text-6xl">⚔️</div>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                HERO
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white text-center mb-4">
              {character.character_name}
            </h2>
            <p className="text-purple-200 text-sm text-center leading-relaxed">
              {character.description}
            </p>
          </div>
        </div>

        {/* Central Comic Strip Area */}
        <div className="flex-1 flex flex-col">
          <div className="bg-gray-900/50 backdrop-blur-sm border-b border-purple-500/20 p-4">
            <h3 className="text-2xl font-bold text-center text-white flex items-center justify-center gap-3">
              <span className="text-3xl">📚</span>
              Battle Comic Strip
              <span className="text-3xl">⚡</span>
            </h3>
          </div>
          
          {/* Scrollable Comic Panels */}
          <div className="flex-1 overflow-y-auto p-6">
            {battlePanels.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎬</div>
                  <p className="text-xl text-purple-300 mb-2">Ready to Create Your Epic Battle Story?</p>
                  <p className="text-purple-400">Choose an action below to generate your first comic panel!</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {battlePanels.map((panel, index) => (
                  <ComicPanel
                    key={panel.id}
                    panel={panel}
                    index={index}
                    onRetry={() => handleRetryPanel(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidepanel - Villain */}
        <div className="w-80 bg-gray-900/50 backdrop-blur-sm border-l border-purple-500/20 p-6 flex flex-col">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="w-48 h-48 rounded-xl overflow-hidden border-4 border-red-500/50 shadow-2xl">
                {opponent.image_url ? (
                  <img
                    src={opponent.image_url}
                    alt={opponent.character_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-red-600/20 to-orange-600/20 flex items-center justify-center">
                    <div className="text-6xl">💀</div>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                VILLAIN
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white text-center mb-4">
              {opponent.character_name}
            </h2>
            <p className="text-red-200 text-sm text-center leading-relaxed">
              {opponent.description}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Controls - Fixed Height */}
      <div className="bg-gray-900/50 backdrop-blur-sm border-t border-purple-500/20 p-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {suggestedActions.map((action, index) => (
              <ActionButton
                key={index}
                action={action}
                onClick={() => handleActionClick(action)}
                disabled={isGeneratingPanel}
              />
            ))}
          </div>

          {/* Custom Scene Input */}
          <div className="mb-6">
            <CustomSceneInput
              value={customScene}
              onChange={setCustomScene}
              onSubmit={handleCustomScene}
              disabled={isGeneratingPanel}
            />
          </div>

          {/* Finalize Button */}
          <div className="text-center">
            <FinalizeButton
              onClick={handleFinalizeBattle}
              disabled={isGeneratingPanel || battlePanels.length === 0}
              panelCount={battlePanels.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
}