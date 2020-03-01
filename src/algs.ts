export interface Alg {
  image: string;
  scramble: string;
  solutions: string[];
}

export interface AlgSet {
  title: string;
  algs: Alg[];
}

const algs: Alg[] = [
  {
    image: "1",
    scramble: `R U R' U' R U' R' U2`,
    solutions: [`U2 (R U R') U (R U' R')`]
  },
  {
    image: "2",
    scramble: `R U R' U' R U2 R' U'`,
    solutions: [`U (R U2 R') U (R U' R')`]
  },
  {
    image: "3",
    scramble: `R' D' R U2 R' D R2 U R'`,
    solutions: [
      `U (R U' R') U' (R U' R' U R U' R')`,
      `U (F R' F' R) U (R U R')`,
      `R U' R2' D' R U2 R' D R`
    ]
  },
  {
    image: "4",
    scramble: `R U' R' U R U2 R'`,
    solutions: [`(R U2 R') U' (R U R')`]
  },
  {
    image: "5",
    scramble: `L' U' L U L' U L U2 y'`,
    solutions: [`y U2 (L' U' L) U' (L' U L)`]
  },
  {
    image: "6",
    scramble: `L' U' L U L' U2 L U y'`,
    solutions: [`y U' (L' U2 L) U' (L' U L)`]
  },
  {
    image: "7",
    scramble: `R U R' F R U R' U' F'`,
    solutions: [
      `y U' (L' U L) U (L' U L U' L' U L)`,
      `F (U R U' R') F' (R U' R')`,
      `U' R U (R2' F R F') (R U' R')`
    ]
  },
  {
    image: "8",
    scramble: `L' U L U' L' U2 L y'`,
    solutions: [`y (L' U2 L) U (L' U' L)`]
  },
  {
    image: "9",
    scramble: `R U' R'`,
    solutions: [`(R U R')`]
  },
  {
    image: "10",
    scramble: `R U' R' U' R U' R' U`,
    solutions: [
      `U' (R U R') U (R U R')`,
      `U2 (R U' R') U' (R U R')`,
      `R' U R2 U R' *`
    ]
  },
  {
    image: "11",
    scramble: `R' U' R2 U' R2 U2 R`,
    solutions: [
      `R' U2 R2 U R2' U R`,
      `(R U' R') U (R U' R') U2 (R U' R')`,
      `R' U2 R2 U R' *`,
      `y U L' U2 L U' y' R U R'`
    ]
  },
  {
    image: "12",
    scramble: `R U' R' U' R U R' U`,
    solutions: [`U' (R U' R') U (R U R')`]
  },
  {
    image: "13",
    scramble: `L' U L y'`,
    solutions: [`y (L' U' L)`]
  },
  {
    image: "14",
    scramble: `L' U L U L' U L U' y'`,
    solutions: [
      `y U (L' U' L) U' (L' U' L)`,
      `y U2 (L' U L) U (L' U' L)`,
      `y L U' L2' U' L *`
    ]
  },
  {
    image: "15",
    scramble: `L U L2 U L2 U2 L' y'`,
    solutions: [
      `y L U2 L2' U' L2 U' L'`,
      `y (L' U L) U' (L' U L) U2 (L' U L)`,
      `y L U2 L2' U' L *`,
      `U' (R U2 R') U y (L' U' L)`
    ]
  },
  {
    image: "16",
    scramble: `L' U L U L' U' L U' y'`,
    solutions: [`y U (L' U L) U' (L' U' L)`]
  },
  {
    image: "17",
    scramble: `L' U' L U y'`,
    solutions: [`y U' (L' U L)`]
  },
  {
    image: "18",
    scramble: `L' U' L U2 L' U2 L U' y'`,
    solutions: [`y U (L' U2 L) U2 (L' U L)`]
  },
  {
    image: "19",
    scramble: `R U R' U2 R U' R' U`,
    solutions: [`U' (R U R') U2 (R U' R')`]
  },
  {
    image: "20",
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
    image: "21",
    scramble: `R U R' U'`,
    solutions: [`U (R U' R')`]
  },
  {
    image: "22",
    scramble: `R U R' U2 R U2 R' U`,
    solutions: [`U' (R U2 R') U2 (R U' R')`]
  },
  {
    image: "23",
    scramble: `L' U' L U2 L' U L U' y'`,
    solutions: [`y U (L' U' L) U2 (L' U L)`]
  },
  {
    image: "24",
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
    image: "25",
    scramble: `R U' R' U2 R U' R' U'`,
    solutions: [
      `U (R U R') U2 (R U R')`,
      `U' (R U2 R') U (R U R')`,
      `D' (L' U L) D *`,
      `y U (L' U L) U2 (L' U L)`
    ]
  },
  {
    image: "26",
    scramble: `R U R' U2 R U R' U`,
    solutions: [
      `U' R U' R' U2 R U' R'`,
      `D' (U L' U' L) D *`,
      `y U' (L' U L) U2 (L' U' L)`,
      `y U (L' U2 L) U' (L' U' L)`
    ]
  },
  {
    image: "27",
    scramble: `(U R U' R')3`,
    solutions: [`(U R U' R')3`]
  },
  {
    image: "28",
    scramble: `R U' R' U F' U F U'`,
    solutions: [
      `U (F' U' F) U' (R U R')`,
      `y U2 (L' U' L) (F' L F L')`,
      `y' U2 (R' U' R) (r' U' R U M')`,
      `y2 U2 (f' L' f) U (L U' L')`
    ]
  },
  {
    image: "29",
    scramble: `L' U L y' U' R U' R' U`,
    solutions: [
      `U' (R U R') U y (L' U' L)`,
      `y U2 (F U' F') U' (L' U' L)`,
      `y' U2 (f R f') U' (R' U R)`,
      `y2 U' (L U L') U (f' L' f)`
    ]
  },
  {
    image: "30",
    scramble: `R U R' F R' F' R U`,
    solutions: [
      `U' (R' F R F') (R U' R')`,
      `(R U' R') (F' U2 F)`,
      `y' R' U R' F R F' R`
    ]
  },
  {
    image: "31",
    scramble: `R U' R' U R U' R'`,
    solutions: [
      `(R U R') U' (R U R')`,
      `y (L F' L' F)2`,
      `y M' (U' L' U L) (U' L' U l)`,
      `y M' (U' L' U l) (U' L' U L)`
    ]
  },
  {
    image: "32",
    scramble: `R U R' U' R U R'`,
    solutions: [`(R U' R') U (R U' R')`]
  },
  {
    image: "33",
    scramble: `R U' R' F R' F' R U`,
    solutions: [
      `U' (R' F R F') (R U R')`,
      `R' F' R (U R U' R') F`,
      `U' F' R U R' U' R' F R`,
      `R2 U' R' U R2 *`
    ]
  },
  {
    image: "34",
    scramble: `L' U L U' L' U L y'`,
    solutions: [
      `y (L' U' L) U (L' U' L)`,
      `(R' F R F')2`,
      `M' (U R U' R') (U R U' r')`,
      `M' (U R U' r') (U R U' R')`
    ]
  },
  {
    image: "35",
    scramble: `L' U' L U L' U' L y'`,
    solutions: [`y (L' U L) U' (L' U L)`]
  },
  {
    image: "36",
    scramble: `L' U' L y' U R U R' U'`,
    solutions: [
      `U (R U' R' U') y (L' U L)`,
      `y U (L F' L' F) (L' U' L)`,
      `y D (U' L' U L) D' *`,
      `y' R U R U R U' R' U' R'`
    ]
  },
  {
    image: "37",
    scramble: `R U R' U' R U2 R' U' R U R'`,
    solutions: [`(R U' R') U (R U2 R') U (R U' R')`]
  },
  {
    image: "38",
    scramble: `R U R' U2 R U' R' U R U R'`,
    solutions: [`(R U' R') U' (R U R') U2 (R U' R')`]
  },
  {
    image: "39",
    scramble: `F' U F U' R U2 R' U' R U2 R'`,
    solutions: [
      `(R U2 R') U (R U2 R') U (F' U' F)`,
      `(R' F R F') R' U2 R2 U R2' U R`,
      `(R U' R') U y' R' U2 R U2 R' U R`,
      `D (R' F R F') (R U' R') D' *`
    ]
  },
  {
    image: "40",
    scramble: `r U' r' U2 r U r' R U R'`,
    solutions: [
      `(R U' R') (r U' r') U2 (r U r')`,
      `(R U' R') U2 y (L' U' L) U' (L' U L)`,
      `(R U R') y' (R U' R') U (R' U' R) *`
    ]
  },
  {
    image: "41",
    scramble: `R U' R' r U' r' U2 r U r'`,
    solutions: [`(r U' r') U2 (r U r') (R U R')`, `R U' R2' U' R y (L' U' L) *`]
  }
];

export default algs;
