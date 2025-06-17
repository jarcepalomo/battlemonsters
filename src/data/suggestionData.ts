// Character suggestion data organized by categories with much larger pools
export const CHARACTER_TYPES = [
  // Fantasy Warriors
  'Phoenix warrior', 'Crystal mage', 'Shadow hunter', 'Storm knight', 'Void assassin',
  'Ice queen', 'Fire demon', 'Lightning monk', 'Earth titan', 'Wind dancer',
  'Blood vampire', 'Holy paladin', 'Dark necromancer', 'Celestial guardian', 'Chaos sorcerer',
  'Time manipulator', 'Space pirate', 'Quantum hacker', 'Bio-engineer', 'Psionic warrior',
  'Ethereal ghost', 'Primal beast', 'Cyber samurai', 'Ancient dragon', 'Mystic shaman',
  'Frost giant', 'Lava golem', 'Thunder god', 'Star weaver', 'Dream walker',
  
  // Elemental Beings
  'Flame elemental', 'Water spirit', 'Air djinn', 'Stone guardian', 'Metal construct',
  'Plasma entity', 'Void wraith', 'Light bearer', 'Shadow fiend', 'Crystal being',
  'Energy phantom', 'Astral wanderer', 'Cosmic drifter', 'Dimensional shifter', 'Reality bender',
  
  // Mythical Creatures
  'Dragon lord', 'Griffin rider', 'Unicorn knight', 'Sphinx oracle', 'Kraken master',
  'Phoenix sage', 'Basilisk hunter', 'Chimera tamer', 'Hydra slayer', 'Leviathan caller',
  'Pegasus rider', 'Manticore warrior', 'Cerberus guardian', 'Banshee singer', 'Valkyrie champion',
  
  // Sci-Fi Classes
  'Nano-warrior', 'Cyber-witch', 'Plasma knight', 'Quantum mage', 'Digital ghost',
  'Bio-hacker', 'Gene-splicer', 'Mech-pilot', 'AI-symbiont', 'Void-jumper',
  'Star-forger', 'Planet-shaper', 'Time-weaver', 'Reality-coder', 'Dimension-walker',
  
  // Dark Fantasy
  'Lich king', 'Death knight', 'Soul reaper', 'Bone mage', 'Plague doctor',
  'Demon hunter', 'Angel slayer', 'Fallen seraph', 'Cursed prophet', 'Doom herald',
  'Night terror', 'Nightmare weaver', 'Fear incarnate', 'Madness bringer', 'Chaos spawn',
  
  // Nature Classes
  'Forest guardian', 'Ocean caller', 'Mountain lord', 'Desert wanderer', 'Jungle stalker',
  'Flower maiden', 'Tree shepherd', 'Beast master', 'Swarm queen', 'Hive mind',
  'Coral sage', 'Mushroom druid', 'Vine whisperer', 'Thorn knight', 'Petal dancer',
  
  // Cosmic Entities
  'Star destroyer', 'Galaxy shaper', 'Nebula walker', 'Comet rider', 'Solar flare',
  'Black hole master', 'Supernova herald', 'Cosmic storm', 'Asteroid miner', 'Meteor caller',
  'Pulsar guardian', 'Quasar sage', 'Dark matter wraith', 'Antimatter being', 'Gravity well'
];

