import Matrix from './matrix'

export default class MembershipFunction {
  private rows: number
  private cols: number
  private data: Matrix<typeof this.bell>
  private premis: Matrix<number[]>

  constructor(rows: number, cols: number, premis: number[][]) {
    this.rows = rows
    this.cols = cols

    this.data = Matrix.mapFunc(this.bell, this.rows, this.cols)
    this.premis = Matrix.from2DArray(premis, this.rows, this.cols)
  }

  static execute(
    input: Matrix,
    mf: MembershipFunction,
    premis: MembershipFunction['premis']
  ): Matrix {
    const result = new Matrix(mf.getRowsCols.rows, mf.getRowsCols.cols)
    for (let i = 0; i < mf.getRowsCols.rows; i++) {
      for (let j = 0; j < mf.getRowsCols.cols; j++) {
        const func = mf.getData.matrix[i][j]
        const [a, b, c] = premis.matrix[i][j]
        console.log({ input: input.matrix[j][0], a, b, c })
        result.setData(i, j, func(input.matrix[j][0], a, b, c))
      }
    }

    return result
  }

  bell(x: number, a: number, b: number, c: number): number {
    return 1 / (1 + (x - Math.pow(c, 2 * b)) / a)
  }

  gaussian(x: number, a: number, b: number, c: number): number {
    return 1 / (1 + (x - Math.pow(c, 2 * b)) / a)
  }

  get getData() {
    return this.data
  }

  get getRowsCols() {
    return {
      rows: this.rows,
      cols: this.cols,
    }
  }

  get getPremis() {
    return this.premis
  }
}

// export default function generateMF(x: number, a?: number, b?: number, c?: number) {
//   if (a === undefined) a = 1
//   if (b === undefined) b = 1
//   if (c === undefined) c = 1

//   return (type: MFGeneratorType) => {
//     switch (type) {
//       case 'bell':
//         return bell(x, a, b, c)
//       case 'gaussian':
//         return gaussian(x, a, b, c)
//       default:
//         return bell(x, a, b, c)
//     }
//   }
// }

// const bell = (x: number, a: number, b: number, c: number): number => {
//   return 1 / (1 + (x - Math.pow(c, 2 * b)) / a)
// }

// const gaussian = (x: number, a: number, b: number, c: number): number => {
//   console.log({ x, a, b, c })
//   return 0
// }
