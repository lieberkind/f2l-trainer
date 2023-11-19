import { range } from "./util";

export type AlgId = number;

export interface Alg {
  id: AlgId;
  scramble: string;
  solutions: string[];
}

export interface AlgSet {
  id: string;
  title: string;
  algIds: AlgId[];
}

export const algSets: AlgSet[] = [
  {
    id: "all-algs",
    title: "All algorithms",
    algIds: range(1, 41)
  },
  {
    id: "white-sticker-faces-up",
    title: "White sticker faces up",
    algIds: range(1, 8)
  },
  {
    id: "white-sticker-faces-side-or-front",
    title: "White sticker faces side/front",
    algIds: range(9, 16)
  },
  {
    id: "edge-in-the-slot",
    title: "Edge in the slot",
    algIds: range(25, 30)
  },
  {
    id: "corner-in-the-slot",
    title: "Corner in the slot",
    algIds: range(31, 36)
  },
  {
    id: "both-pieces-in-the-correct-slot",
    title: "Both pieces in the correct slot",
    algIds: range(37, 41)
  }
];

const algs: Alg[] = [
  {
    id: 1,
    scramble: `R U R' U' R U' R' U2`,
    solutions: [`U2 (R U R') U (R U' R')`]
  },
  {
    id: 2,
    scramble: `R U R' U' R U2 R' U'`,
    solutions: [`U (R U2 R') U (R U' R')`]
  },
  {
    id: 3,
    scramble: `R' D' R U2 R' D R2 U R'`,
    solutions: [
      `U (R U' R') U' (R U' R' U R U' R')`,
      `U (F R' F' R) U (R U R')`,
      `R U' R2' D' R U2 R' D R`
    ]
  },
  {
    id: 4,
    scramble: `R U' R' U R U2 R'`,
    solutions: [`(R U2 R') U' (R U R')`]
  },
  {
    id: 5,
    scramble: `L' U' L U L' U L U2 y'`,
    solutions: [`y U2 (L' U' L) U' (L' U L)`]
  },
  {
    id: 6,
    scramble: `L' U' L U L' U2 L U y'`,
    solutions: [`y U' (L' U2 L) U' (L' U L)`]
  },
  {
    id: 7,
    scramble: `R U R' F R U R' U' F'`,
    solutions: [
      `y U' (L' U L) U (L' U L U' L' U L)`,
      `F (U R U' R') F' (R U' R')`,
      `U' R U (R2' F R F') (R U' R')`
    ]
  },
  {
    id: 8,
    scramble: `L' U L U' L' U2 L y'`,
    solutions: [`y (L' U2 L) U (L' U' L)`]
  },
  {
    id: 9,
    scramble: `R U' R'`,
    solutions: [`(R U R')`]
  },
  {
    id: 10,
    scramble: `R U' R' U' R U' R' U`,
    solutions: [
      `U' (R U R') U (R U R')`,
      `U2 (R U' R') U' (R U R')`,
      `R' U R2 U R' *`
    ]
  },
  {
    id: 11,
    scramble: `R' U' R2 U' R2 U2 R`,
    solutions: [
      `R' U2 R2 U R2' U R`,
      `(R U' R') U (R U' R') U2 (R U' R')`,
      `R' U2 R2 U R' *`,
      `y U L' U2 L U' y' R U R'`
    ]
  },
  {
    id: 12,
    scramble: `R U' R' U' R U R' U`,
    solutions: [`U' (R U' R') U (R U R')`]
  },
  {
    id: 13,
    scramble: `L' U L y'`,
    solutions: [`y (L' U' L)`]
  },
  {
    id: 14,
    scramble: `L' U L U L' U L U' y'`,
    solutions: [
      `y U (L' U' L) U' (L' U' L)`,
      `y U2 (L' U L) U (L' U' L)`,
      `y L U' L2' U' L *`
    ]
  },
  {
    id: 15,
    scramble: `L U L2 U L2 U2 L' y'`,
    solutions: [
      `y L U2 L2' U' L2 U' L'`,
      `y (L' U L) U' (L' U L) U2 (L' U L)`,
      `y L U2 L2' U' L *`,
      `U' (R U2 R') U y (L' U' L)`
    ]
  },
  {
    id: 16,
    scramble: `L' U L U L' U' L U' y'`,
    solutions: [`y U (L' U L) U' (L' U' L)`]
  },
  {
    id: 17,
    scramble: `L' U' L U y'`,
    solutions: [`y U' (L' U L)`]
  },
  {
    id: 18,
    scramble: `L' U' L U2 L' U2 L U' y'`,
    solutions: [`y U (L' U2 L) U2 (L' U L)`]
  },
  {
    id: 19,
    scramble: `R U R' U2 R U' R' U`,
    solutions: [`U' (R U R') U2 (R U' R')`]
  },
  {
    id: 20,
    scramble: `R U R' U' R' D' R U R' D R`,
    solutions: [
      `M U (L F' L') U' M'`,
      `U (R' F R F') U (R U R')`,
      `(R U2 R') U (R U R') U (R U' R')`,
      `R' D' (R U' R') D R U (R U' R')`,
      `U' (R' U R) U' (R U R') *`
    ]
  },
  {
    id: 21,
    scramble: `R U R' U'`,
    solutions: [`U (R U' R')`]
  },
  {
    id: 22,
    scramble: `R U R' U2 R U2 R' U`,
    solutions: [`U' (R U2 R') U2 (R U' R')`]
  },
  {
    id: 23,
    scramble: `L' U' L U2 L' U L U' y'`,
    solutions: [`y U (L' U' L) U2 (L' U L)`]
  },
  {
    id: 24,
    scramble: `L' U L y' U2 R U R'`,
    solutions: [
      `(R U' R') U2 y (L' U' L)`,
      `(R2 B' R' B R') U2 (R U' R')`,
      `U M' U R U' r' U' R U R'`,
      `y F U' F' U2 L' U' L`,
      `y U L U' L' U L' U' L *`
    ]
  },
  {
    id: 25,
    scramble: `R U' R' U2 R U' R' U'`,
    solutions: [
      `U (R U R') U2 (R U R')`,
      `U' (R U2 R') U (R U R')`,
      `D' (L' U L) D *`,
      `y U (L' U L) U2 (L' U L)`
    ]
  },
  {
    id: 26,
    scramble: `R U R' U2 R U R' U`,
    solutions: [
      `U' R U' R' U2 R U' R'`,
      `D' (U L' U' L) D *`,
      `y U' (L' U L) U2 (L' U' L)`,
      `y U (L' U2 L) U' (L' U' L)`
    ]
  },
  {
    id: 27,
    scramble: `(U R U' R') (U R U' R') (U R U' R')`,
    solutions: [`(U R U' R')3`]
  },
  {
    id: 28,
    scramble: `R U' R' U F' U F U'`,
    solutions: [
      `U (F' U' F) U' (R U R')`,
      `y U2 (L' U' L) (F' L F L')`,
      `y' U2 (R' U' R) (r' U' R U M')`,
      `y2 U2 (f' L' f) U (L U' L')`
    ]
  },
  {
    id: 29,
    scramble: `L' U L y' U' R U' R' U`,
    solutions: [
      `U' (R U R') U y (L' U' L)`,
      `y U2 (F U' F') U' (L' U' L)`,
      `y' U2 (f R f') U' (R' U R)`,
      `y2 U' (L U L') U (f' L' f)`
    ]
  },
  {
    id: 30,
    scramble: `R U R' F R' F' R U`,
    solutions: [
      `U' (R' F R F') (R U' R')`,
      `(R U' R') (F' U2 F)`,
      `y' R' U R' F R F' R`
    ]
  },
  {
    id: 31,
    scramble: `R U' R' U R U' R'`,
    solutions: [
      `(R U R') U' (R U R')`,
      `y (L F' L' F)2`,
      `y M' (U' L' U L) (U' L' U l)`,
      `y M' (U' L' U l) (U' L' U L)`
    ]
  },
  {
    id: 32,
    scramble: `R U R' U' R U R'`,
    solutions: [`(R U' R') U (R U' R')`]
  },
  {
    id: 33,
    scramble: `R U' R' F R' F' R U`,
    solutions: [
      `U' (R' F R F') (R U R')`,
      `R' F' R (U R U' R') F`,
      `U' F' R U R' U' R' F R`,
      `R2 U' R' U R2 *`
    ]
  },
  {
    id: 34,
    scramble: `L' U L U' L' U L y'`,
    solutions: [
      `y (L' U' L) U (L' U' L)`,
      `(R' F R F')2`,
      `M' (U R U' R') (U R U' r')`,
      `M' (U R U' r') (U R U' R')`
    ]
  },
  {
    id: 35,
    scramble: `L' U' L U L' U' L y'`,
    solutions: [`y (L' U L) U' (L' U L)`]
  },
  {
    id: 36,
    scramble: `L' U' L y' U R U R' U'`,
    solutions: [
      `U (R U' R' U') y (L' U L)`,
      `y U (L F' L' F) (L' U' L)`,
      `y D (U' L' U L) D' *`,
      `y' R U R U R U' R' U' R'`
    ]
  },
  {
    id: 37,
    scramble: `R U R' U' R U2 R' U' R U R'`,
    solutions: [`(R U' R') U (R U2 R') U (R U' R')`]
  },
  {
    id: 38,
    scramble: `R U R' U2 R U' R' U R U R'`,
    solutions: [`(R U' R') U' (R U R') U2 (R U' R')`]
  },
  {
    id: 39,
    scramble: `F' U F U' R U2 R' U' R U2 R'`,
    solutions: [
      `(R U2 R') U (R U2 R') U (F' U' F)`,
      `(R' F R F') R' U2 R2 U R2' U R`,
      `(R U' R') U y' R' U2 R U2 R' U R`,
      `D (R' F R F') (R U' R') D' *`
    ]
  },
  {
    id: 40,
    scramble: `r U' r' U2 r U r' R U R'`,
    solutions: [
      `(R U' R') (r U' r') U2 (r U r')`,
      `(R U' R') U2 y (L' U' L) U' (L' U L)`,
      `(R U R') y' (R U' R') U (R' U' R) *`
    ]
  },
  {
    id: 41,
    scramble: `R U' R' r U' r' U2 r U r'`,
    solutions: [`(r U' r') U2 (r U r') (R U R')`, `R U' R2' U' R y (L' U' L) *`]
  },
  // Section 2A
  {
    id: 42,
    scramble: `R U R2 U' R U`,
    solutions: [`U' R' U R2 U' R'`, `y U' (R U' R') U2 (L' U L)`]
  },
  {
    id: 43,
    scramble: `R U R' U2 L' U' L U'`,
    solutions: [`U (L' U L) U2 (R U' R')`, `y U L U' L2 U L`]
  },
  {
    id: 44,
    scramble: `L2 u L2 u' L2 U2`,
    solutions: [
      `U2 L2 u L2 u' L2`,
      `(U R U' R')2(L U2 L')`,
      `y U2 R2 u' R2 u R2`,
      `y(U' L' U L)2(R' U2 R)`
    ]
  },
  {
    id: 45,
    scramble: `F U2 R U R2 F' R y'`,
    solutions: [
      `U (R' U R U' R' U' R) y (L' U L)`,
      `U2 (R' U R U' R' U R) y (L' U L)`,
      `y R' F R2 U' R' U2 F'`,
      `y2 U2 (L F' L' F) (L U L')`
    ]
  },
  {
    id: 46,
    scramble: `F' U2 L' U' L2 F L'`,
    solutions: [
      `L F' L2 U L U2 F`,
      `y' U2 (R' F R F') (R' U' R)`,
      `y U' L U' L' U L U L' y' R U' R'`,
      `y U2 L U' L' U L U' L' y' R U' R'`
    ]
  },
  {
    id: 47,
    scramble: `L F' U' F L'`,
    solutions: [`L F' U F L'`, `y R' F U' F' R`, `y2 R u R' U R u' R'`]
  },
  {
    id: 48,
    scramble: `R U' R2 U R`,
    solutions: [`R' U' R2 U R'`, `y R' F2 R F2`]
  },
  {
    id: 49,
    scramble: `R U R' L' U L U`,
    solutions: [`U' (L' U' L) (R U' R')`, `y' U2 R' U' R2 U R2' U' R`]
  },
  {
    id: 50,
    scramble: `L U' L' R U' R' U' `,
    solutions: [
      `U (R U R') (L U L')`,
      `U' (R U2 R') U' (L U L')`,
      `y U(L' U L) (R' U R)`
    ]
  },
  {
    id: 51,
    scramble: `L' U' L y' U R' U' R`,
    solutions: [
      `(R' U R) U' y (L' U L)`,
      `y L u L u' L'`,
      `y R U R' U' y L U L'`,
      `y2 L' U L l U L' U' M'`
    ]
  },
  {
    id: 52,
    scramble: `R U' R' F U2 F'`,
    solutions: [
      `(F U2 F') (R U R')`,
      `U2 (L' U L) y (L' U2 L)`,
      `y (L U2 L') y (L U L')`,
      `y2 U2 (R' U R) y' (L' U2 L)`
    ]
  },
  {
    id: 53,
    scramble: `L U' L' F R' F' R U2`,
    solutions: [`U2 (R' F R F') (L U L')`, `y U2 L' B U B' L`]
  }
];

export default algs;