export const PHYSICAL_FEATURES = {
  // Fire/Heat themed - Expanded
  fire: [
    'with flame wings', 'with burning eyes', 'with molten armor', 'with fire-wreathed hands',
    'with phoenix feathers', 'with ember-glowing skin', 'with solar crown', 'with blazing aura',
    'with lava veins', 'with scorching breath', 'with inferno cloak', 'with magma heart',
    'with volcanic scars', 'with plasma hair', 'with furnace core', 'with cinder trail',
    'with solar flare wings', 'with meteor fists', 'with comet tail', 'with star-fire eyes',
    'with thermal vision', 'with heat shimmer', 'with flame tattoos', 'with burning runes',
    'with molten tears', 'with fire-forged bones', 'with ash-gray skin', 'with ember breath',
    'with solar panels', 'with fusion reactor', 'with plasma sword', 'with flame whips'
  ],
  
  // Ice/Cold themed - Expanded
  ice: [
    'with frost armor', 'with crystalline skin', 'with icy breath', 'with frozen crown',
    'with glacial eyes', 'with snow-white hair', 'with diamond scales', 'with arctic aura',
    'with ice shards', 'with frozen tears', 'with crystal bones', 'with permafrost skin',
    'with blizzard cloak', 'with icicle spears', 'with frozen heart', 'with glacier armor',
    'with snowflake patterns', 'with frost bite', 'with winter winds', 'with ice crystals',
    'with polar fur', 'with frozen blood', 'with ice-blue veins', 'with crystal horns',
    'with frozen wings', 'with ice daggers', 'with snow trail', 'with frost breath',
    'with arctic winds', 'with ice prison', 'with frozen time', 'with crystal prison'
  ],
  
  // Lightning/Storm themed - Expanded
  storm: [
    'with electric veins', 'with storm clouds', 'with lightning scars', 'with thunder voice',
    'with crackling energy', 'with tempest eyes', 'with wind-swept cloak', 'with static hair',
    'with plasma bolts', 'with electric aura', 'with storm-charged skin', 'with lightning rod',
    'with thunder fists', 'with electric wings', 'with storm-born power', 'with wind blades',
    'with hurricane force', 'with tornado spin', 'with electric pulse', 'with storm heart',
    'with lightning reflexes', 'with thunder roar', 'with electric touch', 'with storm surge',
    'with wind armor', 'with electric field', 'with storm-forged weapons', 'with lightning speed',
    'with tempest fury', 'with electric discharge', 'with storm-caller staff', 'with wind walker'
  ],
  
  // Shadow/Dark themed - Expanded
  shadow: [
    'with shadow cloak', 'with void eyes', 'with dark tendrils', 'with obsidian armor',
    'with smoky form', 'with midnight wings', 'with eclipse crown', 'with phantom limbs',
    'with shadow step', 'with void touch', 'with dark matter', 'with nightmare fuel',
    'with shadow merge', 'with darkness incarnate', 'with void portal', 'with shadow clone',
    'with dark energy', 'with shadow bind', 'with void blade', 'with darkness veil',
    'with shadow dance', 'with void heart', 'with dark whispers', 'with shadow realm',
    'with void magic', 'with dark ritual', 'with shadow puppet', 'with void walker',
    'with darkness eternal', 'with shadow master', 'with void lord', 'with dark sovereign'
  ],
  
  // Light/Holy themed - Expanded
  light: [
    'with golden armor', 'with radiant wings', 'with divine halo', 'with glowing tattoos',
    'with celestial marks', 'with prismatic aura', 'with starlight eyes', 'with holy symbols',
    'with angelic wings', 'with divine light', 'with sacred geometry', 'with holy fire',
    'with celestial crown', 'with divine grace', 'with holy water', 'with sacred flame',
    'with light beams', 'with divine shield', 'with holy sword', 'with celestial armor',
    'with divine blessing', 'with holy spirit', 'with sacred power', 'with divine wrath',
    'with celestial choir', 'with holy ground', 'with divine intervention', 'with sacred ritual',
    'with light magic', 'with divine purpose', 'with holy mission', 'with celestial destiny'
  ],
  
  // Crystal/Earth themed - Expanded
  crystal: [
    'with crystal armor', 'with gemstone eyes', 'with rocky skin', 'with mineral veins',
    'with diamond claws', 'with quartz crown', 'with stone limbs', 'with metallic sheen',
    'with granite strength', 'with marble skin', 'with crystal growth', 'with gem-studded',
    'with earth power', 'with stone heart', 'with crystal formation', 'with mineral core',
    'with rock solid', 'with crystal clear', 'with stone cold', 'with diamond hard',
    'with crystal resonance', 'with earth tremor', 'with stone throw', 'with crystal shard',
    'with mineral wealth', 'with gem collection', 'with crystal ball', 'with stone tablet',
    'with earth elemental', 'with crystal magic', 'with stone guardian', 'with mineral spirit'
  ],
  
  // Nature/Organic themed - Expanded
  nature: [
    'with bark skin', 'with leaf hair', 'with vine armor', 'with flower crown',
    'with root limbs', 'with moss cloak', 'with thorn spikes', 'with petal wings',
    'with tree branches', 'with flower petals', 'with grass blades', 'with mushroom cap',
    'with coral growth', 'with seaweed hair', 'with shell armor', 'with pearl eyes',
    'with butterfly wings', 'with bee swarm', 'with spider silk', 'with ant colony',
    'with bird song', 'with wolf howl', 'with bear strength', 'with eagle vision',
    'with snake scales', 'with fish gills', 'with frog leap', 'with turtle shell',
    'with plant growth', 'with animal spirit', 'with nature bond', 'with wild heart'
  ],
  
  // Tech/Cyber themed - Expanded
  tech: [
    'with cyber implants', 'with holographic display', 'with mechanical limbs', 'with neon circuits',
    'with digital eyes', 'with plasma weapons', 'with nano-armor', 'with energy cores',
    'with AI interface', 'with quantum processor', 'with neural link', 'with data stream',
    'with hologram projection', 'with laser sight', 'with energy shield', 'with power core',
    'with cybernetic enhancement', 'with digital consciousness', 'with virtual reality', 'with augmented reality',
    'with quantum entanglement', 'with time dilation', 'with space warp', 'with dimension hop',
    'with teleportation', 'with force field', 'with energy beam', 'with particle accelerator',
    'with fusion power', 'with antimatter engine', 'with warp drive', 'with hyperspace jump'
  ],
  
  // Generic/Mystical - Expanded
  generic: [
    'with ancient armor', 'with glowing eyes', 'with mystical tattoos', 'with ethereal form',
    'with magical aura', 'with runic symbols', 'with spectral wings', 'with enchanted weapons',
    'with arcane power', 'with mystic energy', 'with ancient wisdom', 'with forbidden knowledge',
    'with legendary status', 'with mythical power', 'with divine heritage', 'with cursed bloodline',
    'with prophetic vision', 'with destiny bound', 'with fate sealed', 'with karma balanced',
    'with soul bonded', 'with spirit guide', 'with guardian angel', 'with demon pact',
    'with time loop', 'with parallel self', 'with alternate reality', 'with quantum state',
    'with probability field', 'with chaos theory', 'with butterfly effect', 'with ripple effect'
  ]
};

