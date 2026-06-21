import { Question, ModuleType } from '../types';

export const generateReasoning = (): Question => {
  const names = ['John', 'Mike', 'Sarah', 'Emma', 'David', 'Alex', 'Chris', 'Sam', 'Lisa', 'Tom'];
  const selectedNames = names.sort(() => 0.5 - Math.random()).slice(0, 3);
  const [A, B, C] = selectedNames;
  
  const adjectives = [
    { pos: 'taller', neg: 'shorter' },
    { pos: 'older', neg: 'younger' },
    { pos: 'faster', neg: 'slower' },
    { pos: 'heavier', neg: 'lighter' },
    { pos: 'richer', neg: 'poorer' },
    { pos: 'stronger', neg: 'weaker' },
  ];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  
  const scenarios = [
    { s1: `${A} is ${adj.pos} than ${B}`, s2: `${B} is ${adj.pos} than ${C}`, max: A, min: C },
    { s1: `${A} is ${adj.pos} than ${B}`, s2: `${C} is ${adj.neg} than ${B}`, max: A, min: C },
    { s1: `${B} is ${adj.neg} than ${A}`, s2: `${B} is ${adj.pos} than ${C}`, max: A, min: C },
    { s1: `${B} is ${adj.neg} than ${A}`, s2: `${C} is ${adj.neg} than ${B}`, max: A, min: C },
  ];
  
  const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
  const isAskPos = Math.random() > 0.5;
  const questionStr = `Who is the ${isAskPos ? adj.pos.replace('er', 'est') : adj.neg.replace('er', 'est')}?`;
  
  const stmts = Math.random() > 0.5 ? `${scenario.s1}. ${scenario.s2}.` : `${scenario.s2}. ${scenario.s1}.`;
  
  const correctAnswer = isAskPos ? scenario.max : scenario.min;

  return {
    id: Math.random().toString(36).substring(7),
    module: 'reasoning',
    prompt: `${stmts} ${questionStr}`,
    options: selectedNames.sort(() => 0.5 - Math.random()),
    correctAnswer,
    metadata: { promptStr: `${stmts} ${questionStr}` }
  };
};

export const generatePerceptual = (): Question => {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const similarPairs = [
    ['O', '0'], ['I', 'l'], ['1', 'l'], ['S', '5'], ['Z', '2'], ['B', '8'], ['G', '6'],
    ['q', 'p'], ['d', 'b'], ['n', 'm'], ['v', 'w'], ['u', 'v']
  ];
  
  const numPairs = 5;
  let matches = 0;
  let pairsDisplay = '';

  for (let i = 0; i < numPairs; i++) {
    const isMatch = Math.random() > 0.5;
    if (isMatch) {
      matches++;
      const letter = letters[Math.floor(Math.random() * letters.length)];
      const char1 = Math.random() > 0.5 ? letter : letter.toLowerCase();
      const char2 = Math.random() > 0.5 ? letter : letter.toLowerCase();
      pairsDisplay += `<span class="inline-block mx-3 text-2xl font-mono">${char1}${char2}</span>`;
    } else {
      const useSimilar = Math.random() > 0.5;
      if (useSimilar) {
        const pair = similarPairs[Math.floor(Math.random() * similarPairs.length)];
        const flip = Math.random() > 0.5;
        pairsDisplay += `<span class="inline-block mx-3 text-2xl font-mono">${flip ? pair[0] + pair[1] : pair[1] + pair[0]}</span>`;
      } else {
        const l1 = letters[Math.floor(Math.random() * letters.length)];
        let l2 = letters[Math.floor(Math.random() * letters.length)];
        while(l1 === l2) l2 = letters[Math.floor(Math.random() * letters.length)];
        const c1 = Math.random() > 0.5 ? l1 : l1.toLowerCase();
        const c2 = Math.random() > 0.5 ? l2 : l2.toLowerCase();
        pairsDisplay += `<span class="inline-block mx-3 text-2xl font-mono">${c1}${c2}</span>`;
      }
    }
  }

  return {
    id: Math.random().toString(36).substring(7),
    module: 'perceptual',
    prompt: `How many pairs are the same letter (ignore case)?\n<div class="mt-4 flex justify-center tracking-widest">${pairsDisplay}</div>`,
    options: ['0', '1', '2', '3', '4', '5'],
    correctAnswer: matches.toString(),
    metadata: { promptStr: `Perceptual: ${matches} matches` }
  };
};

