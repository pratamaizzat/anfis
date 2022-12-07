import Anfis from './anfis'
import Matrix from './matrix'

export default class MembershipFunction {
  private rows: number
  private cols: number
  private data: Matrix<typeof this.bell>

  constructor(rows: number, cols: number) {
    this.rows = rows
    this.cols = cols

    this.data = Matrix.mapFunc(this.bell, this.rows, this.cols)
  }

  static execute(input: Matrix, mf: MembershipFunction, premis: Anfis['premis']): Matrix {
    const result = new Matrix(mf.getRowsCols.rows, mf.getRowsCols.cols)
    for (let i = 0; i < mf.getRowsCols.rows; i++) {
      for (let j = 0; j < mf.getRowsCols.cols; j++) {
        const func = mf.getData.matrix[i][j]
        const [a, b, c] = premis.matrix[i][j]
        result.setData(i, j, func(input.matrix[j][0], a, b, c))
      }
    }

    return result
  }

  bell(x: number, a: number, b: number, c: number): number {
    return 1 / (1 + Math.pow(Math.abs((x - c) / a), 2 * b))
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
}