export const DISTINCTIVE_ATTRIBUTES = {
  // Color/Visual themes - Expanded
  fire: [
    'and crimson flames', 'and golden sparks', 'and orange glow', 'and scarlet aura',
    'and amber light', 'and ruby radiance', 'and sunset colors', 'and volcanic energy',
    'and molten gold', 'and copper shine', 'and bronze gleam', 'and brass polish',
    'and flame dance', 'and fire storm', 'and heat wave', 'and thermal blast',
    'and solar wind', 'and stellar fire', 'and cosmic burn', 'and plasma flow',
    'and fusion reaction', 'and nuclear glow', 'and radioactive shine', 'and energy burst',
    'and light speed', 'and photon beam', 'and laser focus', 'and burning passion',
    'and fiery temperament', 'and blazing trail', 'and scorching path', 'and infernal power'
  ],
  
  ice: [
    'and azure frost', 'and silver shimmer', 'and crystal clarity', 'and polar winds',
    'and diamond dust', 'and glacial blue', 'and winter\'s breath', 'and frozen time',
    'and arctic chill', 'and ice age', 'and permafrost', 'and glacier movement',
    'and snowflake unique', 'and blizzard fury', 'and ice storm', 'and frozen heart',
    'and cold calculation', 'and ice logic', 'and frozen emotion', 'and crystal thought',
    'and diamond clarity', 'and ice precision', 'and frozen moment', 'and arctic silence',
    'and winter solitude', 'and ice palace', 'and frozen kingdom', 'and crystal empire',
    'and ice age wisdom', 'and glacial patience', 'and arctic endurance', 'and frozen determination'
  ],
  
  storm: [
    'and electric blue', 'and storm-gray clouds', 'and lightning streaks', 'and thunder echoes',
    'and crackling power', 'and tempest fury', 'and wind whispers', 'and rain drops',
    'and hurricane force', 'and tornado spin', 'and cyclone power', 'and typhoon strength',
    'and electric storm', 'and plasma discharge', 'and ion charge', 'and static build',
    'and magnetic field', 'and electromagnetic pulse', 'and radio wave', 'and frequency match',
    'and resonance harmony', 'and vibration sync', 'and wave interference', 'and sound barrier',
    'and sonic boom', 'and thunder clap', 'and lightning strike', 'and electric shock',
    'and storm surge', 'and tidal wave', 'and weather control', 'and atmospheric pressure'
  ],
  
  shadow: [
    'and void darkness', 'and purple shadows', 'and midnight black', 'and eclipse energy',
    'and phantom mist', 'and obsidian depths', 'and twilight hues', 'and shadow dance',
    'and dark matter', 'and black hole', 'and event horizon', 'and singularity point',
    'and void space', 'and empty vacuum', 'and null field', 'and zero point',
    'and negative energy', 'and anti-matter', 'and dark energy', 'and shadow realm',
    'and nightmare fuel', 'and fear incarnate', 'and terror absolute', 'and dread eternal',
    'and darkness consuming', 'and void calling', 'and shadow beckoning', 'and darkness embracing',
    'and void accepting', 'and shadow welcoming', 'and darkness eternal', 'and void infinite'
  ],
  
  light: [
    'and golden radiance', 'and prismatic colors', 'and celestial glow', 'and divine light',
    'and starlight shimmer', 'and rainbow aura', 'and holy brilliance', 'and cosmic energy',
    'and solar power', 'and stellar energy', 'and galactic force', 'and universal harmony',
    'and divine grace', 'and holy blessing', 'and sacred power', 'and celestial might',
    'and angelic chorus', 'and heavenly music', 'and divine symphony', 'and sacred song',
    'and holy hymn', 'and celestial melody', 'and divine harmony', 'and sacred rhythm',
    'and light eternal', 'and radiance infinite', 'and brilliance absolute', 'and luminance pure',
    'and illumination complete', 'and enlightenment total', 'and wisdom divine', 'and knowledge sacred'
  ],
  
  crystal: [
    'and gemstone facets', 'and mineral veins', 'and crystalline structure', 'and rocky texture',
    'and metallic gleam', 'and stone patterns', 'and earth tones', 'and granite strength',
    'and diamond hardness', 'and crystal clarity', 'and gem brilliance', 'and mineral wealth',
    'and earth power', 'and stone wisdom', 'and crystal knowledge', 'and mineral memory',
    'and geological time', 'and sedimentary layers', 'and metamorphic change', 'and igneous birth',
    'and tectonic force', 'and seismic power', 'and volcanic origin', 'and magma core',
    'and crystal resonance', 'and harmonic frequency', 'and vibrational healing', 'and energy alignment',
    'and chakra balance', 'and aura cleansing', 'and spiritual grounding', 'and earth connection'
  ],
  
  nature: [
    'and verdant growth', 'and floral patterns', 'and organic curves', 'and natural harmony',
    'and living energy', 'and seasonal changes', 'and earth connection', 'and wild spirit',
    'and forest wisdom', 'and jungle knowledge', 'and desert survival', 'and ocean depth',
    'and mountain height', 'and valley peace', 'and river flow', 'and lake calm',
    'and wind song', 'and bird call', 'and animal spirit', 'and plant consciousness',
    'and tree memory', 'and flower beauty', 'and grass simplicity', 'and mushroom mystery',
    'and ecosystem balance', 'and biodiversity', 'and natural selection', 'and evolution progress',
    'and adaptation skill', 'and survival instinct', 'and life force', 'and death cycle'
  ],
  
  tech: [
    'and neon glow', 'and digital patterns', 'and holographic effects', 'and cyber aesthetics',
    'and plasma energy', 'and circuit designs', 'and futuristic style', 'and quantum effects',
    'and binary code', 'and data stream', 'and information flow', 'and network connection',
    'and wireless signal', 'and satellite link', 'and fiber optic', 'and quantum tunnel',
    'and AI intelligence', 'and machine learning', 'and neural network', 'and deep learning',
    'and algorithm optimization', 'and code efficiency', 'and system integration', 'and platform compatibility',
    'and user interface', 'and user experience', 'and human-computer interaction', 'and augmented reality',
    'and virtual reality', 'and mixed reality', 'and extended reality', 'and immersive experience'
  ],
  
  generic: [
    'and ethereal aura', 'and mystical energy', 'and ancient power', 'and magical essence',
    'and otherworldly presence', 'and arcane symbols', 'and legendary might', 'and cosmic force',
    'and divine purpose', 'and sacred mission', 'and holy quest', 'and noble cause',
    'and righteous path', 'and virtuous journey', 'and heroic destiny', 'and legendary fate',
    'and mythical origin', 'and ancient bloodline', 'and royal heritage', 'and noble birth',
    'and chosen one', 'and prophesied hero', 'and destined savior', 'and legendary champion',
    'and eternal guardian', 'and timeless protector', 'and immortal defender', 'and undying sentinel',
    'and infinite wisdom', 'and boundless knowledge', 'and limitless power', 'and endless potential'
  ]
};