export const generateNumber = (): Question => {
  const isFurthest = Math.random() > 0.4;

  if (isFurthest) {
    const base = Math.floor(Math.random() * 80) + 10;
    let n1 = base;
    let n2 = base + Math.floor(Math.random() * 20) + 5;
    let n3 = n2 + Math.floor(Math.random() * 20) + 5;
    
    while (Math.abs(n1 - n2) === Math.abs(n3 - n2)) {
       n3++;
    }

    const finalNums = [n1, n2, n3].sort(() => 0.5 - Math.random());
    const middle = [n1, n2, n3].sort((a, b) => a - b)[1];
    const diffs = finalNums.map(n => Math.abs(n - middle));
    const maxDiff = Math.max(...diffs);
    const furthest = finalNums[diffs.indexOf(maxDiff)];

    return {
      id: Math.random().toString(36).substring(7),
      module: 'number',
      prompt: `Which number is furthest in value from the middle one?\n<div class="text-2xl font-semibold mt-2">${finalNums.join(' &nbsp;&nbsp;&nbsp; ')}</div>`,
      options: finalNums.map(String),
      correctAnswer: furthest.toString(),
      metadata: { promptStr: `Which number is furthest from the middle one? [${finalNums.join(', ')}]` }
    };
  } else {
    const isLargest = Math.random() > 0.5;
    const nums = Array.from({length: 4}, () => Math.floor(Math.random() * 150) - 50);
    while(new Set(nums).size !== 4) {
      nums[3] = Math.floor(Math.random() * 150) - 50;
    }
    const answer = isLargest ? Math.max(...nums) : Math.min(...nums);

    return {
      id: Math.random().toString(36).substring(7),
      module: 'number',
      prompt: `Which number is the ${isLargest ? 'largest' : 'smallest'}?\n<div class="text-2xl font-semibold mt-2">${nums.join(' &nbsp;&nbsp;&nbsp; ')}</div>`,
      options: nums.map(String),
      correctAnswer: answer.toString(),
      metadata: { promptStr: `Which number is the ${isLargest ? 'largest' : 'smallest'}? [${nums.join(', ')}]` }
    };
  }
};

const synonymGroups = [
  ['Happy', 'Joyful', 'Cheerful', 'Delighted', 'Merry', 'Ecstatic', 'Jubilant'],
  ['Sad', 'Unhappy', 'Sorrowful', 'Depressed', 'Miserable', 'Melancholy', 'Despondent'],
  ['Fast', 'Quick', 'Rapid', 'Swift', 'Speedy', 'Brisk', 'Expeditious'],
  ['Slow', 'Sluggish', 'Leisurely', 'Crawling', 'Plodding', 'Tardy', 'Lethargic'],
  ['Big', 'Large', 'Huge', 'Giant', 'Massive', 'Colossal', 'Immense'],
  ['Small', 'Tiny', 'Miniature', 'Petite', 'Little', 'Minute', 'Diminutive'],
  ['Smart', 'Clever', 'Intelligent', 'Bright', 'Brilliant', 'Astute', 'Sagacious'],
  ['Dumb', 'Stupid', 'Foolish', 'Unintelligent', 'Dense', 'Obtuse', 'Ignorant'],
  ['Brave', 'Courageous', 'Fearless', 'Bold', 'Heroic', 'Valiant', 'Intrepid'],
  ['Scared', 'Fearful', 'Afraid', 'Terrified', 'Frightened', 'Timid', 'Petrified'],
  ['Abundant', 'Copious', 'Plentiful', 'Ample', 'Prolific', 'Bountiful'],
  ['Scarce', 'Sparse', 'Meager', 'Scanty', 'Deficient', 'Lacking'],
  ['Diligent', 'Industrious', 'Assiduous', 'Conscientious', 'Meticulous', 'Thorough'],
  ['Lazy', 'Indolent', 'Slothful', 'Lethargic', 'Sluggish', 'Apathetic'],
  ['Ephemeral', 'Transient', 'Fleeting', 'Momentary', 'Brief', 'Temporary'],
  ['Permanent', 'Enduring', 'Perpetual', 'Everlasting', 'Eternal', 'Lasting'],
  ['Lucid', 'Clear', 'Coherent', 'Articulate', 'Comprehensible', 'Intelligible'],
  ['Obscure', 'Vague', 'Ambiguous', 'Cryptic', 'Nebulous', 'Murky'],
];

