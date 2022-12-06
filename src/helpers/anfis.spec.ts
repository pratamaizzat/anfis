import Anfis from './anfis'

describe('test', () => {
  it('test', () => {
    const result = new Anfis(4, 5, [
      [1, 2, 3],
      [4, 5, 6],
    ])

    expect(result.feedForward([4.5, 7.8, 28.5, 25])).toBe(1)
  })
})
