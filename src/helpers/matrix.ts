export default class Matrix {
  #rows: number
  #cols: number
  #data: number[][]

  constructor(rows: number, cols: number) {
    this.#rows = rows
    this.#cols = cols

    this.#data = [...new Array(this.#rows)].map(() => [...new Array(this.#cols)].map(() => 1))
  }

  multiplyWithNumber(value: number) {
    for (let i = 0; i < this.#rows; i++) {
      for (let j = 0; j < this.#cols; j++) {
        this.#data[i][j] *= value
      }
    }
  }

  multiplyWithMatrix(value: Matrix): void {
    if (this.#cols !== value.rows) throw new Error('columns and row not match')

    const temp = new Matrix(this.#rows, value.cols)

    for (let i = 0; i < temp.rows; i++) {
      for (let j = 0; j < temp.cols; j++) {
        let sum = 0
        for (let k = 0; k < this.#cols; k++) {
          sum += this.#data[i][k] * value.matrix[k][j]
        }

        temp.#data[i][j] = sum
      }
    }

    this.#data = temp.matrix
  }

  setInput(value: number[]) {
    for (let i = 0; i < this.#rows; i++) {
      for (let j = 0; j < this.#cols; j++) {
        this.#data[i][j] = value[j]
      }
    }
  }

  map(func: (x: number, a: number, b: number, c: number) => number, premis: number[][]) {
    // const [a, b, c] = premis
    for (let i = 0; i < this.#rows; i++) {
      for (let j = 0; j < this.#cols; j++) {
        const value = this.#data[i][j]
        const [a, b, c] = premis[i]
        this.#data[i][j] = func(value, a, b, c)
      }
    }
  }

  /*
  [
    [1, 2, 3]
    [1, 2, 3]
    [1, 2, 3]
    [1, 2, 3]
    [4, 5, 6]
    [4, 5, 6]
    [4, 5, 6]
    [4, 5, 6]
  ]
  */

  // static fromMultiArray(value: number[][], rows: number, cols: number) {
  //   const result = new Matrix(rows, cols)
  //   for (let i = 0; i < result.#rows; i++) {
  //     for (let j = 0; j < result.#cols; j++) {
  //       result.#data[i][j] =
  //     }
  //   }

  //   return result
  // }

  static arrayAsInput(arrayInput: number[]): number[][] {
    return arrayInput.map((input) => [input])
  }

  get matrix() {
    return this.#data
  }

  get rows() {
    return this.#rows
  }

  get cols() {
    return this.#cols
  }
}
