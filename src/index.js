// All arguments must be BigInts. Return value is a BigInt or a thrown RangeError
const bigH = (n, a, b) => {
  if (n < 0n || a < 0n || b < 0n) {
    throw Error('Can only hyperoperate on non-negative integers')
  }

  // successor operator
  if (n === 0n) {
    // Ignore `a`
    return b + 1n
  }

  // addition
  if (n === 1n) {
    return a + b
  }

  // multiplication
  if (n === 2n) {
    return a * b
  }

  // exponentiation
  if (n === 3n) {
    return a ** b
  }

  // n >= 4, time for some handy base cases

  if (a === 0n) {
    // Fun fact:
    return b % 2n === 0n ? 1n : 0n
  }

  if (a === 1n) {
    // 1^...^b = 1 for all finite b
    return 1n
  }

  // a >= 2

  if (b === 0n) {
    // a^0 = 1 for all a >= 2
    return 1n
  }

  if (b === 1n) {
    // a^...^1 = a for all a >= 2
    return a
  }

  // b >= 2

  if (a === 2n && b === 2n) {
    // Another fun fact
    return 4n
  }

  if (n < 6n) {
    let result = a
    for (let i = 1n; i < b; i++) {
      result = bigH(n - 1n, a, result)
    }
    return result
  }

  // All other results (n >= 6, a >= 2, b >= 2) are too large to be computable on Earth computers.
  throw RangeError('BigInt')
}

export default (n, a, b) => {
  if ([n, a, b].every(arg => typeof arg === 'bigint')) {
    return bigH(n, a, b)
  }

  if ([n, a, b].every(arg => Number.isInteger(arg))) {
    // All plain doubles... convert inputs to `BigInt`s, then convert the result back to a double
    try {
      return Number(bigH(BigInt(n), BigInt(a), BigInt(b)))
    } catch (error) {
      // Not clear what other error could be thrown at this stage?
      /* istanbul ignore if */
      if (!(
        error instanceof RangeError &&
        error.message.includes('BigInt') // BigInt overflow
      )) {
        throw error
      }
    }

    return Infinity
  }

  throw Error('Can only hyperoperate on three numbers or three BigInts')
}
