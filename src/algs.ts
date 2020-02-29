export interface Alg {
  image: string;
  scramble: string;
  solutions: string[];
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
  }
];

export default algs;
