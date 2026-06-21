import { Question } from '../../lib/types';

export const questions: Question[] = [
  {
    "id": "3cds6",
    "module": "reasoning",
    "prompt": "Mike is poorer than John. John is poorer than Chris. Who is the poorest?",
    "options": [
      "Mike",
      "John",
      "Chris"
    ],
    "correctAnswer": "Mike",
    "metadata": {
      "promptStr": "Mike is poorer than John. John is poorer than Chris. Who is the poorest?"
    }
  },
  {
    "id": "gzb66c",
    "module": "perceptual",
    "prompt": "How many pairs are the same letter (ignore case)?\n<div class=\"mt-4 flex justify-center tracking-widest\"><span class=\"inline-block mx-3 text-2xl font-mono\">vV</span><span class=\"inline-block mx-3 text-2xl font-mono\">MM</span><span class=\"inline-block mx-3 text-2xl font-mono\">pp</span><span class=\"inline-block mx-3 text-2xl font-mono\">EE</span><span class=\"inline-block mx-3 text-2xl font-mono\">Ee</span></div>",
    "options": [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "correctAnswer": "5",
    "metadata": {
      "promptStr": "Perceptual: 5 matches"
    }
  },
  {
    "id": "oy0obs",
    "module": "number",
    "prompt": "Which number is the largest?\n<div class=\"text-2xl font-semibold mt-2\">-47 &nbsp;&nbsp;&nbsp; 56 &nbsp;&nbsp;&nbsp; 44 &nbsp;&nbsp;&nbsp; 51</div>",
    "options": [
      "-47",
      "56",
      "44",
      "51"
    ],
    "correctAnswer": "56",
    "metadata": {
      "promptStr": "Which number is the largest? [-47, 56, 44, 51]"
    }
  },
  {
    "id": "did9nc",
    "module": "word",
    "prompt": "Which word is the odd one out?\n<div class=\"text-xl font-medium mt-3\">Swift &nbsp;&nbsp;&nbsp; Rapid &nbsp;&nbsp;&nbsp; Scanty</div>",
    "options": [
      "Swift",
      "Rapid",
      "Scanty"
    ],
    "correctAnswer": "Scanty",
    "metadata": {
      "promptStr": "Odd one out: [Swift, Rapid, Scanty]"
    }
  },
  {
    "id": "da84p",
    "module": "spatial",
    "prompt": "<div class=\"flex justify-center items-center py-4\"><svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" class=\"inline-block mx-4\">\n    <text x=\"50\" y=\"70\" font-family=\"sans-serif\" font-size=\"80\" font-weight=\"bold\" text-anchor=\"middle\" transform=\"rotate(180, 50, 50)\">N</text>\n  </svg> <svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" class=\"inline-block mx-4\">\n    <g transform=\"translate(50, 50) scale(1, 1) translate(-50, -50)\">\n      <text x=\"50\" y=\"70\" font-family=\"sans-serif\" font-size=\"80\" font-weight=\"bold\" text-anchor=\"middle\" transform=\"rotate(225, 50, 50)\">N</text>\n    </g>\n  </svg></div>\nAre these two shapes identical (just rotated) or mirror images?",
    "options": [
      "Identical (Rotated)",
      "Mirror Image"
    ],
    "correctAnswer": "Identical (Rotated)",
    "metadata": {
      "promptStr": "Spatial: N (Mirror: false)"
    }
  },
  {
    "id": "ewmnni",
    "module": "reasoning",
    "prompt": "John is slower than Alex. Sarah is faster than Alex. Who is the slowest?",
    "options": [
      "Sarah",
      "Alex",
      "John"
    ],
    "correctAnswer": "John",
    "metadata": {
      "promptStr": "John is slower than Alex. Sarah is faster than Alex. Who is the slowest?"
    }
  },
  {
    "id": "a2w8ye",
    "module": "perceptual",
    "prompt": "How many pairs are the same letter (ignore case)?\n<div class=\"mt-4 flex justify-center tracking-widest\"><span class=\"inline-block mx-3 text-2xl font-mono\">uU</span><span class=\"inline-block mx-3 text-2xl font-mono\">1l</span><span class=\"inline-block mx-3 text-2xl font-mono\">nQ</span><span class=\"inline-block mx-3 text-2xl font-mono\">B8</span><span class=\"inline-block mx-3 text-2xl font-mono\">dD</span></div>",
    "options": [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "correctAnswer": "2",
    "metadata": {
      "promptStr": "Perceptual: 2 matches"
    }
  },
  {
    "id": "u7bk4g",
    "module": "number",
    "prompt": "Which number is the smallest?\n<div class=\"text-2xl font-semibold mt-2\">70 &nbsp;&nbsp;&nbsp; 3 &nbsp;&nbsp;&nbsp; 49 &nbsp;&nbsp;&nbsp; 19</div>",
    "options": [
      "70",
      "3",
      "49",
      "19"
    ],
    "correctAnswer": "3",
    "metadata": {
      "promptStr": "Which number is the smallest? [70, 3, 49, 19]"
    }
  },
  {
    "id": "5j1ssq",
    "module": "word",
    "prompt": "Which word is the odd one out?\n<div class=\"text-xl font-medium mt-3\">Diligent &nbsp;&nbsp;&nbsp; Industrious &nbsp;&nbsp;&nbsp; Obtuse</div>",
    "options": [
      "Diligent",
      "Industrious",
      "Obtuse"
    ],
    "correctAnswer": "Obtuse",
    "metadata": {
      "promptStr": "Odd one out: [Diligent, Industrious, Obtuse]"
    }
  },
  {
    "id": "gicfs5",
    "module": "spatial",
    "prompt": "<div class=\"flex justify-center items-center py-4\"><svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" class=\"inline-block mx-4\">\n    <text x=\"50\" y=\"70\" font-family=\"sans-serif\" font-size=\"80\" font-weight=\"bold\" text-anchor=\"middle\" transform=\"rotate(90, 50, 50)\">R</text>\n  </svg> <svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" class=\"inline-block mx-4\">\n    <g transform=\"translate(50, 50) scale(1, 1) translate(-50, -50)\">\n      <text x=\"50\" y=\"70\" font-family=\"sans-serif\" font-size=\"80\" font-weight=\"bold\" text-anchor=\"middle\" transform=\"rotate(270, 50, 50)\">R</text>\n    </g>\n  </svg></div>\nAre these two shapes identical (just rotated) or mirror images?",
    "options": [
      "Identical (Rotated)",
      "Mirror Image"
    ],
    "correctAnswer": "Identical (Rotated)",
    "metadata": {
      "promptStr": "Spatial: R (Mirror: false)"
    }
  },
  {
    "id": "3xngpd",
    "module": "reasoning",
    "prompt": "John is younger than Chris. Emma is older than Chris. Who is the oldest?",
    "options": [
      "John",
      "Emma",
      "Chris"
    ],
    "correctAnswer": "Emma",
    "metadata": {
      "promptStr": "John is younger than Chris. Emma is older than Chris. Who is the oldest?"
    }
  },
  {
    "id": "yoi3yh",
    "module": "perceptual",
    "prompt": "How many pairs are the same letter (ignore case)?\n<div class=\"mt-4 flex justify-center tracking-widest\"><span class=\"inline-block mx-3 text-2xl font-mono\">uv</span><span class=\"inline-block mx-3 text-2xl font-mono\">sS</span><span class=\"inline-block mx-3 text-2xl font-mono\">AF</span><span class=\"inline-block mx-3 text-2xl font-mono\">B8</span><span class=\"inline-block mx-3 text-2xl font-mono\">qz</span></div>",
    "options": [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "correctAnswer": "1",
    "metadata": {
      "promptStr": "Perceptual: 1 matches"
    }
  },
  {
    "id": "xi1cu8",
    "module": "number",
    "prompt": "Which number is furthest in value from the middle one?\n<div class=\"text-2xl font-semibold mt-2\">74 &nbsp;&nbsp;&nbsp; 94 &nbsp;&nbsp;&nbsp; 59</div>",
    "options": [
      "74",
      "94",
      "59"
    ],
    "correctAnswer": "94",
    "metadata": {
      "promptStr": "Which number is furthest from the middle one? [74, 94, 59]"
    }
  },
  {
    "id": "hkoak",
    "module": "word",
    "prompt": "Which word is the odd one out?\n<div class=\"text-xl font-medium mt-3\">Enduring &nbsp;&nbsp;&nbsp; Fearful &nbsp;&nbsp;&nbsp; Scared</div>",
    "options": [
      "Enduring",
      "Fearful",
      "Scared"
    ],
    "correctAnswer": "Enduring",
    "metadata": {
      "promptStr": "Odd one out: [Enduring, Fearful, Scared]"
    }
  },
  {
    "id": "if3a28",
    "module": "spatial",
    "prompt": "<div class=\"flex justify-center items-center py-4\"><svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" class=\"inline-block mx-4\">\n    <text x=\"50\" y=\"70\" font-family=\"sans-serif\" font-size=\"80\" font-weight=\"bold\" text-anchor=\"middle\" transform=\"rotate(225, 50, 50)\">P</text>\n  </svg> <svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" class=\"inline-block mx-4\">\n    <g transform=\"translate(50, 50) scale(1, 1) translate(-50, -50)\">\n      <text x=\"50\" y=\"70\" font-family=\"sans-serif\" font-size=\"80\" font-weight=\"bold\" text-anchor=\"middle\" transform=\"rotate(180, 50, 50)\">P</text>\n    </g>\n  </svg></div>\nAre these two shapes identical (just rotated) or mirror images?",
    "options": [
      "Identical (Rotated)",
      "Mirror Image"
    ],
    "correctAnswer": "Identical (Rotated)",
    "metadata": {
      "promptStr": "Spatial: P (Mirror: false)"
    }
  },
  {
    "id": "b9sw1",
    "module": "reasoning",
    "prompt": "Sam is taller than David. John is shorter than David. Who is the tallest?",
    "options": [
      "John",
      "David",
      "Sam"
    ],
    "correctAnswer": "Sam",
    "metadata": {
      "promptStr": "Sam is taller than David. John is shorter than David. Who is the tallest?"
    }
  },
  {
    "id": "j5d33d",
    "module": "perceptual",
    "prompt": "How many pairs are the same letter (ignore case)?\n<div class=\"mt-4 flex justify-center tracking-widest\"><span class=\"inline-block mx-3 text-2xl font-mono\">B8</span><span class=\"inline-block mx-3 text-2xl font-mono\">lL</span><span class=\"inline-block mx-3 text-2xl font-mono\">qp</span><span class=\"inline-block mx-3 text-2xl font-mono\">mn</span><span class=\"inline-block mx-3 text-2xl font-mono\">AA</span></div>",
    "options": [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "correctAnswer": "2",
    "metadata": {
      "promptStr": "Perceptual: 2 matches"
    }
  },
  {
    "id": "08jy0a",
    "module": "number",
    "prompt": "Which number is the smallest?\n<div class=\"text-2xl font-semibold mt-2\">29 &nbsp;&nbsp;&nbsp; -35 &nbsp;&nbsp;&nbsp; -47 &nbsp;&nbsp;&nbsp; 77</div>",
    "options": [
      "29",
      "-35",
      "-47",
      "77"
    ],
    "correctAnswer": "-47",
    "metadata": {
      "promptStr": "Which number is the smallest? [29, -35, -47, 77]"
    }
  },
  {
    "id": "oymxse",
    "module": "word",
    "prompt": "Which word is the odd one out?\n<div class=\"text-xl font-medium mt-3\">Sorrowful &nbsp;&nbsp;&nbsp; Happy &nbsp;&nbsp;&nbsp; Merry</div>",
    "options": [
      "Sorrowful",
      "Happy",
      "Merry"
    ],
    "correctAnswer": "Sorrowful",
    "metadata": {
      "promptStr": "Odd one out: [Sorrowful, Happy, Merry]"
    }
  },
  {
    "id": "s0n90e9",
    "module": "spatial",
    "prompt": "<div class=\"flex justify-center items-center py-4\"><svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" class=\"inline-block mx-4\">\n    <text x=\"50\" y=\"70\" font-family=\"sans-serif\" font-size=\"80\" font-weight=\"bold\" text-anchor=\"middle\" transform=\"rotate(315, 50, 50)\">P</text>\n  </svg> <svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" class=\"inline-block mx-4\">\n    <g transform=\"translate(50, 50) scale(-1, 1) translate(-50, -50)\">\n      <text x=\"50\" y=\"70\" font-family=\"sans-serif\" font-size=\"80\" font-weight=\"bold\" text-anchor=\"middle\" transform=\"rotate(90, 50, 50)\">P</text>\n    </g>\n  </svg></div>\nAre these two shapes identical (just rotated) or mirror images?",
    "options": [
      "Identical (Rotated)",
      "Mirror Image"
    ],
    "correctAnswer": "Mirror Image",
    "metadata": {
      "promptStr": "Spatial: P (Mirror: true)"
    }
  },
  {
    "id": "nss0i",
    "module": "reasoning",
    "prompt": "Alex is younger than Sarah. Emma is younger than Alex. Who is the oldest?",
    "options": [
      "Alex",
      "Sarah",
      "Emma"
    ],
    "correctAnswer": "Sarah",
    "metadata": {
      "promptStr": "Alex is younger than Sarah. Emma is younger than Alex. Who is the oldest?"
    }
  },
  {
    "id": "3644ul",
    "module": "perceptual",
    "prompt": "How many pairs are the same letter (ignore case)?\n<div class=\"mt-4 flex justify-center tracking-widest\"><span class=\"inline-block mx-3 text-2xl font-mono\">VQ</span><span class=\"inline-block mx-3 text-2xl font-mono\">Il</span><span class=\"inline-block mx-3 text-2xl font-mono\">AH</span><span class=\"inline-block mx-3 text-2xl font-mono\">hh</span><span class=\"inline-block mx-3 text-2xl font-mono\">Ff</span></div>",
    "options": [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "correctAnswer": "2",
    "metadata": {
      "promptStr": "Perceptual: 2 matches"
    }
  },
  {
    "id": "brt1da",
    "module": "number",
    "prompt": "Which number is furthest in value from the middle one?\n<div class=\"text-2xl font-semibold mt-2\">58 &nbsp;&nbsp;&nbsp; 44 &nbsp;&nbsp;&nbsp; 73</div>",
    "options": [
      "58",
      "44",
      "73"
    ],
    "correctAnswer": "73",
    "metadata": {
      "promptStr": "Which number is furthest from the middle one? [58, 44, 73]"
    }
  },
  {
    "id": "407t2",
    "module": "word",
    "prompt": "Which word is the odd one out?\n<div class=\"text-xl font-medium mt-3\">Huge &nbsp;&nbsp;&nbsp; Big &nbsp;&nbsp;&nbsp; Scared</div>",
    "options": [
      "Huge",
      "Big",
      "Scared"
    ],
    "correctAnswer": "Scared",
    "metadata": {
      "promptStr": "Odd one out: [Huge, Big, Scared]"
    }
  },
  {
    "id": "2uzo9i",
    "module": "spatial",
    "prompt": "<div class=\"flex justify-center items-center py-4\"><svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" class=\"inline-block mx-4\">\n    <text x=\"50\" y=\"70\" font-family=\"sans-serif\" font-size=\"80\" font-weight=\"bold\" text-anchor=\"middle\" transform=\"rotate(45, 50, 50)\">Z</text>\n  </svg> <svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" class=\"inline-block mx-4\">\n    <g transform=\"translate(50, 50) scale(1, 1) translate(-50, -50)\">\n      <text x=\"50\" y=\"70\" font-family=\"sans-serif\" font-size=\"80\" font-weight=\"bold\" text-anchor=\"middle\" transform=\"rotate(90, 50, 50)\">Z</text>\n    </g>\n  </svg></div>\nAre these two shapes identical (just rotated) or mirror images?",
    "options": [
      "Identical (Rotated)",
      "Mirror Image"
    ],
    "correctAnswer": "Identical (Rotated)",
    "metadata": {
      "promptStr": "Spatial: Z (Mirror: false)"
    }
  },
  {
    "id": "4y65pt",
    "module": "reasoning",
    "prompt": "Lisa is poorer than Tom. Alex is richer than Tom. Who is the poorest?",
    "options": [
      "Lisa",
      "Tom",
      "Alex"
    ],
    "correctAnswer": "Lisa",
    "metadata": {
      "promptStr": "Lisa is poorer than Tom. Alex is richer than Tom. Who is the poorest?"
    }
  },
  {
    "id": "g2o1op",
    "module": "perceptual",
    "prompt": "How many pairs are the same letter (ignore case)?\n<div class=\"mt-4 flex justify-center tracking-widest\"><span class=\"inline-block mx-3 text-2xl font-mono\">mn</span><span class=\"inline-block mx-3 text-2xl font-mono\">QQ</span><span class=\"inline-block mx-3 text-2xl font-mono\">dz</span><span class=\"inline-block mx-3 text-2xl font-mono\">lL</span><span class=\"inline-block mx-3 text-2xl font-mono\">Kk</span></div>",
    "options": [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "correctAnswer": "3",
    "metadata": {
      "promptStr": "Perceptual: 3 matches"
    }
  },
  {
    "id": "6539ifi",
    "module": "number",
    "prompt": "Which number is furthest in value from the middle one?\n<div class=\"text-2xl font-semibold mt-2\">95 &nbsp;&nbsp;&nbsp; 78 &nbsp;&nbsp;&nbsp; 105</div>",
    "options": [
      "95",
      "78",
      "105"
    ],
    "correctAnswer": "78",
    "metadata": {
      "promptStr": "Which number is furthest from the middle one? [95, 78, 105]"
    }
  },
  {
    "id": "8rxjzc",
    "module": "word",
    "prompt": "Which word is the odd one out?\n<div class=\"text-xl font-medium mt-3\">Apathetic &nbsp;&nbsp;&nbsp; Unhappy &nbsp;&nbsp;&nbsp; Miserable</div>",
    "options": [
      "Apathetic",
      "Unhappy",
      "Miserable"
    ],
    "correctAnswer": "Apathetic",
    "metadata": {
      "promptStr": "Odd one out: [Apathetic, Unhappy, Miserable]"
    }
  },
  {
    "id": "rs5as",
    "module": "spatial",
    "prompt": "<div class=\"flex justify-center items-center py-4\"><svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" class=\"inline-block mx-4\">\n    <text x=\"50\" y=\"70\" font-family=\"sans-serif\" font-size=\"80\" font-weight=\"bold\" text-anchor=\"middle\" transform=\"rotate(270, 50, 50)\">Q</text>\n  </svg> <svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" class=\"inline-block mx-4\">\n    <g transform=\"translate(50, 50) scale(1, 1) translate(-50, -50)\">\n      <text x=\"50\" y=\"70\" font-family=\"sans-serif\" font-size=\"80\" font-weight=\"bold\" text-anchor=\"middle\" transform=\"rotate(225, 50, 50)\">Q</text>\n    </g>\n  </svg></div>\nAre these two shapes identical (just rotated) or mirror images?",
    "options": [
      "Identical (Rotated)",
      "Mirror Image"
    ],
    "correctAnswer": "Identical (Rotated)",
    "metadata": {
      "promptStr": "Spatial: Q (Mirror: false)"
    }
  },
  {
    "id": "48fefn",
    "module": "reasoning",
    "prompt": "Sam is lighter than David. David is lighter than Emma. Who is the lightest?",
    "options": [
      "Emma",
      "Sam",
      "David"
    ],
    "correctAnswer": "Sam",
    "metadata": {
      "promptStr": "Sam is lighter than David. David is lighter than Emma. Who is the lightest?"
    }
  },
  {
    "id": "2zsfcs",
    "module": "perceptual",
    "prompt": "How many pairs are the same letter (ignore case)?\n<div class=\"mt-4 flex justify-center tracking-widest\"><span class=\"inline-block mx-3 text-2xl font-mono\">kk</span><span class=\"inline-block mx-3 text-2xl font-mono\">aa</span><span class=\"inline-block mx-3 text-2xl font-mono\">ZZ</span><span class=\"inline-block mx-3 text-2xl font-mono\">wW</span><span class=\"inline-block mx-3 text-2xl font-mono\">ss</span></div>",
    "options": [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "correctAnswer": "5",
    "metadata": {
      "promptStr": "Perceptual: 5 matches"
    }
  },
  {
    "id": "z40ylk",
    "module": "number",
    "prompt": "Which number is furthest in value from the middle one?\n<div class=\"text-2xl font-semibold mt-2\">103 &nbsp;&nbsp;&nbsp; 83 &nbsp;&nbsp;&nbsp; 59</div>",
    "options": [
      "103",
      "83",
      "59"
    ],
    "correctAnswer": "59",
    "metadata": {
      "promptStr": "Which number is furthest from the middle one? [103, 83, 59]"
    }
  },
  {
    "id": "xvfd7q",
    "module": "word",
    "prompt": "Which word is the odd one out?\n<div class=\"text-xl font-medium mt-3\">Permanent &nbsp;&nbsp;&nbsp; Ambiguous &nbsp;&nbsp;&nbsp; Nebulous</div>",
    "options": [
      "Permanent",
      "Ambiguous",
      "Nebulous"
    ],
    "correctAnswer": "Permanent",
    "metadata": {
      "promptStr": "Odd one out: [Permanent, Ambiguous, Nebulous]"
    }
  },
  {
    "id": "wsdjn",
    "module": "spatial",
    "prompt": "<div class=\"flex justify-center items-center py-4\"><svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" class=\"inline-block mx-4\">\n    <text x=\"50\" y=\"70\" font-family=\"sans-serif\" font-size=\"80\" font-weight=\"bold\" text-anchor=\"middle\" transform=\"rotate(225, 50, 50)\">J</text>\n  </svg> <svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" class=\"inline-block mx-4\">\n    <g transform=\"translate(50, 50) scale(-1, 1) translate(-50, -50)\">\n      <text x=\"50\" y=\"70\" font-family=\"sans-serif\" font-size=\"80\" font-weight=\"bold\" text-anchor=\"middle\" transform=\"rotate(315, 50, 50)\">J</text>\n    </g>\n  </svg></div>\nAre these two shapes identical (just rotated) or mirror images?",
    "options": [
      "Identical (Rotated)",
      "Mirror Image"
    ],
    "correctAnswer": "Mirror Image",
    "metadata": {
      "promptStr": "Spatial: J (Mirror: true)"
    }
  },
  {
    "id": "63ysy",
    "module": "reasoning",
    "prompt": "Sam is richer than Alex. Sam is poorer than John. Who is the richest?",
    "options": [
      "Alex",
      "Sam",
      "John"
    ],
    "correctAnswer": "John",
    "metadata": {
      "promptStr": "Sam is richer than Alex. Sam is poorer than John. Who is the richest?"
    }
  },
  {
    "id": "c439fy",
    "module": "perceptual",
    "prompt": "How many pairs are the same letter (ignore case)?\n<div class=\"mt-4 flex justify-center tracking-widest\"><span class=\"inline-block mx-3 text-2xl font-mono\">5S</span><span class=\"inline-block mx-3 text-2xl font-mono\">Tp</span><span class=\"inline-block mx-3 text-2xl font-mono\">Kk</span><span class=\"inline-block mx-3 text-2xl font-mono\">HL</span><span class=\"inline-block mx-3 text-2xl font-mono\">KK</span></div>",
    "options": [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "correctAnswer": "2",
    "metadata": {
      "promptStr": "Perceptual: 2 matches"
    }
  },
  {
    "id": "8j00ol",
    "module": "number",
    "prompt": "Which number is furthest in value from the middle one?\n<div class=\"text-2xl font-semibold mt-2\">42 &nbsp;&nbsp;&nbsp; 58 &nbsp;&nbsp;&nbsp; 72</div>",
    "options": [
      "42",
      "58",
      "72"
    ],
    "correctAnswer": "42",
    "metadata": {
      "promptStr": "Which number is furthest from the middle one? [42, 58, 72]"
    }
  },
  {
    "id": "wyuhjq",
    "module": "word",
    "prompt": "Which word is the odd one out?\n<div class=\"text-xl font-medium mt-3\">Cryptic &nbsp;&nbsp;&nbsp; Nebulous &nbsp;&nbsp;&nbsp; Enduring</div>",
    "options": [
      "Cryptic",
      "Nebulous",
      "Enduring"
    ],
    "correctAnswer": "Enduring",
    "metadata": {
      "promptStr": "Odd one out: [Cryptic, Nebulous, Enduring]"
    }
  },
  {
    "id": "hld5ip",
    "module": "spatial",
    "prompt": "<div class=\"flex justify-center items-center py-4\"><svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" class=\"inline-block mx-4\">\n    <text x=\"50\" y=\"70\" font-family=\"sans-serif\" font-size=\"80\" font-weight=\"bold\" text-anchor=\"middle\" transform=\"rotate(135, 50, 50)\">F</text>\n  </svg> <svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" class=\"inline-block mx-4\">\n    <g transform=\"translate(50, 50) scale(-1, 1) translate(-50, -50)\">\n      <text x=\"50\" y=\"70\" font-family=\"sans-serif\" font-size=\"80\" font-weight=\"bold\" text-anchor=\"middle\" transform=\"rotate(225, 50, 50)\">F</text>\n    </g>\n  </svg></div>\nAre these two shapes identical (just rotated) or mirror images?",
    "options": [
      "Identical (Rotated)",
      "Mirror Image"
    ],
    "correctAnswer": "Mirror Image",
    "metadata": {
      "promptStr": "Spatial: F (Mirror: true)"
    }
  },
  {
    "id": "ipwjuf",
    "module": "reasoning",
    "prompt": "Chris is older than Alex. Chris is younger than Tom. Who is the youngest?",
    "options": [
      "Alex",
      "Chris",
      "Tom"
    ],
    "correctAnswer": "Alex",
    "metadata": {
      "promptStr": "Chris is older than Alex. Chris is younger than Tom. Who is the youngest?"
    }
  },
  {
    "id": "9anjge",
    "module": "perceptual",
    "prompt": "How many pairs are the same letter (ignore case)?\n<div class=\"mt-4 flex justify-center tracking-widest\"><span class=\"inline-block mx-3 text-2xl font-mono\">mn</span><span class=\"inline-block mx-3 text-2xl font-mono\">l1</span><span class=\"inline-block mx-3 text-2xl font-mono\">Xx</span><span class=\"inline-block mx-3 text-2xl font-mono\">Tv</span><span class=\"inline-block mx-3 text-2xl font-mono\">Bb</span></div>",
    "options": [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "correctAnswer": "2",
    "metadata": {
      "promptStr": "Perceptual: 2 matches"
    }
  },
  {
    "id": "ppbizm",
    "module": "number",
    "prompt": "Which number is the largest?\n<div class=\"text-2xl font-semibold mt-2\">-7 &nbsp;&nbsp;&nbsp; -4 &nbsp;&nbsp;&nbsp; 30 &nbsp;&nbsp;&nbsp; -40</div>",
    "options": [
      "-7",
      "-4",
      "30",
      "-40"
    ],
    "correctAnswer": "30",
    "metadata": {
      "promptStr": "Which number is the largest? [-7, -4, 30, -40]"
    }
  },
  {
    "id": "rfn2h8",
    "module": "word",
    "prompt": "Which word is the odd one out?\n<div class=\"text-xl font-medium mt-3\">Foolish &nbsp;&nbsp;&nbsp; Merry &nbsp;&nbsp;&nbsp; Ecstatic</div>",
    "options": [
      "Foolish",
      "Merry",
      "Ecstatic"
    ],
    "correctAnswer": "Foolish",
    "metadata": {
      "promptStr": "Odd one out: [Foolish, Merry, Ecstatic]"
    }
  },
  {
    "id": "90t7p",
    "module": "spatial",
    "prompt": "<div class=\"flex justify-center items-center py-4\"><svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" class=\"inline-block mx-4\">\n    <text x=\"50\" y=\"70\" font-family=\"sans-serif\" font-size=\"80\" font-weight=\"bold\" text-anchor=\"middle\" transform=\"rotate(180, 50, 50)\">J</text>\n  </svg> <svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" class=\"inline-block mx-4\">\n    <g transform=\"translate(50, 50) scale(1, 1) translate(-50, -50)\">\n      <text x=\"50\" y=\"70\" font-family=\"sans-serif\" font-size=\"80\" font-weight=\"bold\" text-anchor=\"middle\" transform=\"rotate(90, 50, 50)\">J</text>\n    </g>\n  </svg></div>\nAre these two shapes identical (just rotated) or mirror images?",
    "options": [
      "Identical (Rotated)",
      "Mirror Image"
    ],
    "correctAnswer": "Identical (Rotated)",
    "metadata": {
      "promptStr": "Spatial: J (Mirror: false)"
    }
  },
  {
    "id": "vyzmj",
    "module": "reasoning",
    "prompt": "Lisa is poorer than Mike. Mike is poorer than Sam. Who is the richest?",
    "options": [
      "Sam",
      "Mike",
      "Lisa"
    ],
    "correctAnswer": "Sam",
    "metadata": {
      "promptStr": "Lisa is poorer than Mike. Mike is poorer than Sam. Who is the richest?"
    }
  },
  {
    "id": "herjok",
    "module": "perceptual",
    "prompt": "How many pairs are the same letter (ignore case)?\n<div class=\"mt-4 flex justify-center tracking-widest\"><span class=\"inline-block mx-3 text-2xl font-mono\">pU</span><span class=\"inline-block mx-3 text-2xl font-mono\">S5</span><span class=\"inline-block mx-3 text-2xl font-mono\">zz</span><span class=\"inline-block mx-3 text-2xl font-mono\">RR</span><span class=\"inline-block mx-3 text-2xl font-mono\">LR</span></div>",
    "options": [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "correctAnswer": "2",
    "metadata": {
      "promptStr": "Perceptual: 2 matches"
    }
  },
  {
    "id": "exiywd",
    "module": "number",
    "prompt": "Which number is the largest?\n<div class=\"text-2xl font-semibold mt-2\">-18 &nbsp;&nbsp;&nbsp; 46 &nbsp;&nbsp;&nbsp; 45 &nbsp;&nbsp;&nbsp; 55</div>",
    "options": [
      "-18",
      "46",
      "45",
      "55"
    ],
    "correctAnswer": "55",
    "metadata": {
      "promptStr": "Which number is the largest? [-18, 46, 45, 55]"
    }
  },
  {
    "id": "57pz1",
    "module": "word",
    "prompt": "Which word is the odd one out?\n<div class=\"text-xl font-medium mt-3\">Ignorant &nbsp;&nbsp;&nbsp; Tiny &nbsp;&nbsp;&nbsp; Small</div>",
    "options": [
      "Ignorant",
      "Tiny",
      "Small"
    ],
    "correctAnswer": "Ignorant",
    "metadata": {
      "promptStr": "Odd one out: [Ignorant, Tiny, Small]"
    }
  },
  {
    "id": "5oear",
    "module": "spatial",
    "prompt": "<div class=\"flex justify-center items-center py-4\"><svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" class=\"inline-block mx-4\">\n    <text x=\"50\" y=\"70\" font-family=\"sans-serif\" font-size=\"80\" font-weight=\"bold\" text-anchor=\"middle\" transform=\"rotate(0, 50, 50)\">L</text>\n  </svg> <svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" class=\"inline-block mx-4\">\n    <g transform=\"translate(50, 50) scale(1, 1) translate(-50, -50)\">\n      <text x=\"50\" y=\"70\" font-family=\"sans-serif\" font-size=\"80\" font-weight=\"bold\" text-anchor=\"middle\" transform=\"rotate(90, 50, 50)\">L</text>\n    </g>\n  </svg></div>\nAre these two shapes identical (just rotated) or mirror images?",
    "options": [
      "Identical (Rotated)",
      "Mirror Image"
    ],
    "correctAnswer": "Identical (Rotated)",
    "metadata": {
      "promptStr": "Spatial: L (Mirror: false)"
    }
  }
];
