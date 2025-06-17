// Character suggestion data organized by categories
export const CHARACTER_TYPES = [
  'Phoenix warrior', 'Crystal mage', 'Shadow hunter', 'Storm knight', 'Void assassin',
  'Ice queen', 'Fire demon', 'Lightning monk', 'Earth titan', 'Wind dancer',
  'Blood vampire', 'Holy paladin', 'Dark necromancer', 'Celestial guardian', 'Chaos sorcerer',
  'Time manipulator', 'Space pirate', 'Quantum hacker', 'Bio-engineer', 'Psionic warrior',
  'Ethereal ghost', 'Primal beast', 'Cyber samurai', 'Ancient dragon', 'Mystic shaman',
  'Frost giant', 'Lava golem', 'Thunder god', 'Star weaver', 'Dream walker'
];

export const PHYSICAL_FEATURES = {
  // Fire/Heat themed
  fire: [
    'with flame wings', 'with burning eyes', 'with molten armor', 'with fire-wreathed hands',
    'with phoenix feathers', 'with ember-glowing skin', 'with solar crown', 'with blazing aura'
  ],
  // Ice/Cold themed
  ice: [
    'with frost armor', 'with crystalline skin', 'with icy breath', 'with frozen crown',
    'with glacial eyes', 'with snow-white hair', 'with diamond scales', 'with arctic aura'
  ],
  // Lightning/Storm themed
  storm: [
    'with electric veins', 'with storm clouds', 'with lightning scars', 'with thunder voice',
    'with crackling energy', 'with tempest eyes', 'with wind-swept cloak', 'with static hair'
  ],
  // Shadow/Dark themed
  shadow: [
    'with shadow cloak', 'with void eyes', 'with dark tendrils', 'with obsidian armor',
    'with smoky form', 'with midnight wings', 'with eclipse crown', 'with phantom limbs'
  ],
  // Light/Holy themed
  light: [
    'with golden armor', 'with radiant wings', 'with divine halo', 'with glowing tattoos',
    'with celestial marks', 'with prismatic aura', 'with starlight eyes', 'with holy symbols'
  ],
  // Crystal/Earth themed
  crystal: [
    'with crystal armor', 'with gemstone eyes', 'with rocky skin', 'with mineral veins',
    'with diamond claws', 'with quartz crown', 'with stone limbs', 'with metallic sheen'
  ],
  // Nature/Organic themed
  nature: [
    'with bark skin', 'with leaf hair', 'with vine armor', 'with flower crown',
    'with root limbs', 'with moss cloak', 'with thorn spikes', 'with petal wings'
  ],
  // Tech/Cyber themed
  tech: [
    'with cyber implants', 'with holographic display', 'with mechanical limbs', 'with neon circuits',
    'with digital eyes', 'with plasma weapons', 'with nano-armor', 'with energy cores'
  ],
  // Generic/Mystical
  generic: [
    'with ancient armor', 'with glowing eyes', 'with mystical tattoos', 'with ethereal form',
    'with magical aura', 'with runic symbols', 'with spectral wings', 'with enchanted weapons'
  ]
};

