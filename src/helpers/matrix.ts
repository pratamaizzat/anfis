export default class Matrix<T = number> {
  #rows: number
  #cols: number
  #data: T[][]

  constructor(rows: number, cols: number) {
    this.#rows = rows
    this.#cols = cols

    this.#data = [...new Array(this.#rows)].map(() =>
      [...new Array(this.#cols)].map(() => 1)
    ) as T[][]
  }

  setInput(value: number[]) {
    for (let i = 0; i < this.#rows; i++) {
      for (let j = 0; j < this.#cols; j++) {
        this.#data[i][j] = value[j] as T
      }
    }
  }

  map(func: (x: number, a: number, b: number, c: number) => number, premis: number[][]) {
    for (let i = 0; i < this.#rows; i++) {
      for (let j = 0; j < this.#cols; j++) {
        const value = this.#data[i][j] as number
        const [a, b, c] = premis[i]
        this.#data[i][j] = func(value, a, b, c) as T
      }
    }
  }

  reduce() {
    const temp = new Matrix(this.#rows, 1)
    for (let i = 0; i < this.#rows; i++) {
      let reduceValue = 1
      for (let j = 0; j < this.#cols; j++) {
        reduceValue *= this.#data[i][j] as number
      }
      temp.#data[i][0] = reduceValue
    }

    this.#rows = temp.#rows
    this.#cols = temp.#cols
    this.#data = temp.#data as T[][]
  }

  static from2DArray(value: number[][], rows: number, cols: number): Matrix<number[]> {
    if (value.length % rows !== 0) throw new Error('invalid length')
    const result = new Matrix<number[]>(rows, cols)

    let index = 0

    for (let i = 0; i < result.#cols; i++) {
      for (let j = 0; j < result.#rows; j++) {
        if (i === 0 && j === 0) {
          result.#data[i][j] = value[0]
        } else {
          result.#data[j][i] = value[index]
        }
        index += 1
      }
    }

    return result
  }

  static mapFunc(
    func: (x: number, a: number, b: number, c: number) => number,
    rows: number,
    cols: number
  ) {
    const result = new Matrix<typeof func>(rows, cols)
    for (let i = 0; i < result.#rows; i++) {
      for (let j = 0; j < result.#cols; j++) {
        result.#data[i][j] = func
      }
    }

    return result
  }

  toArray(): number[] {
    let count = 0
    const result = new Array(this.#rows * this.#cols).fill(null)

    for (let i = 0; i < this.#rows; i++) {
      for (let j = 0; j < this.#cols; j++) {
        result[count] = this.#data[i][j]
        count++
      }
    }
    return result
  }

  static arrayAsInput(arrayInput: number[]): Matrix {
    const result = new Matrix(arrayInput.length, 1)
    for (let i = 0; i < result.#rows; i++) {
      for (let j = 0; j < result.#cols; j++) {
        result.#data[i][j] = arrayInput[i]
      }
    }

    return result
  }

  static multiply(matrix1: Matrix, matrix2: Matrix): Matrix {
    const result = new Matrix(matrix1.#rows, matrix2.#cols)
    for (let i = 0; i < result.#rows; i++) {
      for (let j = 0; j < result.#cols; j++) {
        let sum = 0

        for (let k = 0; k < matrix1.#cols; k++) {
          sum += matrix1.#data[i][k] * matrix2.#data[k][j]
        }

        result.#data[i][j] = sum
      }
    }
    return result
  }

  addWithMatrix(matrix: Matrix<number>) {
    for (let i = 0; i < this.#rows; i++) {
      for (let j = 0; j < this.#cols; j++) {
        this.#data[i][j] = ((matrix.#data[i][j] as number) + (this.#data[i][j] as number)) as T
      }
    }
  }

  multiplyWithMatrix(matrix: Matrix) {
    for (let i = 0; i < this.#rows; i++) {
      for (let j = 0; j < this.#cols; j++) {
        this.#data[i][j] = ((matrix.#data[i][j] as number) * (this.#data[i][j] as number)) as T
      }
    }
  }

  static multiplyWithNumber(value: number, matrix: Matrix): Matrix {
    const result = new Matrix(matrix.#rows, matrix.#cols)
    for (let i = 0; i < result.#rows; i++) {
      for (let j = 0; j < result.#cols; j++) {
        result.#data[i][j] = matrix.#data[i][j] * value
      }
    }
    return result
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

  setData(i: number, j: number, value: T) {
    this.#data[i][j] = value as T
  }
}
