import { MFGeneratorType } from '../../lib/mf'

export default function generateMF(x: number, a?: number, b?: number, c?: number) {
  if (a === undefined) a = 1
  if (b === undefined) b = 1
  if (c === undefined) c = 1

  return (type: MFGeneratorType) => {
    switch (type) {
      case 'bell':
        return bell(x, a, b, c)
      case 'gaussian':
        return gaussian(x, a, b, c)
      default:
        return bell(x, a, b, c)
    }
  }
}

const bell = (x: number, a: number, b: number, c: number): number => {
  return 1 / (1 + (x - Math.pow(c, 2 * b)) / a)
}

const gaussian = (x: number, a: number, b: number, c: number): number => {
  console.log({ x, a, b, c })
  return 0
}
