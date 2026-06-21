const fs = require('fs');
const path = require('path');

const drillA = `
1, 6, 10
3, 7, 1
2, 9, 5
4, 12, 7
8, 1, 5
15, 8, 11
2, 9, 7
14, 3, 8
5, 13, 11
18, 4, 9
6, 17, 11
3, 10, 8
22, 9, 14
7, 16, 13
8, 19, 12
4, 11, 9
25, 10, 13
2, 16, 7
12, 3, 6
9, 22, 15
5, 14, 12
7, 2, 16
11, 24, 18
6, 18, 11
3, 8, 6
23, 8, 12
5, 20, 9
10, 1, 4
7, 13, 11
4, 17, 8
`.trim().split('\n');

const ansA = `
1
7
9
12
1
15
2
14
5
18
17
3
22
7
19
4
25
16
12
22
5
16
11
18
3
23
20
10
7
17
`.trim().split('\n');

const questionsA = drillA.map((line, i) => {
  const nums = line.split(', ').map(Number);
  return {
    id: 'apt2-num-' + i,
    module: 'number',
    prompt: `Which number is furthest in value from the remaining (middle) number?\n<div class="text-2xl font-semibold mt-4">${line.split(', ').join(' &nbsp;&nbsp;&nbsp; ')}</div>`,
    options: nums.map(String).sort(() => Math.random() - 0.5),
    correctAnswer: ansA[i],
    metadata: { promptStr: line }
  };
});

const drillB = `
Paul is taller than Roy. Who is shorter?
Cecilia is not as clever as Rose. Who is cleverer?
Mark runs faster than Liam. Who is slower?
Sara is heavier than Nina. Who is lighter?
Tom is not as strong as Jack. Who is stronger?
Amy is older than Beth. Who is younger?
Dan is shorter than Sam. Who is taller?
Lily is less experienced than Kate. Who is more experienced?
Ben is quicker than Joe. Who is slower?
Rita is not as tall as Mona. Who is taller?
Carl is richer than Dave. Who is poorer?
Eve is weaker than Fay. Who is stronger?
Noah is not as old as Liam. Who is younger?
Zoe is faster than Ria. Who is slower?
Sam is heavier than Tim but lighter than Max. Who is the heaviest?
Anna is taller than Bea, who is taller than Cara. Who is the shortest?
Jon is not as quick as Kim, and Kim is not as quick as Leo. Who is the quickest?
Mia is older than Nia. Nia is older than Ola. Who is the youngest?
Pete is stronger than Quin but weaker than Rob. Who is the weakest?
Tess is less tall than Uma. Uma is less tall than Vera. Who is the tallest?
`.trim().split('\n');

const ansB = `
Roy
Rose
Liam
Nina
Jack
Beth
Sam
Kate
Joe
Mona
Dave
Fay
Noah
Ria
Max
Cara
Leo
Ola
Quin
Vera
`.trim().split('\n');

const questionsB = drillB.map((line, i) => {
  const words = line.split(' ');
  const names = new Set();
  words.forEach(w => {
    const clean = w.replace(/[^a-zA-Z]/g, '');
    if (clean && clean[0] === clean[0].toUpperCase() && clean.length > 1 && clean !== 'Who') {
      names.add(clean);
    }
  });
  let options = Array.from(names);
  if (options.length < 2) options = [ansB[i], "Other"];
  return {
    id: 'apt2-rea-' + i,
    module: 'reasoning',
    prompt: line,
    options: options.sort(() => Math.random() - 0.5),
    correctAnswer: ansB[i],
    metadata: { promptStr: line }
  };
});

const drillC = `
(E,e) (Q,y) (D,d) (K,k)
(f,F) (d,D) (m,R) (h,H)
(B,b) (c,C) (p,P) (n,N)
(G,q) (t,T) (s,z) (w,w)
(a,A) (b,d) (c,C) (x,y)
(L,l) (M,n) (o,O) (p,q)
(R,r) (s,S) (t,T) (u,U)
(v,w) (x,X) (y,z) (a,b)
(C,c) (D,e) (F,f) (G,h)
(k,K) (l,i) (m,M) (n,N)
(P,q) (R,s) (T,u) (V,w)
(a,A) (e,E) (i,I) (o,O)
(B,d) (C,c) (E,f) (G,g)
(h,H) (j,k) (l,L) (m,n)
(Q,o) (R,r) (S,s) (T,t)
`.trim().split('\n');

const ansC = `
3
3
4
2
2
2
4
1
2
3
0
4
2
2
3
`.trim().split('\n');

const questionsC = drillC.map((line, i) => {
  const pairs = line.split(' ');
  const display = pairs.map(p => `<span class="inline-block mx-3 text-2xl font-mono">${p.replace(/[()]/g, '')}</span>`).join('');
  return {
    id: 'apt2-perc-' + i,
    module: 'perceptual',
    prompt: `How many pairs are the same letter (ignore case)?\n<div class="mt-4 flex justify-center tracking-widest">${display}</div>`,
    options: ['0', '1', '2', '3', '4'],
    correctAnswer: ansC[i],
    metadata: { promptStr: line }
  };
});

const drillD = `
Hot, Cold, Run
Below, Under, Letter
Up, Down, Street
Apple, Banana, Chair
Dog, Cat, Table
Red, Blue, Loud
Happy, Sad, Quick
Car, Bus, Apple
Big, Small, Green
Rose, Tulip, Hammer
Walk, Run, Sing
North, South, Yellow
Hand, Foot, Book
Loud, Quiet, Square
Knife, Fork, Cloud
`.trim().split('\n');

const ansD = `
Run
Letter
Street
Chair
Table
Loud
Quick
Apple
Green
Hammer
Sing
Yellow
Book
Square
Cloud
`.trim().split('\n');

const questionsD = drillD.map((line, i) => {
  const words = line.split(', ');
  return {
    id: 'apt2-word-' + i,
    module: 'word',
    prompt: `Which word is the odd one out?\n<div class="text-xl font-medium mt-3">${words.join(' &nbsp;&nbsp;&nbsp; ')}</div>`,
    options: words.sort(() => Math.random() - 0.5),
    correctAnswer: ansD[i],
    metadata: { promptStr: line }
  };
});

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
