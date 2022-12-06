import Matrix from './matrix'

describe('Matrix Class', () => {
  it('should convert array to form input matrix', () => {
    const inputToTest = [1, 2]

    const result = Matrix.arrayAsInput(inputToTest)

    expect(result.length).toBe(inputToTest.length)
    expect(result[0].length).toBe(1)

    expect(result[0][0]).toBe(1)
    expect(result[1][0]).toBe(2)
  })

  it('should multiply matrix with matrix', () => {
    const matrix1 = new Matrix(3, 2)
    const matrix2 = new Matrix(2, 1)

    matrix1.multiplyWithMatrix(matrix2)

    expect(matrix1.matrix.length).toBe(3)
    expect(matrix1.matrix[0].length).toBe(1)
    expect(matrix1.matrix[0][0]).toBe(2)
  })
})
