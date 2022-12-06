import Matrix from './matrix'

export default class Anfis {
  #nodeMF = 0
  #nodeInput = 0
  #mf: Matrix
  #premis: Matrix
  #initialPremis: number[][]

  constructor(nodeInput: number, nodeMF: number, premis: number[][]) {
    this.#nodeInput = nodeInput
    this.#nodeMF = nodeMF
    this.#initialPremis = premis

    // generate mf
    this.#mf = new Matrix(nodeMF, nodeInput)

    // generate mf
    // this.#premis = Matrix.fromMultiArray(premis)
  }

  feedForward(inputTest: number[]): number {
    const input = Matrix.arrayAsInput(inputTest)

    this.#mf.setInput(inputTest)
    this.#mf.map(
      (x: number, a: number, b: number, c: number): number => {
        return 1 / (1 + Math.pow(Math.abs((x - c) / a), 2 * b))
      },
      [
        [1.699, 1.76, 0.5004],
        [1.063, 2.425, 3.216],
        [0.7791, 2.071, 4.075],
        [0.8593, 2.277, 6.205],
        [1.622, 2.025, 8.922],
        [2.28, 0.2141, 1.972],
        [1.884, 2.441, 5.44],
        [0.6311, 2.858, 7.893],
        [1.325, 2.799, 9.67],
        [1.963, 1.743, 13.34],
        [2.368, 0.8655, 21],
        [1.72, 2.43524, 24.81],
        [0.671, 2.13, 27.7],
        [1.504, 2.74, 31.4],
        [2.247, 1.702, 35.24],
        [5.364, 0.4197, 1.182],
        [5.237, 1.964, 11.44],
        [5.375, 2.877, 22.15],
        [5.498, 1.9, 32.07],
        [5.474, 2.444, 41.34],
      ]
    )

    console.table(input)
    console.table(this.#mf.matrix)
    return 1
  }

  train(input: number[], target: number[]) {
    console.log({ input, target })
  }
}
