import Matrix from './matrix'
import MembershipFunction from './membership'

export default class Anfis {
  private nodeMF = 0
  private nodeInput = 0
  private mf: MembershipFunction
  private premis: Matrix<number[]>
  private initialPremis: number[][]
  private initialConsequent: number[][]
  private consequentPQRS: Matrix
  private consequentT: Matrix

  constructor(nodeInput: number, nodeMF: number, premis: number[][], consequent: number[][]) {
    this.nodeInput = nodeInput
    this.nodeMF = nodeMF
    this.initialPremis = premis
    this.initialConsequent = consequent

    this.mf = new MembershipFunction(this.nodeMF, this.nodeInput)

    this.premis = Matrix.from2DArray(this.initialPremis, this.nodeMF, this.nodeInput)

    const { pqrs, t } = this.formatConsequent()
    this.consequentPQRS = pqrs
    this.consequentT = t
  }

  feedForward(inputTest: number[]): number {
    const input = Matrix.arrayAsInput(inputTest)
    const out1 = MembershipFunction.execute(input, this.mf, this.premis)
    out1.reduce() // out2

    const sumOut1 = Matrix.multiply(new Matrix(1, 4), out1).toArray()[0]

    const out3 = Matrix.multiplyWithNumber(1 / sumOut1, out1)

    const out4 = Matrix.multiply(this.consequentPQRS, input)
    out4.addWithMatrix(this.consequentT)
    out4.multiplyWithMatrix(out3)

    const out5 = out4.matrix.flat().reduce((prev, curr) => prev + curr)

    return out5
  }

  formatConsequent(): { pqrs: Matrix; t: Matrix } {
    const pqrs = new Matrix(this.nodeMF, this.nodeInput)
    const t = new Matrix(this.nodeMF, 1)

    let indexPQRS = 0
    let indexT = 0

    for (let i = 0; i < pqrs.rows; i++) {
      for (let j = 0; j < pqrs.cols; j++) {
        pqrs.setData(i, j, this.initialConsequent[indexPQRS].slice(0, this.nodeInput)[j])
      }
      indexPQRS += 1
    }

    for (let i = 0; i < t.rows; i++) {
      for (let j = 0; j < t.cols; j++) {
        t.setData(i, j, this.initialConsequent[indexT].slice(this.nodeInput)[j])
      }
      indexT += 1
    }

    return {
      pqrs,
      t,
    }
  }
}
