const fs = require('fs');
const path = require('path');

// 1. NUMBER SPEED
// Logic: 3 numbers. Find the middle value, then find the one furthest from it.
const questionsA = [];
for (let i = 0; i < 50; i++) {
  let n1, n2, n3;
  while (true) {
    n1 = Math.floor(Math.random() * 30) + 1;
    n2 = Math.floor(Math.random() * 30) + 1;
    n3 = Math.floor(Math.random() * 30) + 1;
    if (n1 === n2 || n2 === n3 || n1 === n3) continue;
    
    let sorted = [n1, n2, n3].sort((a, b) => a - b);
    let mid = sorted[1];
    let dist1 = Math.abs(sorted[0] - mid);
    let dist2 = Math.abs(sorted[2] - mid);
    if (dist1 !== dist2) break; // Must be exactly one furthest
  }
  
  let sorted = [n1, n2, n3].sort((a, b) => a - b);
  let mid = sorted[1];
  let furthest = Math.abs(sorted[0] - mid) > Math.abs(sorted[2] - mid) ? sorted[0] : sorted[2];
  
  questionsA.push({
    id: 'apt2-num-' + i,
    module: 'number',
    prompt: `Which number is furthest in value from the remaining (middle) number?\n<div class="text-2xl font-semibold mt-4">${n1} &nbsp;&nbsp;&nbsp; ${n2} &nbsp;&nbsp;&nbsp; ${n3}</div>`,
    options: [String(n1), String(n2), String(n3)].sort(() => Math.random() - 0.5),
    correctAnswer: String(furthest),
    metadata: { promptStr: `${n1}, ${n2}, ${n3}` }
  });
}

// 2. REASONING
const names = ['Paul', 'Roy', 'Mark', 'Liam', 'Sara', 'Nina', 'Tom', 'Jack', 'Amy', 'Beth', 'Dan', 'Sam', 'Lily', 'Kate', 'Ben', 'Joe', 'Rita', 'Mona', 'Carl', 'Dave', 'Eve', 'Fay', 'Noah', 'Zoe', 'Ria'];
const adjs = [
  { p: 'taller', op: 'shorter' },
  { p: 'faster', op: 'slower' },
  { p: 'heavier', op: 'lighter' },
  { p: 'stronger', op: 'weaker' },
  { p: 'older', op: 'younger' },
  { p: 'richer', op: 'poorer' }
];
const questionsB = [];
for (let i = 0; i < 40; i++) {
  const n1 = names[Math.floor(Math.random() * names.length)];
  let n2;
  while (true) {
    n2 = names[Math.floor(Math.random() * names.length)];
    if (n1 !== n2) break;
  }
  
  const adj = adjs[Math.floor(Math.random() * adjs.length)];
  const type = Math.floor(Math.random() * 3);
  let promptStr = '';
  let ans = '';
  
  if (type === 0) {
    promptStr = `${n1} is ${adj.p} than ${n2}. Who is ${adj.op}?`;
    ans = n2;
  } else if (type === 1) {
    promptStr = `${n1} is not as ${adj.p.replace('er', '')} as ${n2}. Who is ${adj.p}?`;
    ans = n2;
  } else {
    promptStr = `${n1} is ${adj.op} than ${n2}. Who is ${adj.p}?`;
    ans = n2;
  }

  questionsB.push({
    id: 'apt2-rea-' + i,
    module: 'reasoning',
    prompt: promptStr,
    options: [n1, n2].sort(() => Math.random() - 0.5),
    correctAnswer: ans,
    metadata: { promptStr }
  });
}

