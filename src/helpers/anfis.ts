import Matrix from './matrix'
import MembershipFunction from './membership'

export default class Anfis {
  private nodeMF = 0
  private nodeInput = 0
  private mf: MembershipFunction
  private premis: Matrix<number[]>
  private initialPremis: number[][]

  constructor(nodeInput: number, nodeMF: number, premis: number[][]) {
    this.nodeInput = nodeInput
    this.nodeMF = nodeMF
    this.initialPremis = premis

    // generate mf
    this.mf = new MembershipFunction(this.nodeMF, this.nodeInput)

    this.premis = Matrix.from2DArray(this.initialPremis, this.nodeMF, this.nodeInput)
  }

  feedForward(inputTest: number[]): number {
    const input = Matrix.arrayAsInput(inputTest)
    const out1 = MembershipFunction.execute(input, this.mf, this.premis)
    out1.reduce() // out2

    const sumOut1 = Matrix.multiply(new Matrix(1, 4), out1).toArray()[0]

    const out3 = Matrix.multiplyWithNumber(1 / sumOut1, out1)

    console.table(out3.matrix)

    return 1
  }
}
