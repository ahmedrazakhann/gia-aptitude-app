const fs = require('fs');
const path = require('path');

const questions = [];
const angles = [0, 90, 180, 270];

function getRandomShape() {
  const isMirrored = Math.random() > 0.5;
  const rot = angles[Math.floor(Math.random() * angles.length)];
  const scaleStr = isMirrored ? 'scaleX(-1) ' : '';
  // Use a clean sans-serif font for the R
  const html = `<div class="text-6xl font-sans font-bold text-slate-700" style="transform: ${scaleStr}rotate(${rot}deg); display: inline-block;">R</div>`;
  return { html, isMirrored };
}

for (let i = 0; i < 15; i++) {
  // Box 1
  const b1s1 = getRandomShape();
  const b1s2 = getRandomShape();
  const box1Match = (b1s1.isMirrored === b1s2.isMirrored) ? 1 : 0;

  // Box 2
  const b2s1 = getRandomShape();
  const b2s2 = getRandomShape();
  const box2Match = (b2s1.isMirrored === b2s2.isMirrored) ? 1 : 0;

  const totalMatches = box1Match + box2Match;

  const prompt = `<div class="flex justify-center items-center space-x-12 my-6">
  <div class="w-32 py-8 flex flex-col justify-center items-center space-y-12 bg-white border-2 border-slate-200 rounded shadow-sm">
    ${b1s1.html}
    ${b1s2.html}
  </div>
  <div class="w-32 py-8 flex flex-col justify-center items-center space-y-12 bg-white border-2 border-slate-200 rounded shadow-sm">
    ${b2s1.html}
    ${b2s2.html}
  </div>
</div>`;

  questions.push({
    id: 'apt2-spatial-' + i,
    module: 'spatial',
    prompt: prompt,
    options: ['0', '1', '2'],
    correctAnswer: String(totalMatches),
    metadata: {}
  });
}

const content = `import { Question } from '../../lib/types';\n\nexport const questions: Question[] = ${JSON.stringify(questions, null, 2)};`;
fs.writeFileSync(path.join(__dirname, 'src/tests/apt2-spatial/questions.ts'), content);
