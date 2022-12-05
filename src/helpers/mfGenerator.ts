import { MFGeneratorType } from '../../lib/mf'

export default function generateMF(x: number, a?: number, b?: number, c?: number) {
  a = 1
  b = 1
  c = 1

  return (type: MFGeneratorType) => {
    switch (type) {
      case 'basic':
        return basicMf(x, a, b, c)
      default:
        return 0
    }
  }
}

const basicMf = (x: number, a: number, b: number, c: number): number => {
  return 1 / (1 + (x - Math.pow(c, 2 * b)) / a)
}