export const DISTINCTIVE_ATTRIBUTES = {
  // Color/Visual themes
  fire: [
    'and crimson flames', 'and golden sparks', 'and orange glow', 'and scarlet aura',
    'and amber light', 'and ruby radiance', 'and sunset colors', 'and volcanic energy'
  ],
  ice: [
    'and azure frost', 'and silver shimmer', 'and crystal clarity', 'and polar winds',
    'and diamond dust', 'and glacial blue', 'and winter\'s breath', 'and frozen time'
  ],
  storm: [
    'and electric blue', 'and storm-gray clouds', 'and lightning streaks', 'and thunder echoes',
    'and crackling power', 'and tempest fury', 'and wind whispers', 'and rain drops'
  ],
  shadow: [
    'and void darkness', 'and purple shadows', 'and midnight black', 'and eclipse energy',
    'and phantom mist', 'and obsidian depths', 'and twilight hues', 'and shadow dance'
  ],
  light: [
    'and golden radiance', 'and prismatic colors', 'and celestial glow', 'and divine light',
    'and starlight shimmer', 'and rainbow aura', 'and holy brilliance', 'and cosmic energy'
  ],
  crystal: [
    'and gemstone facets', 'and mineral veins', 'and crystalline structure', 'and rocky texture',
    'and metallic gleam', 'and stone patterns', 'and earth tones', 'and granite strength'
  ],
  nature: [
    'and verdant growth', 'and floral patterns', 'and organic curves', 'and natural harmony',
    'and living energy', 'and seasonal changes', 'and earth connection', 'and wild spirit'
  ],
  tech: [
    'and neon glow', 'and digital patterns', 'and holographic effects', 'and cyber aesthetics',
    'and plasma energy', 'and circuit designs', 'and futuristic style', 'and quantum effects'
  ],
  generic: [
    'and ethereal aura', 'and mystical energy', 'and ancient power', 'and magical essence',
    'and otherworldly presence', 'and arcane symbols', 'and legendary might', 'and cosmic force'
  ]
};

// Function to determine theme from character type
export function getThemeFromCharacterType(characterType: string): string {
  const lowerType = characterType.toLowerCase();
  
  if (lowerType.includes('fire') || lowerType.includes('flame') || lowerType.includes('phoenix') || 
      lowerType.includes('lava') || lowerType.includes('solar') || lowerType.includes('demon')) {
    return 'fire';
  }
  if (lowerType.includes('ice') || lowerType.includes('frost') || lowerType.includes('crystal') || 
      lowerType.includes('frozen') || lowerType.includes('glacial') || lowerType.includes('queen')) {
    return 'ice';
  }
  if (lowerType.includes('storm') || lowerType.includes('lightning') || lowerType.includes('thunder') || 
      lowerType.includes('electric') || lowerType.includes('wind') || lowerType.includes('tempest')) {
    return 'storm';
  }
  if (lowerType.includes('shadow') || lowerType.includes('void') || lowerType.includes('dark') || 
      lowerType.includes('night') || lowerType.includes('assassin') || lowerType.includes('necromancer')) {
    return 'shadow';
  }
  if (lowerType.includes('holy') || lowerType.includes('celestial') || lowerType.includes('divine') || 
      lowerType.includes('light') || lowerType.includes('paladin') || lowerType.includes('guardian')) {
    return 'light';
  }
  if (lowerType.includes('crystal') || lowerType.includes('earth') || lowerType.includes('stone') || 
      lowerType.includes('rock') || lowerType.includes('titan') || lowerType.includes('golem')) {
    return 'crystal';
  }
  if (lowerType.includes('nature') || lowerType.includes('forest') || lowerType.includes('plant') || 
      lowerType.includes('tree') || lowerType.includes('leaf') || lowerType.includes('shaman')) {
    return 'nature';
  }
  if (lowerType.includes('cyber') || lowerType.includes('tech') || lowerType.includes('quantum') || 
      lowerType.includes('digital') || lowerType.includes('hacker') || lowerType.includes('engineer')) {
    return 'tech';
  }
  
  return 'generic';
}

// Function to get random suggestions for each category
export function getRandomCharacterTypes(count: number = 3): string[] {
  const shuffled = [...CHARACTER_TYPES].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function getRandomPhysicalFeatures(theme: string, count: number = 3): string[] {
  const features = PHYSICAL_FEATURES[theme as keyof typeof PHYSICAL_FEATURES] || PHYSICAL_FEATURES.generic;
  const shuffled = [...features].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function getRandomDistinctiveAttributes(theme: string, count: number = 3): string[] {
  const attributes = DISTINCTIVE_ATTRIBUTES[theme as keyof typeof DISTINCTIVE_ATTRIBUTES] || DISTINCTIVE_ATTRIBUTES.generic;
  const shuffled = [...attributes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}