export const generateWord = (): Question => {
  const groupIdx = Math.floor(Math.random() * synonymGroups.length);
  const group = synonymGroups[groupIdx];
  const similar = group.sort(() => 0.5 - Math.random()).slice(0, 2);

  let oddGroupIdx = Math.floor(Math.random() * synonymGroups.length);
  while (oddGroupIdx === groupIdx) {
    oddGroupIdx = Math.floor(Math.random() * synonymGroups.length);
  }
  const oddWord = synonymGroups[oddGroupIdx][Math.floor(Math.random() * synonymGroups[oddGroupIdx].length)];

  const words = [...similar, oddWord].sort(() => 0.5 - Math.random());

  return {
    id: Math.random().toString(36).substring(7),
    module: 'word',
    prompt: `Which word is the odd one out?\n<div class="text-xl font-medium mt-3">${words.join(' &nbsp;&nbsp;&nbsp; ')}</div>`,
    options: words,
    correctAnswer: oddWord,
    metadata: { promptStr: `Odd one out: [${words.join(', ')}]` }
  };
};

export const generateSpatial = (): Question => {
  const letters = ['R', 'F', 'L', 'P', 'Q', 'B', 'J', 'G', 'N', 'Z'];
  const letter = letters[Math.floor(Math.random() * letters.length)];
  
  const isMirror = Math.random() > 0.5;
  const rotations = [0, 45, 90, 135, 180, 225, 270, 315];
  const rot1 = rotations[Math.floor(Math.random() * rotations.length)];
  let rot2 = rotations[Math.floor(Math.random() * rotations.length)];
  while (rot1 === rot2) {
    rot2 = rotations[Math.floor(Math.random() * rotations.length)];
  }
  
  const svg1 = `<svg width="100" height="100" viewBox="0 0 100 100" class="inline-block mx-4">
    <text x="50" y="70" font-family="sans-serif" font-size="80" font-weight="bold" text-anchor="middle" transform="rotate(${rot1}, 50, 50)">${letter}</text>
  </svg>`;
  
  const scaleX = isMirror ? -1 : 1;
  const svg2 = `<svg width="100" height="100" viewBox="0 0 100 100" class="inline-block mx-4">
    <g transform="translate(50, 50) scale(${scaleX}, 1) translate(-50, -50)">
      <text x="50" y="70" font-family="sans-serif" font-size="80" font-weight="bold" text-anchor="middle" transform="rotate(${rot2}, 50, 50)">${letter}</text>
    </g>
  </svg>`;

  return {
    id: Math.random().toString(36).substring(7),
    module: 'spatial',
    prompt: `<div class="flex justify-center items-center py-4">${svg1} ${svg2}</div>\nAre these two shapes identical (just rotated) or mirror images?`,
    options: ['Identical (Rotated)', 'Mirror Image'],
    correctAnswer: isMirror ? 'Mirror Image' : 'Identical (Rotated)',
    metadata: { promptStr: `Spatial: ${letter} (Mirror: ${isMirror})` }
  };
};

export const generateQuestion = (module: ModuleType): Question => {
  switch (module) {
    case 'reasoning': return generateReasoning();
    case 'perceptual': return generatePerceptual();
    case 'number': return generateNumber();
    case 'word': return generateWord();
    case 'spatial': return generateSpatial();
    case 'mixed': {
      const modules: ModuleType[] = ['reasoning', 'perceptual', 'number', 'word', 'spatial'];
      return generateQuestion(modules[Math.floor(Math.random() * modules.length)]);
    }
    default: return generateReasoning();
  }
};
