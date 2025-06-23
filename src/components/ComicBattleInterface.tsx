import React, { useState, useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown, Wand2, RotateCcw } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { CharacterPortrait } from './ui/CharacterPortrait';
import { ComicPanel } from './ui/ComicPanel';
import { ActionButton } from './ui/ActionButton';
import { CustomSceneInput } from './ui/CustomSceneInput';
import { FinalizeButton } from './ui/FinalizeButton';
import { RestartModal } from './ui/RestartModal';
import { RegenerateCharacterModal } from './ui/RegenerateCharacterModal';

interface BattlePanel {
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

// Predefined layout patterns for each row
const LAYOUT_PATTERNS = [
  [25, 50, 25], // Panel 1 (1/4), Panel 2 (2/4), Panel 3 (1/4)
  [50, 25, 25], // Panel 1 (2/4), Panel 2 (1/4), Panel 3 (1/4)
  [25, 25, 50], // Panel 1 (1/4), Panel 2 (1/4), Panel 3 (2/4)
  [33.33, 33.33, 33.34], // Panel 1 (1/3), Panel 2 (1/3), Panel 3 (1/3)
];

export function ComicBattleInterface() {
  const { state, dispatch } = useGame();
  const { character, opponent, demoMode } = state;
  
  const [battlePanels, setBattlePanels] = useState<BattlePanel[]>([]);
  const [customScene, setCustomScene] = useState('');
  const [isGeneratingPanel, setIsGeneratingPanel] = useState(false);
  const [suggestedActions, setSuggestedActions] = useState<Array<{ label: string; description: string }>>([]);
  const [isControlsExpanded, setIsControlsExpanded] = useState(true);
  const [showRestartModal, setShowRestartModal] = useState(false);
  const [showRegenerateModal, setShowRegenerateModal] = useState(false);
  const [regenerateTarget, setRegenerateTarget] = useState<'hero' | 'villain' | null>(null);
  
  // Ref for the scrollable comic panels container
  const comicScrollRef = useRef<HTMLDivElement>(null);

  // Initialize suggested actions when character is available
  useEffect(() => {
    if (character?.powers) {
      const initialActions = character.powers.slice(0, 3).map(power => ({
        label: power.name,
        description: power.description
      }));
      setSuggestedActions(initialActions);
    }
  }, [character]);

  // Auto-scroll to bottom when new panels are added
  useEffect(() => {
    if (comicScrollRef.current && battlePanels.length > 0) {
      const scrollContainer = comicScrollRef.current;
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [battlePanels.length]); // Only trigger when panel count changes

  // Function to get a new random action from character powers
  const getRandomAction = (excludeIndex?: number) => {
    if (!character?.powers) return null;
    
    const availablePowers = character.powers.filter((_, index) => index !== excludeIndex);
    if (availablePowers.length === 0) return null;
    
    const randomPower = availablePowers[Math.floor(Math.random() * availablePowers.length)];
    return {
      label: randomPower.name,
      description: randomPower.description
    };
  };

  // Function to get a random villain action
  const getRandomVillainAction = () => {
    if (!opponent?.powers) return null;
    
    const randomPower = opponent.powers[Math.floor(Math.random() * opponent.powers.length)];
    return {
      label: randomPower.name,
      description: randomPower.description
    };
  };

  // Function to replace a specific action with a new random one
  const replaceAction = (actionIndex: number) => {
    const newAction = getRandomAction();
    if (newAction) {
      setSuggestedActions(prev => {
        const newActions = [...prev];
        newActions[actionIndex] = newAction;
        return newActions;
      });
    }
  };

  // Function to get layout pattern for a row
  const getLayoutPattern = (rowIndex: number) => {
    return LAYOUT_PATTERNS[rowIndex % LAYOUT_PATTERNS.length];
  };

  // Function to group panels into rows of 3 with predefined layouts
  const groupPanelsIntoRows = (panels: BattlePanel[]) => {
    const rows = [];
    
    for (let i = 0; i < panels.length; i += 3) {
      const rowPanels = panels.slice(i, i + 3);
      const rowIndex = Math.floor(i / 3);
      const layoutPattern = getLayoutPattern(rowIndex);
      
      rows.push({
        panels: rowPanels,
        widths: layoutPattern
      });
    }
    
    return rows;
  };

  const generateBattlePanel = async (actionDescription: string, isCustom: boolean = false, isVillainAction: boolean = false) => {
    if (!character || !opponent || isGeneratingPanel) return;

    setIsGeneratingPanel(true);
    const panelIndex = battlePanels.length;
    const panelId = `panel-${panelIndex}`;

    // Determine which character is performing the action
    const actingCharacter = isVillainAction ? opponent : character;
    const targetCharacter = isVillainAction ? character : opponent;

    // Create detailed battle prompt
    const prompt = `Epic fantasy battle comic panel: ${actingCharacter.character_name} (${actingCharacter.image_prompt}) ${actionDescription} against ${targetCharacter.character_name} (${targetCharacter.image_prompt}). 
    
    Action: ${actionDescription}. Dynamic combat scene with explosive magical effects, dramatic lighting with sparks and energy, debris flying through the air, fierce expressions, dynamic action poses mid-combat, cinematic battle photography, high contrast lighting, magical effects, destruction and chaos, epic confrontation, comic book art style with vibrant colors.`;

    // Add new panel with loading state
    const newPanel: BattlePanel = {
      id: panelId,
      isGenerating: !demoMode, // Don't show generating state in demo mode
      error: false,
      description: actionDescription,
      prompt,
      isPlaceholder: demoMode, // Mark as placeholder in demo mode
      isVillainAction
    };

    setBattlePanels(prev => [...prev, newPanel]);

    // In demo mode, just add placeholder and finish
    if (demoMode) {
      setIsGeneratingPanel(false);
      if (isCustom) {
        setCustomScene('');
      }
      return;
    }

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

  const handleActionClick = async (action: { label: string; description: string }, actionIndex: number) => {
    // Generate hero action first
    await generateBattlePanel(action.description);
    
    // Replace the clicked action with a new random one
    replaceAction(actionIndex);
    
    // Generate villain response action after a short delay
    setTimeout(async () => {
      const villainAction = getRandomVillainAction();
      if (villainAction) {
        await generateBattlePanel(villainAction.description, false, true);
      }
    }, 1000); // 1 second delay for better UX
  };

  const handleCustomScene = async () => {
    if (customScene.trim()) {
      // Generate hero custom action first
      await generateBattlePanel(customScene.trim(), true);
      
      // Generate villain response action after a short delay
      setTimeout(async () => {
        const villainAction = getRandomVillainAction();
        if (villainAction) {
          await generateBattlePanel(villainAction.description, false, true);
        }
      }, 1000); // 1 second delay for better UX
    }
  };

  const handleRetryPanel = (panelIndex: number) => {
    const panel = battlePanels[panelIndex];
    if (panel && !demoMode) { // Don't allow retry in demo mode
      generateBattlePanel(panel.description, false, panel.isVillainAction);
    }
  };

  const handleFinalizeBattle = () => {
    // Generate final victory/defeat panel
    const finalDescription = "delivers the final decisive blow in an epic conclusion";
    generateBattlePanel(finalDescription);
  };

  const handleRestartComic = () => {
    setBattlePanels([]);
    setCustomScene('');
    setShowRestartModal(false);
  };

  const handleRegenerateCharacter = (target: 'hero' | 'villain') => {
    setRegenerateTarget(target);
    setShowRegenerateModal(true);
  };

  const handleCharacterRegenerated = (newCharacter: any) => {
    if (regenerateTarget === 'hero') {
      dispatch({ type: 'SET_CHARACTER', payload: newCharacter });
      // Reset suggested actions with new character's powers
      if (newCharacter.powers) {
        const newActions = newCharacter.powers.slice(0, 3).map((power: any) => ({
          label: power.name,
          description: power.description
        }));
        setSuggestedActions(newActions);
      }
    } else if (regenerateTarget === 'villain') {
      dispatch({ type: 'SET_OPPONENT', payload: newCharacter });
    }
    
    setShowRegenerateModal(false);
    setRegenerateTarget(null);
  };

  if (!character || !opponent) return null;

  const panelRows = groupPanelsIntoRows(battlePanels);

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col">
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidepanel - Hero */}
        <div className="w-80 bg-gray-900/50 backdrop-blur-sm border-r border-purple-500/20 p-6 flex flex-col justify-center">
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
            <p className="text-purple-200 text-sm text-center leading-relaxed mb-6">
              {character.description}
            </p>
            
            {/* Regenerate Hero Button */}
            <button
              onClick={() => handleRegenerateCharacter('hero')}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 border border-purple-500/30 hover:border-purple-400/50 text-purple-300 hover:text-purple-200 rounded-lg transition-all duration-200 font-medium"
            >
              <RotateCcw className="w-4 h-4" />
              Regenerate
            </button>
          </div>
        </div>

        {/* Central Comic Strip Area */}
        <div className="flex-1 flex flex-col">
          <div className="bg-gray-900/50 backdrop-blur-sm border-b border-purple-500/20 p-4 flex items-center justify-center relative">
            
            {/* Restart Button - Left Side */}
            <div className="absolute left-4">
              <button
                onClick={() => setShowRestartModal(true)}
                disabled={battlePanels.length === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  battlePanels.length === 0
                    ? 'bg-gray-800/30 border border-gray-600/30 text-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-red-600/20 to-orange-600/20 hover:from-red-600/30 hover:to-orange-600/30 text-red-300 hover:text-red-200 border border-red-500/30 hover:border-red-400/50'
                }`}
                title="Restart comic strip"
              >
                <RotateCcw className="w-4 h-4" />
                Restart
              </button>
            </div>

            <h3 className="text-2xl font-bold text-white text-center">
              Battle Comic Strip
              {demoMode && (
                <span className="ml-3 text-sm font-normal text-purple-300 bg-purple-900/30 px-3 py-1 rounded-full border border-purple-500/30">
                  Demo Mode
                </span>
              )}
            </h3>
            
            {/* Finalize Button - Right Side */}
            <div className="absolute right-4">
              <button
                onClick={handleFinalizeBattle}
                disabled={isGeneratingPanel || battlePanels.length === 0}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  isGeneratingPanel || battlePanels.length === 0
                    ? 'bg-gray-800/30 border border-gray-600/30 text-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-yellow-600 to-red-600 hover:from-yellow-500 hover:to-red-500 text-white shadow-lg hover:shadow-orange-500/25 border border-yellow-500/50'
                }`}
              >
                Finalize Battle
              </button>
            </div>
          </div>
          
          {/* Comic Panels and Controls Container */}
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Scrollable Comic Panels */}
            <div ref={comicScrollRef} className="flex-1 overflow-y-auto p-6">
              {battlePanels.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎬</div>
                    <p className="text-xl text-purple-300 mb-2">Ready to Create Your Epic Battle Story?</p>
                    <p className="text-purple-400">
                      {demoMode 
                        ? 'Use the controls below to add placeholder panels to your comic!'
                        : 'Use the controls below to generate your first comic panel!'
                      }
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {panelRows.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex gap-4" style={{ height: '320px' }}>
                      {row.panels.map((panel, panelIndex) => {
                        const globalIndex = rowIndex * 3 + panelIndex;
                        
                        return (
                          <div 
                            key={panel.id} 
                            className="flex flex-col"
                            style={{ width: `${row.widths[panelIndex]}%` }}
                          >
                            <ComicPanel
                              panel={panel}
                              index={globalIndex}
                              onRetry={() => handleRetryPanel(globalIndex)}
                              demoMode={demoMode}
                            />
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Battle Controls Section - Taking Space */}
            <div className="bg-gray-900/95 backdrop-blur-sm border-t border-purple-500/30 shadow-2xl">
              
              {/* Collapse/Expand Header */}
              <button
                onClick={() => setIsControlsExpanded(!isControlsExpanded)}
                className="w-full p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 transition-all duration-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Wand2 className="w-5 h-5 text-purple-400" />
                  <span className="text-white font-semibold">Battle Controls</span>
                  <span className="text-purple-300 text-sm">
                    {isControlsExpanded ? 'Click to collapse' : 'Click to expand'}
                  </span>
                </div>
                <div className="text-purple-400">
                  {isControlsExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
                </div>
              </button>

              {/* Expandable Content */}
              <div className={`transition-all duration-300 ease-in-out ${
                isControlsExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              } overflow-hidden`}>
                <div className="p-6 space-y-6">
                  
                  {/* Suggested Actions */}
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {suggestedActions.map((action, index) => (
                        <ActionButton
                          key={`${action.label}-${index}`}
                          action={action}
                          onClick={() => handleActionClick(action, index)}
                          onRefresh={() => replaceAction(index)}
                          disabled={isGeneratingPanel}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Custom Scene Input */}
                  <div>
                    <CustomSceneInput
                      value={customScene}
                      onChange={setCustomScene}
                      onSubmit={handleCustomScene}
                      disabled={isGeneratingPanel}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidepanel - Villain */}
        <div className="w-80 bg-gray-900/50 backdrop-blur-sm border-l border-purple-500/20 p-6 flex flex-col justify-center">
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
            <p className="text-red-200 text-sm text-center leading-relaxed mb-6">
              {opponent.description}
            </p>
            
            {/* Regenerate Villain Button */}
            <button
              onClick={() => handleRegenerateCharacter('villain')}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600/20 to-orange-600/20 hover:from-red-600/30 hover:to-orange-600/30 border border-red-500/30 hover:border-red-400/50 text-red-300 hover:text-red-200 rounded-lg transition-all duration-200 font-medium"
            >
              <RotateCcw className="w-4 h-4" />
              Regenerate
            </button>
          </div>
        </div>
      </div>

      {/* Restart Confirmation Modal */}
      <RestartModal
        isOpen={showRestartModal}
        onClose={() => setShowRestartModal(false)}
        onConfirm={handleRestartComic}
      />

      {/* Regenerate Character Modal */}
      <RegenerateCharacterModal
        isOpen={showRegenerateModal}
        onClose={() => {
          setShowRegenerateModal(false);
          setRegenerateTarget(null);
        }}
        onCharacterGenerated={handleCharacterRegenerated}
        targetType={regenerateTarget}
        demoMode={demoMode}
      />
    </div>
  );
}