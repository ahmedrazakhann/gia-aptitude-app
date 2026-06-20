import { Question, ModuleType } from '../types';

export const generateReasoning = (): Question => {
  const names = ['John', 'Mike', 'Sarah', 'Emma', 'David', 'Alex', 'Chris', 'Sam'];
  const [name1, name2] = names.sort(() => 0.5 - Math.random()).slice(0, 2);
  const adjectives = [
    { pos: 'taller', neg: 'shorter' },
    { pos: 'older', neg: 'younger' },
    { pos: 'faster', neg: 'slower' },
    { pos: 'heavier', neg: 'lighter' },
    { pos: 'richer', neg: 'poorer' },
  ];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const isPos = Math.random() > 0.5;
  const askPos = Math.random() > 0.5;

  const promptStr = `${name1} is ${isPos ? adj.pos : adj.neg} than ${name2}.`;
  const questionStr = `Who is ${askPos ? adj.pos : adj.neg}?`;

  let correctAnswer = '';
  if (isPos === askPos) {
    correctAnswer = name1;
  } else {
    correctAnswer = name2;
  }

  return {
    id: Math.random().toString(36).substring(7),
    module: 'reasoning',
    prompt: `${promptStr} ${questionStr}`,
    options: [name1, name2].sort(() => 0.5 - Math.random()),
    correctAnswer,
    metadata: { promptStr: `${promptStr} ${questionStr}` }
  };
};

export const generatePerceptual = (): Question => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numPairs = 4;
  let matches = 0;
  let pairsDisplay = '';

  for (let i = 0; i < numPairs; i++) {
    const isMatch = Math.random() > 0.5;
    const letter1 = letters[Math.floor(Math.random() * letters.length)];
    const isUpper1 = Math.random() > 0.5;
    const char1 = isUpper1 ? letter1 : letter1.toLowerCase();

    let char2 = '';
    if (isMatch) {
      matches++;
      const isUpper2 = Math.random() > 0.5;
      char2 = isUpper2 ? letter1 : letter1.toLowerCase();
    } else {
      let letter2 = letters[Math.floor(Math.random() * letters.length)];
      while (letter2 === letter1) {
        letter2 = letters[Math.floor(Math.random() * letters.length)];
      }
      const isUpper2 = Math.random() > 0.5;
      char2 = isUpper2 ? letter2 : letter2.toLowerCase();
    }
    
    pairsDisplay += `${char1}${char2} `;
  }

  return {
    id: Math.random().toString(36).substring(7),
    module: 'perceptual',
    prompt: `How many pairs match? ${pairsDisplay.trim()}`,
    options: ['0', '1', '2', '3', '4'],
    correctAnswer: matches.toString(),
    metadata: { promptStr: `How many pairs match? ${pairsDisplay.trim()}` }
  };
};

export const generateNumber = (): Question => {
  const isFurthest = Math.random() > 0.5;

  if (isFurthest) {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = num1 + Math.floor(Math.random() * 10) + 1;
    const num3 = num2 + Math.floor(Math.random() * 10) + 1;
    const nums = [num1, num2, num3];
    
    const middle = nums.sort((a, b) => a - b)[1];
    
    // Make sure one is definitively furthest
    let n1 = middle - (Math.floor(Math.random() * 10) + 5);
    let n3 = middle + (Math.floor(Math.random() * 10) + 5);
    
    // Ensure differences are not equal
    while (Math.abs(n1 - middle) === Math.abs(n3 - middle)) {
       n3++;
    }

    const finalNums = [n1, middle, n3].sort(() => 0.5 - Math.random());
    const diffs = finalNums.map(n => Math.abs(n - middle));
    const maxDiff = Math.max(...diffs);
    const furthest = finalNums[diffs.indexOf(maxDiff)];

    return {
      id: Math.random().toString(36).substring(7),
      module: 'number',
      prompt: `Which number is furthest in value from the middle one?\n${finalNums.join('  ')}`,
      options: finalNums.map(String),
      correctAnswer: furthest.toString(),
      metadata: { promptStr: `Which number is furthest from the middle one? [${finalNums.join(', ')}]` }
    };
  } else {
    const isLargest = Math.random() > 0.5;
    const nums = Array.from({length: 3}, () => Math.floor(Math.random() * 50) + 1);
    while(new Set(nums).size !== 3) {
      nums[2] = Math.floor(Math.random() * 50) + 1;
    }
    const answer = isLargest ? Math.max(...nums) : Math.min(...nums);

    return {
      id: Math.random().toString(36).substring(7),
      module: 'number',
      prompt: `Which number is the ${isLargest ? 'largest' : 'smallest'}?\n${nums.join('  ')}`,
      options: nums.map(String),
      correctAnswer: answer.toString(),
      metadata: { promptStr: `Which number is the ${isLargest ? 'largest' : 'smallest'}? [${nums.join(', ')}]` }
    };
  }
};

const synonymGroups = [
  ['Happy', 'Joyful', 'Cheerful', 'Delighted', 'Merry'],
  ['Sad', 'Unhappy', 'Sorrowful', 'Depressed', 'Miserable'],
  ['Fast', 'Quick', 'Rapid', 'Swift', 'Speedy'],
  ['Slow', 'Sluggish', 'Leisurely', 'Crawling', 'Plodding'],
  ['Big', 'Large', 'Huge', 'Giant', 'Massive'],
  ['Small', 'Tiny', 'Miniature', 'Petite', 'Little'],
  ['Smart', 'Clever', 'Intelligent', 'Bright', 'Brilliant'],
  ['Dumb', 'Stupid', 'Foolish', 'Unintelligent', 'Dense'],
  ['Brave', 'Courageous', 'Fearless', 'Bold', 'Heroic'],
  ['Scared', 'Fearful', 'Afraid', 'Terrified', 'Frightened'],
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
    prompt: `Which word is the odd one out?\n${words.join('  ')}`,
    options: words,
    correctAnswer: oddWord,
    metadata: { promptStr: `Odd one out: [${words.join(', ')}]` }
  };
};

export const generateSpatial = (): Question => {
  const letters = ['R', 'F', 'L', 'P', 'Q', 'B', 'J', 'G'];
  const letter = letters[Math.floor(Math.random() * letters.length)];
  
  const isMirror = Math.random() > 0.5;
  const rotations = [0, 90, 180, 270];
  const rot1 = rotations[Math.floor(Math.random() * rotations.length)];
  let rot2 = rotations[Math.floor(Math.random() * rotations.length)];
  
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