// 3. PERCEPTUAL SPEED
const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const questionsC = [];
for (let i = 0; i < 40; i++) {
  let pairs = [];
  let numMatches = 0;
  for (let p = 0; p < 4; p++) {
    const isMatch = Math.random() > 0.5;
    const l1 = letters[Math.floor(Math.random() * letters.length)];
    let l2;
    if (isMatch) {
      l2 = Math.random() > 0.5 ? l1.toLowerCase() : l1.toUpperCase();
      numMatches++;
    } else {
      while (true) {
        l2 = letters[Math.floor(Math.random() * letters.length)];
        if (l1.toLowerCase() !== l2.toLowerCase()) break;
      }
    }
    pairs.push([l1, l2]);
  }
  
  const tops = pairs.map(p => p[0]);
  const bottoms = pairs.map(p => p[1]);

  const topRow = tops.map(t => `<div class="text-4xl font-bold font-sans text-slate-800">${t}</div>`).join('');
  const bottomRow = bottoms.map(b => `<div class="text-4xl font-bold font-sans text-slate-800">${b}</div>`).join('');

  const display = `
    <div class="flex flex-col items-center space-y-8 mt-8 mb-4 px-8 py-6 bg-slate-50 border-2 border-slate-200 rounded">
      <div class="flex space-x-16 w-full justify-center">${topRow}</div>
      <div class="flex space-x-16 w-full justify-center">${bottomRow}</div>
    </div>
  `;

  questionsC.push({
    id: 'apt2-perc-' + i,
    module: 'perceptual',
    prompt: `How many pairs are the same letter (ignore case)?\n${display}`,
    options: ['0', '1', '2', '3', '4'],
    correctAnswer: String(numMatches),
    metadata: { promptStr: pairs.map(p => `(${p[0]},${p[1]})`).join(' ') }
  });
}

// 4. WORD MEANING
const categories = {
  animals: ['Dog', 'Cat', 'Lion', 'Tiger', 'Bear', 'Wolf', 'Fox'],
  furniture: ['Table', 'Chair', 'Desk', 'Bed', 'Sofa', 'Cabinet'],
  colors: ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Pink'],
  fruits: ['Apple', 'Banana', 'Orange', 'Grape', 'Pear', 'Peach'],
  tools: ['Hammer', 'Wrench', 'Screwdriver', 'Saw', 'Drill'],
  vehicles: ['Car', 'Bus', 'Truck', 'Bike', 'Train', 'Boat']
};
const catKeys = Object.keys(categories);
const questionsD = [];
for (let i = 0; i < 40; i++) {
  const c1 = catKeys[Math.floor(Math.random() * catKeys.length)];
  let c2;
  while(true) {
    c2 = catKeys[Math.floor(Math.random() * catKeys.length)];
    if(c1 !== c2) break;
  }
  
  const w1 = categories[c1][Math.floor(Math.random() * categories[c1].length)];
  let w2;
  while(true) {
    w2 = categories[c1][Math.floor(Math.random() * categories[c1].length)];
    if(w1 !== w2) break;
  }
  
  const w3 = categories[c2][Math.floor(Math.random() * categories[c2].length)];
  
  const words = [w1, w2, w3].sort(() => Math.random() - 0.5);
  
  questionsD.push({
    id: 'apt2-word-' + i,
    module: 'word',
    prompt: `Which word is the odd one out?\n<div class="text-xl font-medium mt-3">${words.join(' &nbsp;&nbsp;&nbsp; ')}</div>`,
    options: [...words],
    correctAnswer: w3,
    metadata: { promptStr: words.join(', ') }
  });
}

function writeTest(testId, title, durationSeconds, questions) {
  const dir = path.join(__dirname, 'src/tests', testId);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'metadata.ts'), `export const metadata = { id: '${testId}', title: '${title}' };`);
  fs.writeFileSync(path.join(dir, 'config.ts'), `export const config = { durationSeconds: ${durationSeconds} };`);
  fs.writeFileSync(path.join(dir, 'questions.ts'), `import { Question } from '../../lib/types';\nexport const questions: Question[] = ${JSON.stringify(questions, null, 2)};`);
}

writeTest('apt2-number', 'Aptitude Test 2 - Number Speed', 180, questionsA);
writeTest('apt2-reasoning', 'Aptitude Test 2 - Reasoning', 120, questionsB);
writeTest('apt2-perceptual', 'Aptitude Test 2 - Perceptual Speed', 75, questionsC);
writeTest('apt2-word', 'Aptitude Test 2 - Word Meaning', 75, questionsD);