// Track recently used suggestions to avoid repetition
let recentSuggestions: Set<string> = new Set();
const MAX_RECENT_SUGGESTIONS = 20;

// Function to get truly random items without recent repetition
function getRandomItemsWithoutRepetition<T>(array: T[], count: number): T[] {
  // Filter out recently used items
  const availableItems = array.filter(item => !recentSuggestions.has(String(item)));
  
  // If we don't have enough available items, clear some recent suggestions
  if (availableItems.length < count) {
    const recentArray = Array.from(recentSuggestions);
    const toRemove = recentArray.slice(0, Math.ceil(recentArray.length / 2));
    toRemove.forEach(item => recentSuggestions.delete(item));
  }
  
  // Get final available items
  const finalAvailable = array.filter(item => !recentSuggestions.has(String(item)));
  
  // Shuffle and select
  const shuffled = [...finalAvailable].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);
  
  // Add to recent suggestions
  selected.forEach(item => {
    recentSuggestions.add(String(item));
    if (recentSuggestions.size > MAX_RECENT_SUGGESTIONS) {
      const oldest = recentSuggestions.values().next().value;
      recentSuggestions.delete(oldest);
    }
  });
  
  return selected;
}

// Function to determine theme from character type
export function getThemeFromCharacterType(characterType: string): string {
  const lowerType = characterType.toLowerCase();
  
  if (lowerType.includes('fire') || lowerType.includes('flame') || lowerType.includes('phoenix') || 
      lowerType.includes('lava') || lowerType.includes('solar') || lowerType.includes('demon') ||
      lowerType.includes('plasma') || lowerType.includes('inferno') || lowerType.includes('ember')) {
    return 'fire';
  }
  if (lowerType.includes('ice') || lowerType.includes('frost') || lowerType.includes('crystal') || 
      lowerType.includes('frozen') || lowerType.includes('glacial') || lowerType.includes('queen') ||
      lowerType.includes('arctic') || lowerType.includes('winter') || lowerType.includes('snow')) {
    return 'ice';
  }
  if (lowerType.includes('storm') || lowerType.includes('lightning') || lowerType.includes('thunder') || 
      lowerType.includes('electric') || lowerType.includes('wind') || lowerType.includes('tempest') ||
      lowerType.includes('hurricane') || lowerType.includes('tornado') || lowerType.includes('cyclone')) {
    return 'storm';
  }
  if (lowerType.includes('shadow') || lowerType.includes('void') || lowerType.includes('dark') || 
      lowerType.includes('night') || lowerType.includes('assassin') || lowerType.includes('necromancer') ||
      lowerType.includes('phantom') || lowerType.includes('wraith') || lowerType.includes('nightmare')) {
    return 'shadow';
  }
  if (lowerType.includes('holy') || lowerType.includes('celestial') || lowerType.includes('divine') || 
      lowerType.includes('light') || lowerType.includes('paladin') || lowerType.includes('guardian') ||
      lowerType.includes('angel') || lowerType.includes('seraph') || lowerType.includes('radiant')) {
    return 'light';
  }
  if (lowerType.includes('crystal') || lowerType.includes('earth') || lowerType.includes('stone') || 
      lowerType.includes('rock') || lowerType.includes('titan') || lowerType.includes('golem') ||
      lowerType.includes('granite') || lowerType.includes('mineral') || lowerType.includes('gem')) {
    return 'crystal';
  }
  if (lowerType.includes('nature') || lowerType.includes('forest') || lowerType.includes('plant') || 
      lowerType.includes('tree') || lowerType.includes('leaf') || lowerType.includes('shaman') ||
      lowerType.includes('druid') || lowerType.includes('beast') || lowerType.includes('wild')) {
    return 'nature';
  }
  if (lowerType.includes('cyber') || lowerType.includes('tech') || lowerType.includes('quantum') || 
      lowerType.includes('digital') || lowerType.includes('hacker') || lowerType.includes('engineer') ||
      lowerType.includes('nano') || lowerType.includes('mech') || lowerType.includes('ai')) {
    return 'tech';
  }
  
  return 'generic';
}

// Function to get random suggestions for each category
export function getRandomCharacterTypes(count: number = 3): string[] {
  return getRandomItemsWithoutRepetition(CHARACTER_TYPES, count);
}

export function getRandomPhysicalFeatures(theme: string, count: number = 3): string[] {
  const features = PHYSICAL_FEATURES[theme as keyof typeof PHYSICAL_FEATURES] || PHYSICAL_FEATURES.generic;
  return getRandomItemsWithoutRepetition(features, count);
}

export function getRandomDistinctiveAttributes(theme: string, count: number = 3): string[] {
  const attributes = DISTINCTIVE_ATTRIBUTES[theme as keyof typeof DISTINCTIVE_ATTRIBUTES] || DISTINCTIVE_ATTRIBUTES.generic;
  return getRandomItemsWithoutRepetition(attributes, count);
}