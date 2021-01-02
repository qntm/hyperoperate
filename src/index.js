// A special value which is is DEFINITELY FINITE, but too large for JavaScript to represent as a
// BigInt
const OVERFLOW = Symbol('overflow')

// All arguments must be BigInts. Return value is a BigInt or `OVERFLOW`
const bigH = (n, a, b) => {
  if (n < 0n || a < 0n || b < 0n) {
    throw Error('Can only hyperoperate on non-negative integers')
  }

  // There are four examples of elementary `BigInt` arithmetic in this block: incrementation,
  // addition, multiplication and exponentiation. Any of them (but most likely exponentiation) can
  // throw a `RangeError` if the resulting `BigInt` is too large, which we catch
  try {
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
  } catch (error) {
    // Not clear what other error could be thrown at this stage?
    /* istanbul ignore if */
    if (
      !(error instanceof RangeError) ||
      !error.message.includes('BigInt')
    ) {
      throw error
    }

    return OVERFLOW
  }

  // n >= 4, time for some handy base cases

  if (a === 0n) {
    // Fun fact:
    return b % 2n === 0n ? 1n : 0n
  }

  if (a === 1n) {
    // 1^...^b = 1 for all finite b, including `OVERFLOW`
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

  if (n >= 6n) {
    // H(6, 2, 3) is a power tower of 65,536 2s
    // H(6, 3, 2) is a power tower of 7,625,597,484,987 3s
    // Guaranteed overflow, I don't care what JavaScript engine you're using
    return OVERFLOW
  }

  // H is not primitive recursive which means we must have *some* recursion, which risks a stack
  // explosion, however we can guarantee that `n` is not too big so we don't actually have a risk
  // of that
  let result = a
  for (let i = 1n; result !== OVERFLOW && i < b; i++) {
    result = bigH(n - 1n, a, result)
  }

  return result
}

const H = (n, a, b) => {
  if ([n, a, b].every(arg => typeof arg === 'bigint')) {
    // TODO: what about overflows return values?
    return bigH(n, a, b)
  }

  if ([n, a, b].every(arg => Number.isInteger(arg))) {
    // All plain doubles... convert inputs to `BigInt`s, then convert the result back to a double
    const bigHResult = bigH(BigInt(n), BigInt(a), BigInt(b))
    if (bigHResult === OVERFLOW) {
      return Infinity
    }
    return Number(bigHResult) // could still be `Infinity`
  }

  throw Error('Can only hyperoperate on three numbers or three BigInts')
}

module.exports = H
H.OVERFLOW = OVERFLOW
