import Matrix from './matrix'

describe('Matrix Class', () => {
  it('should convert array to form input matrix', () => {
    const inputToTest = [1, 2]

    const result = Matrix.arrayAsInput(inputToTest)

    expect(result.matrix.length).toBe(inputToTest.length)
    expect(result.matrix[0].length).toBe(1)

    expect(result.matrix[0][0]).toBe(1)
    expect(result.matrix[1][0]).toBe(2)
  })

  it('should convert 2d array to matrix', () => {
    const inputToTest = [
      [1.699, 1.76, 0.5004], // 0,0
      [1.063, 2.425, 3.216], // 1,0,
      [0.7791, 2.071, 4.075], // 2,0
      [0.8593, 2.277, 6.205], // 3,0
      [1.622, 2.025, 8.922], // 4,0
      [2.28, 0.2141, 1.972], // 0,1
      [1.884, 2.441, 5.44], // 1,1
      [0.6311, 2.858, 7.893], // 2,1
      [1.325, 2.799, 9.67], // 3,1
      [1.963, 1.743, 13.34], // 4,1
      [2.368, 0.8655, 21], // 0,2
      [1.72, 2.43524, 24.81], // 1,2
      [0.671, 2.13, 27.7], // 2,2
      [1.504, 2.74, 31.4], // 3,2
      [2.247, 1.702, 35.24], // 4,2
      [5.364, 0.4197, 1.182], // 0,3
      [5.237, 1.964, 11.44], // 1,3
      [5.375, 2.877, 22.15], // 2,3
      [5.498, 1.9, 32.07], // 3,3
      [5.474, 2.444, 41.34], // 4,3
    ]

    const rows = 5
    const cols = 4
    const result = Matrix.from2DArray(inputToTest, rows, cols)

    expect(result.matrix.length).toBe(rows)
    expect(result.matrix[0][0]).toBe(inputToTest[0])
    expect(result.matrix[4][0]).toBe(inputToTest[4])
    expect(result.matrix[0][3]).toBe(inputToTest[15])
    expect(result.matrix[4][3]).toBe(inputToTest[19])
  })
})
